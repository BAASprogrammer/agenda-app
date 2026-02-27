"use client";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import { CalendarDays, FileText, UserCircle, LogOut, HeartPulse, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePatiente() {
    const user = useUser();
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const { data, error } = await supabase
                .from('medical_appointments')
                .select(`id, appointment_date, status, professional_id, professional:users!medical_appointments_professional_id_fkey (first_name, last_name)`)
                .eq('patient_id', user.userId)
                .order('appointment_date', { ascending: true });

            if (error) {
                console.error("Error obteniendo citas:", error);
                return;
            }

            // Pre-procesar fechas para evitar lógica repetitiva en el render
            const formattedData = (data ?? []).map(appt => {
                const isoStr = appt.appointment_date.replace(' ', 'T');
                const parts = isoStr.split('T');
                const datePart = parts[0];
                const timePart = parts[1] ? parts[1].split(':') : ['00', '00'];

                const [year, month, day] = datePart.split('-').map(Number);
                const d = new Date(year, month - 1, day);

                return {
                    ...appt,
                    displayMonth: isNaN(d.getTime()) ? '---' : d.toLocaleString('cl-CL', { month: 'short' }).replace('.', ''),
                    displayDay: isNaN(d.getTime()) ? '--' : d.getDate(),
                    displayTime: `${timePart[0]}:${timePart[1]}`
                };
            });

            setAppointments(formattedData);
        }
        fetchAppointments();
    }, [user.userId])

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col z-20">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                        <HeartPulse className="text-white w-6 h-6 animate-pulse-slow" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                        AgendaApp
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-cyan-50 text-cyan-700 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <HeartPulse className="w-5 h-5" />
                        Mi Resumen
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-cyan-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <CalendarDays className="w-5 h-5" />
                        Mis Citas
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-cyan-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <FileText className="w-5 h-5" />
                        Historial Médico
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-cyan-600 rounded-xl font-medium transition-all hover:scale-[1.02]">
                        <UserCircle className="w-5 h-5" />
                        Mi Perfil
                    </a>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl font-medium transition-all hover:scale-[1.02]"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-50/80 to-transparent -z-10"></div>
                <div className="absolute top-10 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

                {/* Header */}
                <header className="px-8 py-6 flex justify-between items-center animate-fade-in border-b border-transparent">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Panel de Paciente</h1>
                        <p className="text-slate-500 mt-1 font-medium">¡Hola, {user.firstName}! ¿Cómo te sientes hoy?</p>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="px-8 py-6 flex-1 overflow-y-auto">
                    {/* Welcome Card */}
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-8 text-white mb-8 shadow-lg shadow-cyan-200 relative overflow-hidden animate-fade-in-up">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <h2 className="text-2xl font-bold mb-2">¡Bienvenido de nuevo, {user.firstName}!</h2>
                        <p className="text-cyan-50 max-w-lg mb-6 leading-relaxed">
                            Aquí podrás gestionar tus citas, revisar tu historial médico y actualizar tu información personal de forma rápida y segura.
                        </p>
                        <Link href="/scheduleappointment" className="bg-white text-cyan-700 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Agendar Nueva Cita
                        </Link>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-800 mb-4 tracking-tight">Accesos Rápidos</h3>

                    {/* Action Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Card 1 */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                                <CalendarDays className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Mis Citas</h4>
                            <p className="text-slate-500 text-sm mb-4">Revisa, reprograma o cancela tus citas agendadas.</p>
                            <span className="text-indigo-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Ver panel <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Historial Médico</h4>
                            <p className="text-slate-500 text-sm mb-4">Accede a tus diagnósticos y recetas anteriores.</p>
                            <span className="text-teal-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Ver historial <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
                                <UserCircle className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Mi Perfil</h4>
                            <p className="text-slate-500 text-sm mb-4">Actualiza tus datos personales y de contacto.</p>
                            <span className="text-rose-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Configurar <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>

                    {/* Appointments Section */}
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Mis Próximas Citas</h3>
                        <Link href="/scheduleappointment" className="text-cyan-600 text-sm font-bold hover:underline">
                            Ver todas
                        </Link>
                    </div>

                    <div className="space-y-4 mb-12">
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <div
                                    key={appointment.id}
                                    className="bg-white/80 backdrop-blur-md rounded-3xl p-5 border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-6 group animate-fade-in-up"
                                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                                >
                                    {/* Date Badge */}
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-white shadow-sm group-hover:from-cyan-100 group-hover:to-blue-100 transition-colors">
                                        <span className="text-[10px] font-black text-cyan-600 uppercase tracking-tighter">
                                            {appointment.displayMonth}
                                        </span>
                                        <span className="text-2xl font-black text-slate-800 leading-none">
                                            {appointment.displayDay}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${index === 0 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                                                        {index === 0 ? "Próxima" : "Programada"}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Id: #{appointment.id?.toString().slice(-4) || '---'}</span>
                                                </div>
                                                <h4 className="font-bold text-slate-800 text-lg group-hover:text-cyan-700 transition-colors">Cita de Especialidad</h4>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                    <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
                                                        <Clock className="w-4 h-4 text-cyan-500" />
                                                        {appointment.displayTime} hrs
                                                    </p>
                                                    <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
                                                        <UserCircle className="w-4 h-4 text-cyan-500" />
                                                        Dr. {appointment.professional?.first_name} {appointment.professional?.last_name}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="self-start md:self-center bg-white border border-slate-100 text-slate-700 px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95">
                                                Detalles
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-dashed border-slate-200 text-center animate-fade-in">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                    <CalendarDays className="w-8 h-8" />
                                </div>
                                <h4 className="text-slate-800 font-bold text-lg mb-1">Sin citas próximas</h4>
                                <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">Cuando agendes una nueva cita médica, aparecerá aquí detallada.</p>
                                <Link href="/scheduleappointment" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-cyan-700 transition-all shadow-md shadow-cyan-100">
                                    Agendar ahora
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}