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
    MoreVertical
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyAppointments() {
    const user = useUser();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [filter, setFilter] = useState("todas");

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
                    displayTime: `${timePart[0]}:${timePart[1]}`
                };
            });

            setAppointments(formattedData);
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
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all w-64"
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
                        {['todas', 'agendada', 'completada', 'cancelada'].map((status) => (
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
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
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

                                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                                        <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm">
                                            Detalles
                                        </button>
                                        <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 hover:text-slate-800 transition-all">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
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
        </div>
    );
}
