"use client";
import ProSidebarPatient from "@/components/patient/ProSidebar";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import {
    CircleUser,
    Mail,
    Phone,
    MapPin,
    Shield,
    Bell,
    Save
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Profile() {
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        const fetchPatientData = async () => {
            if (user.userId) {
                const { data: patient, error } = await supabase
                    .from("users")
                    .select("phone, address")
                    .eq("id", user.userId)
                    .single();
                if (error) {
                    console.error("Error fetching patient data:", error);
                }
                setFormData({
                    first_name: user.firstName || "",
                    last_name: user.lastName || "",
                    email: user.email || "",
                    phone: patient?.phone || "",
                    address: patient?.address || ""
                });
            }
        };

        fetchPatientData();
    }, [user]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const { error } = await supabase
            .from("users")
            .update(formData)
            .eq("id", user.userId);

        if (error) {
            setMessage("Error updating profile, please contact us");
        } else {
            setMessage("Profile updated successfully");
        }

        setLoading(false);
        setTimeout(() => setMessage(""), 5000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebarPatient active="/profile" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-cyan-50/80 to-transparent -z-10"></div>

                <header className="px-8 py-8 animate-fade-in">
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mi Perfil</h1>
                    <p className="text-slate-500 font-medium">Gestiona tu información personal y preferencias.</p>
                </header>

                <div className="px-8 pb-12 flex-1 overflow-y-auto">
                    <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Avatar & Summary Card */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-sm text-center relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-cyan-500 to-blue-600 -z-10"></div>
                                <div className="relative inline-block mb-4 mt-8">
                                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-50 flex items-center justify-center text-teal-500">
                                        <CircleUser className="w-20 h-20" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">{user.firstName} {user.lastName}</h2>
                                <p className="text-slate-500 font-medium text-sm mb-6">Paciente Miembro</p>

                                <div className="space-y-3 pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                        <Mail className="w-4 h-4 text-teal-500" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                        <Shield className="w-4 h-4 text-emerald-500" />
                                        Cuenta Verificada
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-4xl p-10 border border-white shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-amber-500" /> Notificaciones
                                </h3>
                                <div className="space-y-4">
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">Alertas por Email</span>
                                        <div className="w-10 h-5 bg-teal-600 rounded-full relative">
                                            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                                        </div>
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">Recordatorios de Citas</span>
                                        <div className="w-10 h-5 bg-teal-600 rounded-full relative">
                                            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-4xl p-10 border border-white shadow-sm">
                                <form onSubmit={handleSave} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Nombre</label>
                                            <input
                                                type="text"
                                                value={formData.first_name}
                                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Apellido</label>
                                            <input
                                                type="text"
                                                value={formData.last_name}
                                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Correo Electrónico</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    disabled
                                                    className="w-full pl-12 pr-5 py-3.5 bg-slate-100 border border-slate-100 rounded-2xl text-slate-500 font-medium cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Número de Teléfono</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="tel"
                                                    placeholder="+56 9 1234 5678"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Dirección</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="123 Example St, City"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 flex items-center justify-between">
                                        <p className={`text-sm font-bold transition-all ${message &&
                                            (message.toLowerCase().includes("error") ? 'text-red-500 opacity-100' : 'text-emerald-500 opacity-100')}`}>
                                            {message}
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-4 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-blue-200 active:scale-95 disabled:opacity-50"
                                        >
                                            <Save className="w-5 h-5" />
                                            {loading ? "Guardando..." : "Guardar Cambios"}
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
