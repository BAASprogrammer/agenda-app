"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight, Activity, CalendarClock, ShieldCheck, Stethoscope } from "lucide-react";
import { useUser } from "@/context/UserContext";

import { LoginModal } from "@/components/login/LoginModal";

export default function ProfessionalRegistration() {
    const router = useRouter();
    const user = useUser();

    const [showLoginModal, setShowLoginModal] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setLoading(true);

        try {
            // 1. Sign up with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            // 2. Insert into public.users table manually
            if (authData.user) {
                const { error: dbError } = await supabase
                    .from('users')
                    .insert([
                        {
                            id: authData.user.id,
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            is_professional: true // Mark as professional
                        }
                    ]);

                if (dbError) throw dbError;

                // 3. Set cookies just like LoginModal to establish session
                document.cookie = `first_name=${encodeURIComponent(formData.firstName)}; path=/;`;
                document.cookie = `last_name=${encodeURIComponent(formData.lastName)}; path=/;`;
                document.cookie = `email=${encodeURIComponent(formData.email)}; path=/;`;
                document.cookie = `user_id=${authData.user.id}; path=/;`;
                document.cookie = `is_professional=true; path=/;`; // IMPORTANT: true here

                // 4. Redirect
                router.replace("/home/professional");
                router.refresh();
            }
        } catch (err: any) {
            console.error("Error en registro prof:", err);
            setError(err.message || "Ocurrió un error al crear la cuenta. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
            {/* Left Column - Presentation (Flipped for Profs) */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 flex-col items-center justify-center relative overflow-hidden px-12 rounded-tr-[50%] rounded-br-[50%]">
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10 max-w-lg text-white">
                    <h2 className="text-5xl font-extrabold mb-6 leading-tight">Bienvenido(a) como Profesional.</h2>
                    <p className="text-blue-100 text-lg mb-12 font-medium leading-relaxed">Únete a la red de profesionales de la salud. Reduce inasistencias, gestiona tu agenda fácilmente y brinda una mejor experiencia a tus pacientes.</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-blue-700/30 backdrop-blur-md p-4 rounded-2xl border border-blue-500/30">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Perfil Profesional</h4>
                                <p className="text-blue-100/80 text-sm">Destaca tu experiencia y aumenta tu visibilidad online.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-blue-700/30 backdrop-blur-md p-4 rounded-2xl border border-blue-500/30">
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
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-50/50 to-white/50 -z-10"></div>

                <div className="max-w-md w-full mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold mb-8 hover:text-blue-700 transition-colors group">
                        <Stethoscope className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                        AgendaApp Pro
                    </Link>

                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Únete como Profesional</h1>
                    <p className="text-slate-500 font-medium mb-8">Moderniza tu clínica hoy mismo. El registro toma menos de 1 minuto.</p>

                    <form onSubmit={handleRegister} className="space-y-5">
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
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="contacto@clinicamaria.cl"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Teléfono (opcional)</label>
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
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-70 mt-6"
                        >
                            {loading ? "Creando cuenta..." : "Comenzar Gratis"}
                            {!loading && <ArrowRight className="w-5 h-5" />}
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
            {showLoginModal && (
                <LoginModal
                    setIsLoggedIn={() => { window.location.reload(); }}
                    open={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            )}
        </div>
    );
}
