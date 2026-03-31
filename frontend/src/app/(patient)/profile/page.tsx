"use client";
import ProSidebarPatient from "@/components/patient/ProSidebar";
import { useUserStore } from "@/store/userStore";
import {
    CircleUser,
    Mail,
    Phone,
    MapPin,
    Shield,
    Bell,
    Save
} from "lucide-react";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setAuthCookies } from "@/app/actions";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";

interface PatientData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
}
export default function Profile() {
    // 1. Hooks & Stores
    const userId = useUserStore(state => state.userId);
    const firstNameStore = useUserStore(state => state.firstName);
    const lastNameStore = useUserStore(state => state.lastName);
    const emailStore = useUserStore(state => state.email);
    const setUser = useUserStore(state => state.setUser);
    const queryClient = useQueryClient();

    // 2. State
    const [message, setMessage] = useState<string>("");
    const [isInitialized, setIsInitialized] = useState(false);
    const [formData, setFormData] = useState<PatientData>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: ""
    });

    // 3. Queries
    const { data: patient } = useProfile(userId!);
    const { mutate: update, isPending } = useUpdateProfile(userId!, {
        onSuccess: (updatedData: { first_name: string; last_name: string; email: string }) => {
            setUser({
                userId: userId,
                firstName: updatedData.first_name,
                lastName: updatedData.last_name,
                email: updatedData.email
            });
            setAuthCookies({
                firstName: updatedData.first_name,
                lastName: updatedData.last_name,
                email: updatedData.email,
                userId: userId,
                isProfessional: "false"
            });
            setMessage("Perfil actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: ["patient", userId] });
        },
        onError: (error: unknown) => {
            console.error("Error al actualizar:", error);
            setMessage(`Error al guardar: ${error instanceof Error ? error.message : "Contacta a soporte"}`);
        }
    });
    // const { mutate: update, isPending } = useMutation({
    //     mutationFn: async (patientData: PatientData) => {
    //         const { email, ...updateData } = patientData;
    //         const { error } = await supabase
    //             .from("users")
    //             .update(updateData)
    //             .eq("id", userId);

    //         if (error) throw error;
    //         return patientData;
    //     },
    //     onSuccess: (updatedData) => {
    //         setUser({
    //             userId: userId,
    //             firstName: updatedData.first_name,
    //             lastName: updatedData.last_name,
    //             email: updatedData.email
    //         });
    //         setAuthCookies({
    //             firstName: updatedData.first_name,
    //             lastName: updatedData.last_name,
    //             email: updatedData.email,
    //             userId: userId,
    //             isProfessional: "false"
    //         });
    //         setMessage("Perfil actualizado correctamente");
    //         queryClient.invalidateQueries({ queryKey: ["patient", userId] });
    //     },
    //     onError: (error: any) => {
    //         console.error("Error al actualizar:", error);
    //         setMessage(`Error al guardar: ${error.message || "Contacta a soporte"}`);
    //     }
    // });

    // 4. Effects
    // eslint-disable-next-line
    useEffect(() => {
        // Rellenar el formulario con los datos del backend cuando estén disponibles
        if (userId && patient && !isInitialized) {
            setFormData({
                first_name: patient.first_name || firstNameStore || "",
                last_name: patient.last_name || lastNameStore || "",
                email: patient.email || emailStore || "",
                phone: patient.phone || "",
                address: patient.address || ""
            });
            setIsInitialized(true);
        }
    }, [userId, patient, isInitialized, firstNameStore, lastNameStore, emailStore]);

    // 5. Handlers
    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        const cleanPhone = formData.phone.trim().replace(/\s/g, '');
        if (cleanPhone.length !== 12 || !cleanPhone.match(/^\+[0-9]+$/)) {
            setMessage("Por favor, ingrese un número de teléfono válido (ej: +56912345678)");
            return;
        }

        update(formData);
        setTimeout(() => setMessage(""), 5000);
    };

    return (
        <div className="min-h-svh bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
            <ProSidebarPatient active="/profile" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden h-svh">
                <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-cyan-50/80 to-transparent -z-10"></div>

                <header className="px-8 py-8 animate-fade-in shrink-0">
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mi Perfil</h1>
                    <p className="text-slate-500 font-medium">Gestiona tu información personal y preferencias.</p>
                </header>

                <div className="px-8 pb-12 flex-1 overflow-y-auto scroll-touch">
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
                                <h2 className="text-2xl font-bold text-slate-800">{firstNameStore} {lastNameStore}</h2>
                                <p className="text-slate-500 font-medium text-sm mb-6">Paciente Miembro</p>

                                <div className="space-y-3 pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                        <Mail className="w-4 h-4 text-teal-500" />
                                        {emailStore}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                        <Shield className="w-4 h-4 text-emerald-500" />
                                        Cuenta Verificada
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-10 border border-white shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-amber-500" /> Notificaciones
                                </h3>
                                <div className="space-y-4 text-sm font-medium text-slate-500">
                                    Las configuraciones para alertas de SMS y correo electrónico estarán disponibles pronto.
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

                                    <div className="pt-6 flex items-center justify-between sm:flex-row flex-col">
                                        <p className={`text-sm font-bold transition-all lg:w-1/2 w-full mb-4 sm:mb-0 ${message &&
                                            (message.toLowerCase().includes("error") ? 'text-red-500 opacity-100' : 'text-emerald-500 opacity-100')}`}>
                                            {message}
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={isPending}
                                            className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 text-white px-10 py-4 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-blue-200 active:scale-95 disabled:opacity-50"
                                        >
                                            <Save className="w-5 h-5" />
                                            {isPending ? "Guardando..." : "Guardar Cambios"}
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
