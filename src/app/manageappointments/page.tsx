"use client";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import {
    Calendar, Users, Settings, LogOut, Activity,
    ClipboardList, Search, Filter, CheckCircle2, XCircle, Clock, ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function ProSidebar({ active }: { active: string }) {
    return (
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col z-20">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md">
                    <Activity className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-cyan-500">AgendaApp</span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {[
                    { href: "/homeprofessional", icon: <Activity className="w-5 h-5" />, label: "Dashboard" },
                    { href: "/schedule", icon: <Calendar className="w-5 h-5" />, label: "Ver Agenda" },
                    { href: "/manageappointments", icon: <ClipboardList className="w-5 h-5" />, label: "Gestionar Citas" },
                    { href: "/mypatients", icon: <Users className="w-5 h-5" />, label: "Mis Pacientes" },
                    { href: "/settings", icon: <Settings className="w-5 h-5" />, label: "Configuración" },
                ].map(item => (
                    <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:scale-[1.02] ${active === item.href ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}>
                        {item.icon}{item.label}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-100">
                <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl font-medium transition-all">
                    <LogOut className="w-5 h-5" />Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}

export default function ManageAppointments() {
    const user = useUser();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [filter, setFilter] = useState("todas");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchAppointments = async () => {
        if (!user.userId) return;
        setLoading(true);
        let query = supabase
            .from('medical_appointments')
            .select(`id, appointment_date, status, reason, patient:users!medical_appointments_patient_id_fkey (first_name, last_name)`)
            .eq('professional_id', user.userId)
            .order('appointment_date', { ascending: false });

        if (filter !== "todas") query = query.eq('status', filter);

        const { data } = await query;
        const formatted = (data ?? []).map((a: any) => {
            const parts = a.appointment_date.replace(' ', 'T').split('T');
            const datePart = parts[0];
            const timePart = parts[1] ? parts[1].split(':') : ['00', '00'];
            const [yr, mo, dy] = datePart.split('-').map(Number);
            const d = new Date(yr, mo - 1, dy);
            return {
                ...a,
                displayDate: isNaN(d.getTime()) ? datePart : d.toLocaleDateString('cl-CL', { day: '2-digit', month: 'short', year: 'numeric' }),
                displayTime: `${timePart[0]}:${timePart[1]}`
            };
        });
        setLoading(false);
        setAppointments(formatted);
    };

    useEffect(() => { fetchAppointments(); }, [user.userId, filter]);

    const updateStatus = async (id: string, newStatus: string) => {
        await supabase.from('medical_appointments').update({ status: newStatus }).eq('id', id);
        fetchAppointments();
    };

    const getStatusColor = (s: string) => s === 'agendada' ? 'bg-indigo-100 text-indigo-700' : s === 'completada' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';

    const filtered = appointments.filter(a => {
        const name = `${a.patient?.first_name ?? ''} ${a.patient?.last_name ?? ''}`.toLowerCase();
        return name.includes(search.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebar active="/manageappointments" />
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-indigo-50/80 to-transparent -z-10"></div>
                <header className="px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
                    <div>
                        <Link href="/homeprofessional" className="text-indigo-600 flex items-center gap-1 text-sm font-bold mb-2 hover:gap-2 transition-all">
                            <ChevronLeft className="w-4 h-4" /> Dashboard
                        </Link>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Gestionar Citas</h1>
                        <p className="text-slate-500 font-medium">Administra el estado de todas tus citas.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Buscar paciente..." value={search} onChange={e => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all w-56" />
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div className="px-8 pb-12 flex-1 overflow-y-auto">
                    {/* Filter tabs */}
                    <div className="flex gap-2 mb-8 bg-slate-100/50 p-1 rounded-2xl w-fit">
                        {['todas', 'agendada', 'completada', 'cancelada'].map(s => (
                            <button key={s} onClick={() => setFilter(s)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${filter === s ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                {s}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-slate-400 font-medium">Cargando...</div>
                    ) : (
                        <div className="space-y-4">
                            {filtered.length > 0 ? filtered.map((appt, i) => (
                                <div key={appt.id} className="bg-white rounded-3xl p-6 border border-white shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4 group animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(appt.status)}`}>{appt.status}</span>
                                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                                <Clock className="w-3 h-3" />{appt.displayDate} · {appt.displayTime} hrs
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                                            {appt.patient?.first_name} {appt.patient?.last_name}
                                        </h4>
                                        <p className="text-sm text-slate-500">{appt.reason || 'Consulta general'}</p>
                                    </div>
                                    {appt.status === 'agendada' && (
                                        <div className="flex gap-2 shrink-0">
                                            <button onClick={() => updateStatus(appt.id, 'completada')}
                                                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-100 transition-all text-sm">
                                                <CheckCircle2 className="w-4 h-4" />Completar
                                            </button>
                                            <button onClick={() => updateStatus(appt.id, 'cancelada')}
                                                className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 font-bold rounded-2xl hover:bg-rose-100 transition-all text-sm">
                                                <XCircle className="w-4 h-4" />Cancelar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )) : (
                                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-16 border border-dashed border-slate-200 text-center">
                                    <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-800">Sin citas encontradas</h3>
                                    <p className="text-slate-500 mt-1">No hay citas que coincidan con el filtro seleccionado.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
