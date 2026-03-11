"use client";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
// ✅ MEJORA 1: componente compartido
import ProSidebar from "@/components/professional/ProSidebar";
import { Stethoscope, Mail, Save, Bell, Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProfessionalSettings() {
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        specialty: "",
        bio: "",
        startTime: "08:00",
        endTime: "18:00"
    });

    useEffect(() => {
        if (user.userId) {
            setFormData(prev => ({
                ...prev,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setMessage("Configuración guardada con éxito");
            setTimeout(() => setMessage(""), 3000);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebar active="/settings" />
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-indigo-50/80 to-transparent -z-10"></div>

                <header className="px-8 py-8 animate-fade-in">
                    <Link href="/home/professional" className="text-indigo-600 flex items-center gap-1 text-sm font-bold mb-2 hover:gap-2 transition-all">
                        <ChevronLeft className="w-4 h-4" /> Dashboard
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Configuración</h1>
                    <p className="text-slate-500 font-medium">Gestiona tu perfil profesional y horarios.</p>
                </header>

                <div className="px-8 pb-12 flex-1 overflow-y-auto">
                    <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Profile Card */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-sm text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-indigo-500 to-cyan-500 -z-10"></div>
                                <div className="relative inline-block mb-4 mt-8">
                                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-indigo-50 flex items-center justify-center">
                                        <Stethoscope className="w-16 h-16 text-indigo-400" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">Dr. {user.firstName} {user.lastName}</h2>
                                <p className="text-slate-500 font-medium text-sm mb-6">Profesional de la Salud</p>
                                <div className="space-y-3 pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                        <Mail className="w-4 h-4 text-indigo-500" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                        <Shield className="w-4 h-4 text-emerald-500" />
                                        Profesional Verificado
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="bg-white rounded-3xl p-6 border border-white shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-amber-500" /> Notificaciones
                                </h3>
                                <div className="space-y-4">
                                    {['Nueva cita agendada', 'Cita cancelada por paciente', 'Recordatorio diario'].map((label) => (
                                        <label key={label} className="flex items-center justify-between cursor-pointer group">
                                            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">{label}</span>
                                            <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                                                <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-4xl p-10 border border-white shadow-sm">
                                <form onSubmit={handleSave} className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-6">Información Personal</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Nombre</label>
                                                <input type="text" value={formData.firstName}
                                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Apellido</label>
                                                <input type="text" value={formData.lastName}
                                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Corro Electrónico</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <input type="email" value={formData.email} disabled
                                                        className="w-full pl-12 pr-5 py-3.5 bg-slate-100 border border-slate-100 rounded-2xl text-slate-500 font-medium cursor-not-allowed" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-6">Información Profesional</h3>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Especialidad</label>
                                                <input type="text" placeholder="ej. Medicina General, Cardiología..."
                                                    value={formData.specialty}
                                                    onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Descripción / Bio</label>
                                                <textarea rows={3} placeholder="Describe tu perfil profesional..."
                                                    value={formData.bio}
                                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium resize-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-6">Horario de Atención</h3>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Hora de inicio</label>
                                                <input type="time" value={formData.startTime}
                                                    onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Hora de fin</label>
                                                <input type="time" value={formData.endTime}
                                                    onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 flex items-center justify-between">
                                        <p className={`text-sm font-bold transition-all ${message ? 'text-emerald-600 opacity-100' : 'opacity-0'}`}>{message}</p>
                                        <button type="submit" disabled={loading}
                                            className="flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50">
                                            <Save className="w-5 h-5" />{loading ? "Guardando..." : "Guardar Cambios"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
