"use client";
import AppointmentDetails from "@/components/patient/AppointmentDetails";
import ProSidebarPatient from "@/components/patient/ProSidebar";
import { useUserStore } from "@/store/userStore";
import { api } from "@/lib/api";
import { CalendarClock, NotepadText, CircleUser, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    // 1. Hooks & Stores
    const user = useUserStore();

    // 2. State
    const [appointments, setAppointments] = useState<any[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

    // 3. Effects
    useEffect(() => {
        const fetchAppointments = async () => {
            if (!user.userId) return;
            try {
                const response = await api.get('/appointments/appointmentsbyid', {
                    params: { patientId: user.userId, order: "ASC" }
                });
                const data = response.data;

                // Pre-procesar fechas para evitar lógica repetitiva en el render
                const formattedData = (data ?? []).map((appt: any) => {
                    const isoStr = appt.appointment_date.replace(' ', 'T');
                    const parts = isoStr.split('T');
                    const datePart = parts[0];
                    const timePart = parts[1] ? parts[1].split(':') : ['00', '00'];

                    const [year, month, day] = datePart.split('-').map(Number);
                    const d = new Date(year, month - 1, day);

                    return {
                        ...appt,
                        id: String(appt.id),
                        displayMonth: isNaN(d.getTime()) ? '---' : d.toLocaleString('es-CL', { month: 'short' }).replace('.', ''),
                        displayDay: isNaN(d.getTime()) ? '--' : d.getDate(),
                        displayTime: `${timePart[0]}:${timePart[1]}`,
                        professional: {
                            first_name: appt.professional_first_name,
                            last_name: appt.professional_last_name
                        }
                    };
                });

                setAppointments(formattedData);
            } catch (error) {
                console.error("Error obteniendo citas:", error);
            }
        }
        fetchAppointments();
    }, [user.userId]);

    // 4. Derived Data
    const futureAppointments = appointments.filter(appt => appt.appointment_date.split('T')[0] >= new Date().toLocaleDateString("en-CA") && appt.status == "agendada");
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebarPatient active="/home/patient" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-50/70 to-transparent -z-10"></div>
                <div className="absolute top-10 right-10 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float pointer-events-none"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

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
                    <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-3xl p-8 text-white mb-8 shadow-lg shadow-teal-200/50 relative overflow-hidden animate-fade-in-up">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <h2 className="text-2xl font-bold mb-2">¡Bienvenido de nuevo, {user.firstName}!</h2>
                        <p className="text-teal-50 max-w-lg mb-6 leading-relaxed">
                            Aquí podrás gestionar tus citas, revisar tu historial médico y actualizar tu información personal de forma rápida y segura.
                        </p>
                        <Link href="/scheduleappointment" className="bg-white text-teal-700 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Agendar Nueva Cita
                        </Link>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-800 mb-4 tracking-tight">Accesos Rápidos</h3>

                    {/* Action Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Card 1 */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <CalendarClock className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Mis Citas</h4>
                            <p className="text-slate-500 text-sm mb-4">Revisa, reprograma o cancela tus citas agendadas.</p>
                            <Link href="/myappointments">
                                <span className="text-teal-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Ver panel <ChevronRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <NotepadText className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Historial Médico</h4>
                            <p className="text-slate-500 text-sm mb-4">Accede a tus diagnósticos y recetas anteriores.</p>
                            <Link href="/medicalhistory">
                                <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Ver historial <ChevronRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <CircleUser className="w-7 h-7" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">Mi Perfil</h4>
                            <p className="text-slate-500 text-sm mb-4">Actualiza tus datos personales y de contacto.</p>
                            <Link href="/profile">
                                <span className="text-amber-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Configurar <ChevronRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Appointments Section */}
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Mis Próximas Citas</h3>
                        <Link href="/myappointments" className="text-cyan-600 text-sm font-bold hover:underline">
                            Ver todas
                        </Link>
                    </div>

                    <div className="space-y-4 mb-12">
                        {futureAppointments.length > 0 ? (
                            futureAppointments.map((appointment, index) => (
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
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${index === 0
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-teal-50 text-teal-700"
                                                        }`}>
                                                        {index === 0 ? "Próxima" : "Programada"}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Id: #{appointment.id?.toString().slice(-4) || '---'}</span>
                                                </div>
                                                <h4 className="font-bold text-slate-800 text-lg group-hover:text-cyan-700 transition-colors">Cita de Especialidad</h4>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                    <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
                                                        <Clock className="w-4 h-4 text-teal-500" />
                                                        {appointment.displayTime} hrs
                                                    </p>
                                                    <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
                                                        <CircleUser className="w-4 h-4 text-teal-500" />
                                                        Dr. {appointment.professional?.first_name} {appointment.professional?.last_name}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="self-start md:self-center bg-white border border-slate-100 text-slate-700 px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
                                                onClick={() => setSelectedAppointment(appointment)}>
                                                Detalles
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-dashed border-slate-200 text-center animate-fade-in">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                    <CalendarClock className="w-8 h-8" />
                                </div>
                                <h4 className="text-slate-800 font-bold text-lg mb-1">Sin citas próximas</h4>
                                <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">Cuando agendes una nueva cita médica, aparecerá aquí detallada.</p>
                                <Link href="/scheduleappointment" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-700 transition-all shadow-md shadow-teal-100">
                                    Agendar ahora
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            {/* Appointment Details Modal */}
            {selectedAppointment && (
                <AppointmentDetails appointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment} />
            )}
        </div>
    );
}