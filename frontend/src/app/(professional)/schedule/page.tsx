"use client";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/lib/supabaseClient";
import { api } from "@/lib/api";
// ✅ MEJORA 1: componente compartido, ya no repetimos código
import ProSidebar from "@/components/professional/ProSidebar";
import {
    Calendar, Clock, ChevronLeft, ChevronRight,
    CheckCircle2, XCircle
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// ✅ MEJORA 2: Interfaces en lugar de any[]
interface SchedulePatient {
    first_name: string;
    last_name: string;
}

interface ScheduleAppointment {
    id: string;
    appointment_date: string;
    status: 'agendada' | 'completada' | 'cancelada';
    reason: string | null;
    patient: SchedulePatient | null;
    displayTime: string;
}

export default function Schedule() {
    // 1. Hooks & Stores
    const user = useUserStore();

    // 2. State
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState<ScheduleAppointment[]>([]);
    const [weekOffset, setWeekOffset] = useState(0);
    const [busyDays, setBusyDays] = useState<Set<string>>(new Set());

    // 3. Effects
    const getLocalYYYYMMDD = (d: Date) => {
        const offset = d.getTimezoneOffset();
        return new Date(d.getTime() - offset * 60 * 1000).toISOString().split('T')[0];
    };

    useEffect(() => {
        if (!user.userId) return;
        const fetchWeekBusyDays = async () => {
            const today = new Date();
            today.setDate(today.getDate() + weekOffset * 7);
            const start = new Date(today);
            start.setDate(today.getDate() - today.getDay());
            const end = new Date(start);
            end.setDate(start.getDate() + 6);

            const startStr = getLocalYYYYMMDD(start);
            const endStr = getLocalYYYYMMDD(end);

            try {
                const response = await api.get(`/appointments/professional/dates`, {
                    params: { startDate: startStr, endDate: endStr }
                });
                const data = response.data;
                const days = new Set<string>();
                (data || []).forEach((a: any) => {
                    days.add(a.appointment_date.substring(0, 10));
                });
                setBusyDays(days);
            } catch (err) {
                console.error('Error fetching busy days', err);
            }
        };
        fetchWeekBusyDays();
    }, [user.userId, weekOffset]);

    useEffect(() => {
        if (!user.userId) return;
        const dateStr = getLocalYYYYMMDD(selectedDate);
        const fetchDay = async () => {
            try {
                const response = await api.get(`/appointments/professional/day`, {
                    params: { date: dateStr }
                });
                const data = response.data;

                setAppointments((data ?? []).map((a: any): ScheduleAppointment => {
                    const parts = a.appointment_date.replace(' ', 'T').split('T');
                    const timePart = parts[1] ? parts[1].split(':') : ['00', '00'];
                    return {
                        id: String(a.id),
                        appointment_date: a.appointment_date,
                        status: a.status,
                        reason: a.reason,
                        patient: {
                            first_name: a.first_name,
                            last_name: a.last_name
                        },
                        displayTime: `${timePart[0]}:${timePart[1]}`
                    };
                }));
            } catch (err) {
                console.error('Error fetching day appointments', err);
            }
        };
        fetchDay();
    }, [user.userId, selectedDate]);

    // 4. Handlers & Helpers
    const getWeekDays = () => {
        const today = new Date();
        today.setDate(today.getDate() + weekOffset * 7);
        const start = new Date(today);
        start.setDate(today.getDate() - today.getDay());
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });
    };

    const weekDays = getWeekDays();

    const isToday = (d: Date) => {
        const t = new Date();
        return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
    };

    const isSelected = (d: Date) => d.toDateString() === selectedDate.toDateString();

    const getStatusColor = (s: string) => s === 'agendada' ? 'bg-indigo-100 text-indigo-700' : s === 'completada' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebar active="/schedule" />
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-indigo-50/80 to-transparent -z-10"></div>
                <header className="px-8 py-8 animate-fade-in">
                    <Link href="/home/professional" className="text-indigo-600 flex items-center gap-1 text-sm font-bold mb-2 hover:gap-2 transition-all">
                        <ChevronLeft className="w-4 h-4" /> Volver al dashboard
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mi Agenda</h1>
                    <p className="text-slate-500 font-medium">Vista semanal de tus citas programadas.</p>
                </header>

                <div className="px-8 pb-12 flex-1 overflow-y-auto">
                    {/* Week Navigator */}
                    <div className="bg-white rounded-3xl p-6 border border-white shadow-sm mb-8 animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-800">
                                {MONTHS[weekDays[0].getMonth()]} {weekDays[0].getFullYear()}
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={() => setWeekOffset(w => w - 1)} className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={() => { setWeekOffset(0); setSelectedDate(new Date()); }} className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-sm font-bold hover:bg-indigo-100 transition-all">
                                    Hoy
                                </button>
                                <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {weekDays.map((d, i) => {
                                const active = isSelected(d);
                                const today = isToday(d);
                                const busy = busyDays.has(getLocalYYYYMMDD(d));
                                return (
                                    <button key={i} onClick={() => setSelectedDate(new Date(d))}
                                        className={`flex flex-col items-center p-3 rounded-2xl transition-all relative ${
                                            active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                                            : today ? 'bg-indigo-50 text-indigo-600 font-bold ring-2 ring-indigo-200' 
                                            : busy ? 'bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100' 
                                            : 'hover:bg-slate-50 text-slate-600'}`}>
                                        <span className="text-[11px] font-bold uppercase mb-1 opacity-80">{DAYS[d.getDay()]}</span>
                                        <span className="text-xl font-black">{d.getDate()}</span>
                                        {busy && (
                                            <span className={`absolute top-2 right-2 w-2 h-2 rounded-full shadow-sm ${active ? 'bg-white' : 'bg-emerald-500'}`}></span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Day appointments */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-700 mb-4">
                            {DAYS[selectedDate.getDay()]} {selectedDate.getDate()} de {MONTHS[selectedDate.getMonth()]}
                            <span className="ml-3 text-sm font-normal text-slate-400">({appointments.length} cita{appointments.length !== 1 ? 's' : ''})</span>
                        </h3>
                        <div className="space-y-4">
                            {appointments.length > 0 ? appointments.map((appt, i) => (
                                <div key={appt.id} className="bg-white rounded-3xl p-6 border border-white shadow-sm hover:shadow-md transition-all flex items-center gap-6 group animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-indigo-100">
                                        <Clock className="w-4 h-4 text-indigo-500 mb-1" />
                                        <span className="text-sm font-black text-indigo-700">{appt.displayTime}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(appt.status)}`}>
                                                {appt.status}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                                            {appt.patient?.first_name} {appt.patient?.last_name}
                                        </h4>
                                        <p className="text-sm text-slate-500 font-medium">{appt.reason || 'Consulta general'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {/* ✅ MEJORA 5: aria-label con contexto del paciente */}
                                        <button
                                            className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all"
                                            aria-label={`Marcar cita de ${appt.patient?.first_name} como completada`}>
                                            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                                        </button>
                                        <button
                                            className="p-3 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all"
                                            aria-label={`Cancelar cita de ${appt.patient?.first_name}`}>
                                            <XCircle className="w-5 h-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-16 border border-dashed border-slate-200 text-center">
                                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-800">Sin citas para este día</h3>
                                    <p className="text-slate-500 mt-1">Selecciona otro día del calendario.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
