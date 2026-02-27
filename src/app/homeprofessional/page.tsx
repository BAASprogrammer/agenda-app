"use client";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import {
    Calendar, Users, Settings, LogOut, Activity,
    Clock, ChevronRight, Stethoscope, ClipboardList
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeProfessional() {
    const user = useUser();
    const [todayCount, setTodayCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [upcomingAppts, setUpcomingAppts] = useState<any[]>([]);

    useEffect(() => {
        if (!user.userId) return;

        const fetchStats = async () => {
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0];

            // Citas de hoy
            const { count: todayCnt } = await supabase
                .from('medical_appointments')
                .select('*', { count: 'exact', head: true })
                .eq('professional_id', user.userId)
                .gte('appointment_date', todayStr + ' 00:00')
                .lte('appointment_date', todayStr + ' 23:59');
            setTodayCount(todayCnt ?? 0);

            // Total pacientes únicos
            const { data: patients } = await supabase
                .from('medical_appointments')
                .select('patient_id')
                .eq('professional_id', user.userId);
            const unique = new Set((patients ?? []).map((p: any) => p.patient_id));
            setPatientCount(unique.size);

            // Próximas citas (hoy en adelante)
            const { data: upcoming } = await supabase
                .from('medical_appointments')
                .select(`id, appointment_date, status, reason, patient:users!medical_appointments_patient_id_fkey (first_name, last_name)`)
                .eq('professional_id', user.userId)
                .gte('appointment_date', todayStr + ' 00:00')
                .eq('status', 'agendada')
                .order('appointment_date', { ascending: true })
                .limit(4);

            setUpcomingAppts((upcoming ?? []).map((a: any) => {
                const parts = a.appointment_date.replace(' ', 'T').split('T');
                const timePart = parts[1] ? parts[1].split(':') : ['00', '00'];
                return { ...a, displayTime: `${timePart[0]}:${timePart[1]}` };
            }));
        };

        fetchStats();
    }, [user.userId]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col z-20">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-cyan-500">
                        AgendaApp
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/homeprofessional" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <Activity className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="/schedule" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <Calendar className="w-5 h-5" />
                        Ver Agenda
                    </Link>
                    <Link href="/manageappointments" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <ClipboardList className="w-5 h-5" />
                        Gestionar Citas
                    </Link>
                    <Link href="/mypatients" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <Users className="w-5 h-5" />
                        Mis Pacientes
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <Settings className="w-5 h-5" />
                        Configuración
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl font-medium transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-indigo-50/80 to-transparent -z-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none"></div>
                <div className="absolute top-32 -left-24 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

                {/* Header */}
                <header className="px-8 py-6 flex justify-between items-center animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Panel Profesional</h1>
                        <p className="text-slate-500 mt-1 font-medium">Bienvenido, Dr. {user.firstName} {user.lastName}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center shadow-sm hover:ring-2 hover:ring-indigo-300 transition-all cursor-pointer">
                        <Stethoscope className="w-6 h-6 text-indigo-600" />
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="px-8 py-4 flex-1 overflow-y-auto">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-full">hoy</span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Citas Hoy</h3>
                            <p className="text-3xl font-extrabold text-slate-800 mt-1">{todayCount}</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-inner">
                                    <Users className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-cyan-600 bg-cyan-100 px-2.5 py-1 rounded-full">total</span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Pacientes</h3>
                            <p className="text-3xl font-extrabold text-slate-800 mt-1">{patientCount}</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                                    <ClipboardList className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">pendientes</span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Próximas Citas</h3>
                            <p className="text-3xl font-extrabold text-slate-800 mt-1">{upcomingAppts.length}</p>
                        </div>
                    </div>

                    {/* Quick Actions & Upcoming */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {/* Quick Actions Card */}
                        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-indigo-50 to-cyan-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110 duration-700 pointer-events-none"></div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Gestiona tu agenda</h2>
                            <p className="text-slate-500 mb-8 max-w-sm font-medium leading-relaxed">
                                Mantente organizado y revisa tus citas de forma rápida. ¡Gracias por ser parte de <strong className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-indigo-500 text-lg">AgendaApp</strong>!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/schedule" className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300">
                                    <Calendar className="w-5 h-5" />
                                    Ver Agenda
                                </Link>
                                <Link href="/manageappointments" className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-4 rounded-xl font-bold hover:border-indigo-300 hover:text-indigo-600 hover:bg-slate-50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300">
                                    <ClipboardList className="w-5 h-5" />
                                    Gestionar Citas
                                </Link>
                            </div>
                        </div>

                        {/* Upcoming Appointments */}
                        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-slate-800">Próximas Citas de Hoy</h2>
                                <Link href="/schedule" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center group">
                                    Ver todas <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {upcomingAppts.length > 0 ? upcomingAppts.map((appt, i) => (
                                    <div key={appt.id} className="group flex items-center p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                                        <div className="w-16 text-center">
                                            <span className="block text-sm font-black text-slate-700">{appt.displayTime}</span>
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">hrs</span>
                                        </div>
                                        <div className="w-1 h-10 bg-indigo-100 rounded-full mx-4 group-hover:bg-indigo-300 transition-colors"></div>
                                        <div className="flex-1 flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-slate-800">{appt.patient?.first_name} {appt.patient?.last_name}</p>
                                                <p className="text-xs font-semibold text-slate-500">{appt.reason || 'Consulta general'}</p>
                                            </div>
                                            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
                                                Agendada
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-slate-400">
                                        <Clock className="w-10 h-10 mx-auto mb-2 opacity-40" />
                                        <p className="font-medium text-sm">No hay citas para hoy</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}