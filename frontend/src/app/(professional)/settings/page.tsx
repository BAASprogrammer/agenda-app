"use client";
import { useUserStore } from "@/store/userStore";
import ProSidebar from "@/components/professional/ProSidebar";
import { Stethoscope, Mail, Save, Bell, Shield, ChevronLeft, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { supabase } from "@/lib/supabaseClient";
import { setAuthCookies } from "@/app/actions";

export default function ProfessionalSettings() {
    // 1. Hooks & Stores
    const { firstName: firstNameStore, lastName: lastNameStore, email: emailStore, userId, setUser } = useUserStore();
    const { data: profileData, isLoading: isProfileLoading } = useProfile(userId);
    const [message, setMessage] = useState("");

    // 2. State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subSpecialtyId: "",
        phone: "",
        address: ""
    });

    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile(userId, {
        onSuccess: async (data: any) => {
            // Update Zustand store
            setUser({
                firstName: data.first_name || data.firstName,
                lastName: data.last_name || data.lastName,
                email: data.email,
                userId: userId,
                isProfessional: "true"
            });

            // Update Auth Cookies for server-side persistence
            await setAuthCookies({
                firstName: data.first_name || data.firstName,
                lastName: data.last_name || data.lastName,
                email: data.email,
                isProfessional: "true",
                userId: userId
            });

            // Sync with Supabase Auth Metadata as backup
            await supabase.auth.updateUser({
                data: {
                    first_name: data.first_name || data.firstName,
                    last_name: data.last_name || data.lastName
                }
            });

            setMessage("Perfil actualizado correctamente! ✨");
            setTimeout(() => setMessage(""), 3000);
        },
        onError: (error: unknown) => {
            console.error("Error al actualizar:", error);
            setMessage(`Error al guardar: ${error instanceof Error ? error.message : "Contacta a soporte"}`);
        }
    });

    // 3. Effects - Hydrate form from profile data
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => {
        if (profileData) {
            setFormData({
                firstName: profileData.first_name || profileData.firstName || firstNameStore || "",
                lastName: profileData.last_name || profileData.lastName || lastNameStore || "",
                email: profileData.email || emailStore || "",
                subSpecialtyId: profileData.subspecialty_id || profileData.subSpecialtyId || "",
                phone: profileData.phone || "",
                address: profileData.address || ""
            });
        }
    }, [profileData, firstNameStore, lastNameStore, emailStore]);

    // 4. Handlers
    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateProfile({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            subSpecialtyId: formData.subSpecialtyId,
            isProfessional: true
        });
    };

    if (isProfileLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebar active="/settings" />
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-indigo-50/80 to-transparent -z-10"></div>

                <header className="px-8 py-8">
                    <Link href="/home/professional" className="text-indigo-600 flex items-center gap-1 text-sm font-bold mb-2 hover:gap-2 transition-all">
                        <ChevronLeft className="w-4 h-4" /> Inicio
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Configuración de Perfil</h1>
                    <p className="text-slate-500 font-medium">Administra la información de tu perfil profesional.</p>
                </header>

                <div className="px-8 pb-12 flex-1 overflow-y-auto">
                    <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-sm text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-indigo-500 to-cyan-500 -z-10"></div>
                                <div className="relative inline-block mb-4 mt-8">
                                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-indigo-50 flex items-center justify-center">
                                        <Stethoscope className="w-16 h-16 text-indigo-400" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {formData.firstName} {formData.lastName}
                                </h2>
                                <p className="text-slate-500 font-medium text-sm mb-6">Profesional de la Salud</p>
                                <div className="space-y-3 pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                        <Mail className="w-4 h-4 text-indigo-500" />
                                        {formData.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                        <Shield className="w-4 h-4 text-emerald-500" />
                                        Profesional Verificado
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 border border-white shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-amber-500" /> Notificaciones
                                </h3>
                                <div className="space-y-4 text-sm font-medium text-slate-500">
                                    Las configuraciones para alertas de SMS y correo electrónico estarán disponibles pronto.
                                </div>
                            </div>
                        </div>

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
                                                <label className="text-sm font-bold text-slate-700 ml-1">Apellido(s)</label>
                                                <input type="text" value={formData.lastName}
                                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Número de Teléfono</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <input type="tel" value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="+54 9..."
                                                        className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Dirección del Consultorio</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <input type="text" value={formData.address}
                                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                        placeholder="Dirección del consultorio"
                                                        className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 flex flex-col items-center gap-4 w-full">
                                        <p className={`text-sm font-bold transition-all text-center w-full ${message.includes("correctamente") ? 'text-emerald-600' : 'text-rose-500'} ${message ? 'opacity-100' : 'opacity-0'}`}>
                                            {message}
                                        </p>
                                        <button type="submit" disabled={isUpdating}
                                            className="flex items-center justify-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 w-full">
                                            <Save className="w-5 h-5" />
                                            {isUpdating ? "Guardando..." : "Guardar Perfil"}
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
