"use client";
import { useState } from "react";
import { setAuthCookies } from "@/app/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight, Activity, Stethoscope } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoginModal } from "@/components/login/LoginModal";
import { validateRegister } from "@/utils/validateRegister";
import { ProfessionalFormData } from "@/types/professional-form-data";
import { registerUser, checkEmailExists } from "@/services/registerService";
import { useSpecialties, useSubSpecialties } from "@/hooks/useMedicalQueries";
import { MedicalSpecialty } from "@/types/medical";

export default function ProfessionalRegistration() {
    // 1. Hooks & Routers
    const router = useRouter();
    const queryClient = useQueryClient(); // Added if needed, but not strictly necessary here

    // 2. State
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProfessionalFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        professionalKey: "",
        licenseNumber: "",
        specialtyId: "",
        subspecialtyId: ""
    });

    // 3. Queries & Mutations
    const { data: specialties = [] } = useSpecialties();

    // Convert empty string to null to avoid fetching if not set
    const { data: subspecialties = [] } = useSubSpecialties(formData.specialtyId);

    const { mutate: register, isPending } = useMutation({
        mutationFn: (data: ProfessionalFormData) => registerUser({
            ...data,
            isProfessional: true,
            subspecialtyId: data.subspecialtyId // Ensures this reaches the service
        }),
        onSuccess: async (userData: any) => {
            // Persist session in cookies and storage
            await setAuthCookies(userData);
            // Full redirect to ensure fresh balance of context
            window.location.replace("/home/professional");
        },
        onError: (err: any) => {
            console.error("Error en registro:", err);
            setError(err.message || "Ocurrió un error al crear la cuenta. Intenta nuevamente.");
        }
    });

    // 4. Handlers
    const handleEmailBlur = async () => {
        if (formData.email && formData.email.includes("@")) {
            try {
                const exists = await checkEmailExists(formData.email);
                if (exists) {
                    setError("Este correo ya se encuentra registrado. Intenta iniciar sesión.");
                } else if (error === "Este correo ya se encuentra registrado. Intenta iniciar sesión.") {
                    setError(null);
                }
            } catch (err) {
                console.error("Error al verificar email:", err);
            }
        }
    };

    const handleSpecialtyChange = async (specialtyId: string) => {
        setFormData(prev => ({ ...prev, specialtyId, subspecialtyId: "" }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const validationError = validateRegister(formData, true);
        if (validationError) {
            setError(validationError);
            return;
        }
        register(formData);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 overflow-hidden animate-register-enter">
            {/* Left Column - Presentation (Flipped for Profs) */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 flex-col items-center justify-center relative overflow-hidden px-12 rounded-tr-[50%] rounded-br-[50%] transition-all ease-in-out duration-300 animate-round-reveal-right">
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10 max-w-lg text-white">
                    <h2 className="text-5xl font-extrabold mb-6 leading-tight">Bienvenido(a) como Profesional.</h2>
                    <p className="text-blue-100 text-lg mb-12 font-medium leading-relaxed">Únete a la red de profesionales de la salud. Reduce inasistencias, gestiona tu agenda fácilmente y brinda una mejor experiencia a tus pacientes.</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-blue-700/30 backdrop-blur-md p-4 rounded-2xl border border-blue-500/30 hover:scale-110 transition-all duration-300">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Perfil Profesional</h4>
                                <p className="text-blue-100/80 text-sm">Destaca tu experiencia y aumenta tu visibilidad online.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-blue-700/30 backdrop-blur-md p-4 rounded-2xl border border-blue-500/30 hover:scale-110 transition-all duration-300">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Gestión Centralizada</h4>
                                <p className="text-blue-100/80 text-sm">Controla tu agenda y el historial de tus pacientes en un solo lugar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12 lg:py-0 relative z-10">
                <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-blue-50/50 to-white/50 -z-10"></div>

                <div className="max-w-md w-full mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold mb-8 hover:text-blue-700 transition-colors group">
                        <Stethoscope className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                        AgendaApp
                    </Link>

                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Únete como Profesional</h1>
                    <p className="text-slate-500 font-medium mb-8">Moderniza tu clínica hoy mismo. El registro toma menos de 1 minuto.</p>

                    <form onSubmit={handleRegister} className="space-y-5" noValidate>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nombre</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text" name="firstName" required
                                        value={formData.firstName} onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="Ej. María"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Apellidos</label>
                                <input
                                    type="text" name="lastName" required
                                    value={formData.lastName} onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="Ej. González"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Correo electrónico profesional</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email" name="email" required
                                    value={formData.email} onChange={handleChange}
                                    onBlur={handleEmailBlur}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="contacto@clinicamaria.cl"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Teléfono</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <input
                                    type="tel" name="phone"
                                    value={formData.phone} onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="+56 9 1234 5678"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Especialidad</label>
                                <select
                                    name="specialtyId"
                                    value={formData.specialtyId}
                                    onChange={(e) => handleSpecialtyChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                                >
                                    <option value="">Seleccionar...</option>
                                    {specialties.map((s: MedicalSpecialty) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Subespecialidad</label>
                                <select
                                    name="subspecialtyId"
                                    value={formData.subspecialtyId}
                                    onChange={(e) => setFormData({ ...formData, subspecialtyId: e.target.value })}
                                    disabled={!formData.specialtyId}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium disabled:opacity-50"
                                >
                                    <option value="">Seleccionar...</option>
                                    {subspecialties.map((s: MedicalSpecialty) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">N° Registro SIS</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text" name="licenseNumber" required
                                        value={formData.licenseNumber} onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="Ej. 123456"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Clave Acceso</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text" name="professionalKey" required
                                        value={formData.professionalKey} onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="Secret Key"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Contraseña</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password" name="password" required minLength={6}
                                        value={formData.password} onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirmar</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password" name="confirmPassword" required minLength={6}
                                        value={formData.confirmPassword} onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-rose-50 text-rose-500 text-sm font-bold rounded-xl animate-fade-in text-center border border-rose-100">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-70 mt-6"
                        >
                            {isPending ? "Creando cuenta..." : "Comenzar Gratis"}
                            {!isPending && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-sm font-medium mt-8">
                        ¿Ya tienes cuenta? <button onClick={() => {
                            setShowLoginModal(true);
                        }} className="text-blue-600 font-bold hover:underline">Inicia Sesión</button>
                    </p>
                </div>
            </div>

            {/* Modal de Inicio de Sesión local para esta página */}
            {
                showLoginModal && (
                    <LoginModal
                        setIsLoggedIn={() => { window.location.reload(); }}
                        open={showLoginModal}
                        onClose={() => setShowLoginModal(false)}
                    />
                )
            }
        </div >
    );
}
