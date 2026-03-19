"use client";

import { supabase } from "@/lib/supabaseClient";
import {
    Calendar,
    Stethoscope,
    ChevronLeft,
    ArrowRight,
    CircleUser,
    CheckCircle2,
    XCircle,
    Briefcase,
    ClipboardList,
    Clock
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Specialty { id: string; name: string; }
interface SubSpecialty { id: string; name: string; specialty_id: string; }
interface Professional { id: string; first_name: string; last_name: string; }

export default function ScheduleAppointment() {
    const [isScheduleAppointmentOpen, setIsScheduleAppointmentOpen] = useState<boolean>(false);
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [subSpecialties, setSubSpecialties] = useState<SubSpecialty[]>([]);
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
    const [selectedSubSpecialty, setSelectedSubSpecialty] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [appointment, setAppointment] = useState<{
        date: string;
        time: string;
        professional: string;
        reason: string;
    }>({
        date: "",
        time: "",
        professional: "",
        reason: ""
    });
    const handleScheduleAppointment = () => {
        setIsScheduleAppointmentOpen(true);
    };
    useEffect(() => {
        const fetchSpecialties = async () => {
            const { data, error } = await supabase.from('medical_specialties').select('*');
            if (error) {
                console.error('Error al obtener las especialidades:', error);
            } else {
                setSpecialties(data);
            }
        };
        fetchSpecialties();
    }, []);
    const handleSpecialtyChange = async (specialty_id: string) => {
        setSelectedSpecialty(specialty_id);
        if (specialty_id) {
            const { data, error } = await supabase.from('medical_subspecialties').select('*').eq('specialty_id', specialty_id);
            if (error) {
                console.error('Error al obtener las subespecialidades:', error);
                setSubSpecialties([]);
            } else {
                setSubSpecialties(data);
            }
        }
    };
    const handleSubSpecialtyChange = async (subspecialty_id: string) => {
        setSelectedSubSpecialty(subspecialty_id);
        if (subspecialty_id) {

            const { data, error } = await supabase.from('users').select('first_name, last_name, id').eq('is_professional', true).eq('subspecialty_id', subspecialty_id);
            if (error) {
                console.error('Error al obtener los profesionales:', error);
                setProfessionals([]);
            } else {
                setProfessionals(data);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setMessage('Error: Debes iniciar sesión para crear una cita');
            return false;
        }
        if (!selectedSpecialty || !selectedSubSpecialty || !appointment.professional || !appointment.date || !appointment.time || !appointment.reason) {
            setMessage('Error: Debes completar todos los campos');
            return false;
        }
        const now = new Date();
        const nowHours = now.getHours();
        const nowMinutes = now.getMinutes();
        const nowDate = now.toLocaleDateString("en-CA");
        if (appointment.date == nowDate && appointment.time < nowHours + ":" + nowMinutes) {
            setMessage('Error: No es posible agendar citas con fecha y hora anteriores a la actual');
            return false;
        }
        const appointmentData = {
            patient_id: user.id,
            subspecialty_id: selectedSubSpecialty,
            professional_id: appointment.professional,
            appointment_date: appointment.date + " " + appointment.time,
            reason: appointment.reason,
            status: 'agendada'
        };
        const { error } = await supabase.from('medical_appointments').insert(appointmentData);
        if (error) {
            setMessage('Error al crear la cita');
            return false;
        } else {
            setMessage('Cita creada exitosamente');
            setIsScheduleAppointmentOpen(false);
            resetForm();
            return true;
        }
    };
    const handleCloseModal = () => {
        setMessage('');
    };

    const resetForm = () => {
        setAppointment({
            date: '',
            time: '',
            professional: '',
            reason: ''
        });
        setSelectedSpecialty('');
        setSelectedSubSpecialty('');
        setSubSpecialties([]);
        setProfessionals([]);
    };
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans text-slate-800">
            {/* Background Decorations for Premium Look */}
            <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-cyan-50/80 to-transparent -z-10"></div>
            <div className="absolute top-[10%] right-[-5%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none"></div>
            <div className="absolute bottom-20 left-[-5%] w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[80vh]">

                {/* Back Link */}
                <div className="w-full mb-8 animate-fade-in">
                    <Link href="/home/patient" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-cyan-600 hover:border-cyan-200 hover:bg-cyan-50 transition-all shadow-sm group">
                        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span className="font-semibold text-sm">Volver al Panel</span>
                    </Link>
                </div>

                {/* Main Aesthetic Container */}
                <div className="w-full bg-white/70 backdrop-blur-2xl rounded-[3rem] p-10 md:p-16 border border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden animate-fade-in-up text-center">

                    {/* Decorative Top Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>

                    {/* Icon Header */}
                    <div className="mb-10 relative">
                        <div className="w-24 h-24 bg-linear-to-br from-cyan-500 to-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-cyan-200 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Calendar className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute top-0 right-[40%] w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float">
                            <Stethoscope className="w-5 h-5 text-cyan-600" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 tracking-tight">
                        Agendar Nueva Cita
                    </h1>

                    <div className="space-y-4 max-w-2xl mx-auto">
                        <p className="text-xl text-slate-600 font-medium leading-relaxed">
                            Aquí podrás agendar una nueva cita con un profesional de la salud.
                        </p>
                        <p className="text-lg text-slate-500 leading-relaxed bg-slate-50/50 py-4 px-6 rounded-2xl border border-slate-100 flex items-center justify-center gap-3">
                            <CircleUser className="w-6 h-6 text-cyan-500" />
                            Selecciona el profesional de la salud con el que deseas agendar una cita.
                        </p>
                    </div>

                    {/* Visual Call to Action (Purely Aesthetic) */}
                    <div className="mt-12">
                        <button className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden transition-all cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-slate-200 active:scale-95"
                            onClick={handleScheduleAppointment}>
                            <span className="relative z-10 flex items-center gap-2">
                                Comenzar ahora <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </div>

                    {/* Decorative Blobs Internal */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                </div>

                {/* Footer Insight */}
                <p className="mt-10 text-slate-400 font-medium text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    Tu salud es nuestra prioridad • AgendaApp {new Date().getFullYear()}
                </p>
            </div>
            {message && (
                <div className="fixed inset-0 flex items-center justify-center z-101 animate-fade-in">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"></div>
                    <div className="relative bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white max-w-sm w-full mx-4 transform animate-scale-in text-center">
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center ${message.includes('Error') ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                            {message.includes('Error') ? (
                                <XCircle className="w-10 h-10" />
                            ) : (
                                <CheckCircle2 className="w-10 h-10" />
                            )}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                            {message.includes('Error') ? '¡Ups! Algo salió mal' : '¡Todo listo!'}
                        </h3>
                        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                            {message}
                        </p>
                        <button
                            onClick={() => handleCloseModal()}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 cursor-pointer"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
            {/* Modal de Citas */}
            {isScheduleAppointmentOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-100 animate-fade-in p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsScheduleAppointmentOpen(false)}></div>
                    <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-white max-w-2xl w-full overflow-hidden transform animate-scale-in">

                        {/* Modal Header */}
                        <div className="bg-linear-to-r from-cyan-600 to-blue-600 p-8 text-white relative">
                            <button
                                onClick={() => setIsScheduleAppointmentOpen(false)}
                                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors cursor-pointer"
                            >
                                <XCircle className="w-6 h-6 text-white" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <Stethoscope className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight">Agendar Cita</h2>
                                    <p className="text-cyan-50 font-medium opacity-90">Completa los detalles para tu consulta</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 md:p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Specialty */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-cyan-500" /> Especialidad
                                    </label>
                                    <div className="relative group">
                                        <select
                                            className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-hidden transition-all font-medium text-slate-700 cursor-pointer"
                                            value={selectedSpecialty}
                                            onChange={(e) => handleSpecialtyChange(e.target.value)}
                                        >
                                            <option value="">Seleccionar Especialidad</option>
                                            {specialties.map(specialty => (
                                                <option key={specialty.id} value={specialty.id}>
                                                    {specialty.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-cyan-500 transition-colors">
                                            <ChevronLeft className="w-5 h-5 -rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                {/* Sub-Specialty */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <Stethoscope className="w-4 h-4 text-cyan-500" /> Sub-Especialidad
                                    </label>
                                    <div className="relative group">
                                        <select
                                            className={`w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-hidden transition-all font-medium text-slate-700 cursor-pointer ${!selectedSpecialty ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            value={selectedSubSpecialty}
                                            onChange={(e) => handleSubSpecialtyChange(e.target.value)}
                                            disabled={!selectedSpecialty}
                                        >
                                            <option value="">Seleccionar Sub-Especialidad</option>
                                            {subSpecialties.map(subSpecialty => (
                                                <option key={subSpecialty.id} value={subSpecialty.id}>
                                                    {subSpecialty.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-cyan-500 transition-colors">
                                            <ChevronLeft className="w-5 h-5 -rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                {/* Professional */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <CircleUser className="w-4 h-4 text-cyan-500" /> Profesional
                                    </label>
                                    <div className="relative group">
                                        <select
                                            className={`w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-hidden transition-all font-medium text-slate-700 cursor-pointer ${!selectedSubSpecialty ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            value={appointment.professional}
                                            onChange={(e) => setAppointment({ ...appointment, professional: e.target.value })}
                                            disabled={!selectedSubSpecialty}
                                        >
                                            <option value="">Seleccionar Profesional</option>
                                            {professionals.map(professional => (
                                                <option key={professional.id} value={professional.id}>
                                                    {professional.first_name} {professional.last_name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-cyan-500 transition-colors">
                                            <ChevronLeft className="w-5 h-5 -rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                {/* Reason */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <ClipboardList className="w-4 h-4 text-cyan-500" /> Motivo de la Consulta
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-hidden transition-all font-medium text-slate-700 min-h-[100px] resize-none"
                                        placeholder="Cuéntanos brevemente el motivo de tu visita..."
                                        value={appointment.reason}
                                        onChange={(e) => setAppointment({ ...appointment, reason: e.target.value })}
                                    />
                                </div>

                                {/* Date */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-cyan-500" /> Fecha
                                    </label>
                                    <input
                                        type="date" min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-hidden transition-all font-medium text-slate-700 cursor-pointer"
                                        value={appointment.date}
                                        onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                                    />
                                </div>

                                {/* Time */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-cyan-500" /> Hora
                                    </label>
                                    <select name="time" id="time" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-hidden transition-all font-medium text-slate-700 cursor-pointer" value={appointment.time.substring(0, 5)} onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}>
                                        <option value="">Seleccionar Hora</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                    </select>
                                </div>
                            </div>

                            {/* Modal Footer Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
                                <button
                                    type="button"
                                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors cursor-pointer order-2 sm:order-1"
                                    onClick={() => setIsScheduleAppointmentOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200 active:scale-95 cursor-pointer order-1 sm:order-2 flex items-center justify-center gap-2 min-w-[160px]"
                                >
                                    Agendar Cita <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}