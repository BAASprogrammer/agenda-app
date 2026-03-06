"use client";
import ProSidebarPatient from "@/components/ProSidebarPatient";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import {
    CalendarDays,
    HeartPulse,
    FileText,
    UserCircle,
    LogOut,
    ChevronLeft,
    Clock,
    Filter,
    Search,
    MoreVertical,
    X,
    Calendar,
    MapPin,
    Trash2,
    Video,
    MessageSquare,
    User,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyAppointments() {
    const user = useUser();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [appointmentsFiltered, setAppointmentsFiltered] = useState<any[]>([]);
    const [filter, setFilter] = useState("todas");
    const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!user.userId) return;

            let query = supabase
                .from('medical_appointments')
                .select(`id, appointment_date, status, professional_id, reason, professional:users!medical_appointments_professional_id_fkey (first_name, last_name)`)
                .eq('patient_id', user.userId)
                .order('appointment_date', { ascending: true });

            if (filter !== "todas") {
                query = query.eq('status', filter);
            }

            const { data, error } = await query;

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
            setAppointmentsFiltered(formattedData);
        }
        fetchAppointments();
    }, [user.userId, filter]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'agendada': return 'bg-cyan-100 text-cyan-700';
            case 'completada': return 'bg-emerald-100 text-emerald-700';
            case 'cancelada': return 'bg-rose-100 text-rose-700';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const searchProfessional = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchData = e.target.value.toLowerCase();
        setSearchTerm(searchData);
    };

    useEffect(() => {
        filterAppointments(searchTerm);
    }, [searchTerm]);

    const filterAppointments = (searchData: string) => {
        if (searchData.length === 0) {
            setAppointments(appointmentsFiltered);
            return;
        }
        const filteredAppointments = appointmentsFiltered.filter(appointmentfilter => {
            if (appointmentfilter.professional?.first_name.toLowerCase().includes(searchData) ||
                appointmentfilter.professional?.last_name.toLowerCase().includes(searchData)) {
                return appointmentfilter;
            }
        });
        setAppointments(filteredAppointments);
    };

    const futureAppointments = appointments.filter(appt => appt.appointment_date.split('T')[0] >= new Date().toLocaleDateString("en-CA").split('T')[0]);
    const pastAppointments = appointments.filter(appt => appt.appointment_date.split('T')[0] < new Date().toLocaleDateString("en-CA").split('T')[0]);
    const displayAppointments = filter === 'pasada' ? pastAppointments : futureAppointments;
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebarPatient active="/myappointments" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-cyan-50/80 to-transparent -z-10"></div>
                <header className="px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
                    <div>
                        <Link href="/homepatient" className="text-cyan-600 flex items-center gap-1 text-sm font-bold mb-2 hover:gap-2 transition-all">
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
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all w-64" onChange={searchProfessional} value={searchTerm}
                            />
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
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
                                    ? 'bg-white text-cyan-600 shadow-sm'
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
                                    className="bg-white/80 backdrop-blur-md rounded-4xl p-6 border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6 group animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Date Badge */}
                                    <div className="w-20 h-20 bg-linear-to-br from-cyan-50 to-blue-50 rounded-3xl flex flex-col items-center justify-center shrink-0 border border-white shadow-inner group-hover:from-cyan-100 group-hover:to-blue-100 transition-colors">
                                        <span className="text-xs font-black text-cyan-600 uppercase tracking-tighter">
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
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-cyan-500">
                                                    <Clock className="w-4 h-4" />
                                                </div>
                                                <span>{appointment.displayTime} hrs</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-cyan-500">
                                                    <FileText className="w-4 h-4" />
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
                                                className={`p-3 border rounded-2xl transition-all active:scale-90 ${openMenuId === appointment.id ? 'bg-cyan-50 border-cyan-200 text-cyan-600' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-800'}`}
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {openMenuId === appointment.id && (
                                                <>
                                                    <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)}></div>
                                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden animate-zoom-in origin-top-right">
                                                        <div className="p-1.5">
                                                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors text-left">
                                                                <User className="w-4 h-4 text-cyan-500" /> Ver Perfil Doctor
                                                            </button>
                                                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors text-left">
                                                                <MessageSquare className="w-4 h-4 text-cyan-500" /> Enviar Mensaje
                                                            </button>
                                                            <div className="h-px bg-slate-100 my-1 mx-2"></div>
                                                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors text-left">
                                                                <Trash2 className="w-4 h-4" /> Cancelar Cita
                                                            </button>
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
                                    className="bg-cyan-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-100"
                                >
                                    Ver todas las citas
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Appointment Details Modal */}
            {selectedAppointment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-fade-in" onClick={() => setSelectedAppointment(null)}></div>
                    <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up border border-white">
                        {/* Header Image/Pattern */}
                        <div className="h-32 bg-linear-to-br from-cyan-500 to-blue-600 relative">
                            <button
                                onClick={() => setSelectedAppointment(null)}
                                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full text-white transition-all z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute -bottom-10 left-8">
                                <div className="w-24 h-24 bg-white rounded-3xl p-1 shadow-xl">
                                    <div className="w-full h-full bg-slate-100 rounded-[1.25rem] flex items-center justify-center text-slate-300">
                                        <User className="w-12 h-12" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-14 px-8 pb-10">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div>
                                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${getStatusColor(selectedAppointment.status)}`}>
                                        {selectedAppointment.status}
                                    </span>
                                    <h2 className="text-3xl font-black text-slate-800 mt-2 tracking-tight">
                                        Dr. {selectedAppointment.professional?.first_name} {selectedAppointment.professional?.last_name}
                                    </h2>
                                    <p className="text-slate-500 font-bold flex items-center gap-2 mt-1">
                                        Especialista Médico <span className="w-1 h-1 bg-slate-300 rounded-full"></span> ID: #{selectedAppointment.id?.toString().slice(-6)}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 hover:border-cyan-200 transition-colors">
                                    <div className="flex items-center gap-3 mb-4 text-cyan-600">
                                        <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <span className="font-black uppercase text-[10px] tracking-widest">Fecha y Hora</span>
                                    </div>
                                    <p className="text-lg font-bold text-slate-800 capitalize">{selectedAppointment.displayFullDate}</p>
                                    <p className="text-slate-500 font-medium">{selectedAppointment.displayTime} hrs</p>
                                </div>

                                <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 hover:border-cyan-200 transition-colors">
                                    <div className="flex items-center gap-3 mb-4 text-cyan-600">
                                        <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <span className="font-black uppercase text-[10px] tracking-widest">Ubicación</span>
                                    </div>
                                    <p className="text-lg font-bold text-slate-800">Centro Médico Salud</p>
                                    <p className="text-slate-500 font-medium">Av. Providencia 1234, Piso 4</p>
                                </div>
                            </div>

                            <div className="bg-cyan-50/50 rounded-3xl p-6 mb-8 border border-cyan-100">
                                <div className="flex items-center gap-3 mb-4 text-cyan-700">
                                    <FileText className="w-5 h-5" />
                                    <span className="font-black uppercase text-[10px] tracking-widest">Motivo de Consulta</span>
                                </div>
                                <p className="text-slate-700 font-medium leading-relaxed bg-white/50 p-4 rounded-2xl border border-white">
                                    {selectedAppointment.reason || "Sin motivo especificado. El paciente requiere una evaluación general de su estado de salud actual."}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="flex-1 bg-cyan-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-cyan-200 hover:bg-cyan-700 hover:-translate-y-0.5 transition-all active:translate-y-0">
                                    Reprogramar Cita
                                </button>
                                <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                                    Contactar Soporte
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
