"use client";
import AppointmentDetails from "@/components/patient/AppointmentDetails";
import ProSidebarPatient from "@/components/patient/ProSidebar";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import { getStatusColor } from "@/utils/getStatusColor";
import DoctorProfileModal from "@/components/patient/DoctorProfileModal";
import {
    CalendarClock,
    NotepadText,
    CircleUser,
    ChevronLeft,
    Clock,
    Filter,
    Search,
    MoreVertical,
    X,
    CalendarDays,
    Trash2,
    User,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyAppointments() {
    const user = useUser();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [filter, setFilter] = useState("todas");
    const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
    const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!user.userId) return;

            const { data, error } = await supabase
                .from('medical_appointments')
                .select(`id, appointment_date, status, professional_id, reason, professional:users!medical_appointments_professional_id_fkey (first_name, last_name)`)
                .eq('patient_id', user.userId)
                .order('appointment_date', { ascending: false });

            if (error) {
                console.error("Error obteniendo citas:", error);
                return;
            }

            const formattedData = (data ?? []).map(appt => {
                const parts = appt.appointment_date.replace(' ', 'T').split('T');
                const datePart = parts[0];
                const timePart = parts[1] ? parts[1].split(':') : ['00', '00'];
                const [year, month, day] = datePart.split('-').map(Number);
                const d = new Date(year, month - 1, day);
                return {
                    ...appt,
                    displayMonth: isNaN(d.getTime()) ? '---' : d.toLocaleString('cl-CL', { month: 'short' }).replace('.', ''),
                    displayDay: isNaN(d.getTime()) ? '--' : d.getDate(),
                    displayFullDate: isNaN(d.getTime()) ? 'Fecha inválida' : d.toLocaleDateString('cl-CL', { weekday: 'long', day: 'numeric', month: 'long' }),
                    displayTime: `${timePart[0]}:${timePart[1]}`,
                    displayDate: parts[0]
                };
            });

            setAppointments(formattedData);
        }
        fetchAppointments();
    }, [user.userId]);

    const searchProfessional = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleCancelAppointment = (appointmentId: number) => {
        setAppointmentToCancel(appointmentId);
        setMessage("¿Estás seguro de cancelar la cita?");
        // Do not close the menu here to show the question inside it
    };

    const confirmCancel = async () => {
        if (!appointmentToCancel) return;

        const { error } = await supabase
            .from('medical_appointments')
            .update({ status: 'cancelada' })
            .eq('id', appointmentToCancel);

        if (error) {
            setMessage("Error: No se pudo cancelar la cita");
        } else {
            setAppointments(appointments.filter(appt => appt.id !== appointmentToCancel));
            setMessage("Cita cancelada con éxito");
        }

        setAppointmentToCancel(null);
        setOpenMenuId(null);
        setTimeout(() => setMessage(""), 3000);
    };

    const today = new Date().toLocaleDateString("en-CA");

    const displayAppointments = appointments.filter(appt => {
        // 1. Search filter (doctor's first/last name)
        const matchesSearch =
            appt.professional?.first_name.toLowerCase().includes(searchTerm) ||
            appt.professional?.last_name.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;

        // 2. Tab filter (status/time)
        if (filter === 'todas') return appt.appointment_date.split(' ')[0];
        if (filter === 'pasada') return appt.appointment_date.split(' ')[0] < today && appt.status === 'pasada';

        return appt.status === filter;
    });
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebarPatient active="/myappointments" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-50/70 to-transparent -z-10"></div>
                <header className="px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
                    <div>
                        <Link href="/home/patient" className="text-teal-600 flex items-center gap-1 text-sm font-bold mb-2 hover:gap-2 transition-all">
                            <ChevronLeft className="w-4 h-4" /> Volver al inicio
                        </Link>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mis Citas Médicas</h1>
                        <p className="text-slate-500 font-medium">Gestiona y revisa todas tus citas programadas.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar doctor..."
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all w-64" onChange={searchProfessional} value={searchTerm}
                            />
                        </div>
                    </div>
                </header>

                <div className="px-8 pb-12 flex-1 overflow-y-auto">
                    {/* Filters Tabs */}
                    <div className="flex gap-2 mb-8 bg-slate-100/50 p-1 rounded-2xl w-fit">
                        {['todas', 'agendada', 'completada', 'cancelada', 'pasada'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${filter === status
                                    ? 'bg-white text-teal-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {displayAppointments.length > 0 ? (
                            displayAppointments.map((appointment, index) => (

                                <div
                                    key={appointment.id}
                                    className={`bg-white/80 backdrop-blur-md rounded-4xl p-6 border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6 group animate-fade-in-up
                            ${openMenuId === appointment.id ? 'relative z-50' : 'relative z-10'}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Date Badge */}
                                    <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl flex flex-col items-center justify-center shrink-0 border border-white shadow-inner group-hover:from-teal-100 group-hover:to-blue-100 transition-colors">
                                        <span className="text-xs font-black text-teal-600 uppercase tracking-tighter">
                                            {appointment.displayMonth}
                                        </span>
                                        <span className="text-3xl font-black text-slate-800 leading-none">
                                            {appointment.displayDay}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(appointment.status)}`}>
                                                {appointment.status}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: #{appointment.id?.toString().slice(-6)}</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors">Dr. {appointment.professional?.first_name} {appointment.professional?.last_name}</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-teal-500">
                                                    <Clock className="w-4 h-4" />
                                                </div>
                                                <span>{appointment.displayTime} hrs</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-teal-500">
                                                    <NotepadText className="w-4 h-4" />
                                                </div>
                                                <span className="truncate max-w-[200px]">{appointment.reason || "Consulta general"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-4 md:mt-0 relative">
                                        <button
                                            onClick={() => setSelectedAppointment(appointment)}
                                            className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm shadow-sm active:scale-95"
                                        >
                                            Detalles
                                        </button>
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === appointment.id ? null : appointment.id)}
                                                className={`p-3 border rounded-2xl transition-all active:scale-90 ${openMenuId === appointment.id ? 'bg-teal-50 border-teal-200 text-teal-600' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-800'}`}
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {openMenuId === appointment.id && (
                                                <>
                                                    <div className="fixed inset-0 z-40" onClick={() => { setOpenMenuId(null); setAppointmentToCancel(null); setMessage(""); }}></div>
                                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden animate-zoom-in origin-top-right">
                                                        <div className="p-1.5">
                                                            {appointmentToCancel === appointment.id ? (
                                                                <div className="p-5 flex flex-col items-center text-center animate-fade-in-up">
                                                                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-3 shadow-inner">
                                                                        <AlertCircle className="w-6 h-6" />
                                                                    </div>
                                                                    <div className="space-y-1 mb-5">
                                                                        <p className="text-xs font-black text-slate-800 uppercase tracking-wider">¿Confirmar acción?</p>
                                                                        <p className="text-[10px] font-bold text-slate-400 leading-relaxed px-2">Esta cita será marcada como cancelada permanentemente.</p>
                                                                    </div>
                                                                    <div className="flex flex-col gap-2 w-full">
                                                                        <button
                                                                            onClick={confirmCancel}
                                                                            className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:from-rose-600 hover:to-rose-700 transition-all shadow-lg shadow-rose-100 active:scale-95"
                                                                        >
                                                                            Si, cancelar cita
                                                                        </button>
                                                                        <button
                                                                            onClick={() => { setAppointmentToCancel(null); setMessage(""); }}
                                                                            className="w-full py-3 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
                                                                        >
                                                                            No, volver
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors text-left"
                                                                        onClick={() => {
                                                                            setSelectedDoctor(appointment.professional);
                                                                            setIsDoctorProfileOpen(true);
                                                                        }}
                                                                    >
                                                                        <User className="w-4 h-4 text-teal-500" /> Ver Perfil Doctor
                                                                    </button>
                                                                    {(filter === 'agendada' || filter === 'todas') && appointment.status === 'agendada' && (
                                                                        <div>
                                                                            <div className="h-px bg-slate-100 my-1 mx-2"></div>
                                                                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors text-left"
                                                                                onClick={() => handleCancelAppointment(appointment.id)}>
                                                                                <Trash2 className="w-4 h-4" /> Cancelar Cita
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white/60 backdrop-blur-sm rounded-[3rem] p-20 border border-dashed border-slate-200 text-center animate-fade-in">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                    <CalendarDays className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">No se encontraron citas</h3>
                                <p className="text-slate-500 mb-8 max-w-xs mx-auto">No tienes citas que coincidan con el filtro seleccionado.</p>
                                <button
                                    onClick={() => setFilter('todas')}
                                    className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
                                >
                                    Ver todas las citas
                                </button>
                            </div>
                        )}
                        {message && !appointmentToCancel && (
                            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 animate-fade-in-up">
                                <div className="bg-white/90 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2.5rem] p-6 flex flex-col gap-4 min-w-[350px]">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${message.toLowerCase().includes('error') ? 'bg-rose-50 text-rose-500' : 'bg-teal-50 text-teal-600'}
                                            }`}>
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-black text-slate-800 leading-tight">{message}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setMessage("")}
                                        className="w-full py-3 bg-slate-50 text-slate-400 rounded-2xl font-bold text-xs hover:bg-slate-100 transition-all"
                                    >
                                        Entendido
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            {/* Appointment Details Modal */}
            {selectedAppointment && (
                <AppointmentDetails appointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment} />
            )}
            {/* Doctor Profile Modal */}
            {isDoctorProfileOpen && (
                <DoctorProfileModal
                    professional={selectedDoctor}
                    onClose={() => setIsDoctorProfileOpen(false)}
                />
            )}
        </div>
    );
}
