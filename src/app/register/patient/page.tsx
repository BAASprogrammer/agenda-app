"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight, CalendarClock, ShieldCheck, Stethoscope } from "lucide-react";
import { LoginModal } from "@/components/login/LoginModal";
import { validateRegister } from "@/utils/validateRegister";

export default function PatientRegistration() {
    const router = useRouter();

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

        const error = validateRegister(formData);
        if (error) {
            setError(error);
            return;
        }

        setLoading(true);

        try {
            // 1. Sign up with Supabase Auth
            const emailTrimmed = formData.email.trim();
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: emailTrimmed,
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
                            first_name: formData.firstName.trim(),
                            last_name: formData.lastName.trim(),
                            email: emailTrimmed,
                            phone: formData.phone.trim(),
                            is_professional: false
                        }
                    ]);

                if (dbError) throw dbError;

                // 3. Set cookies just like LoginModal to establish session
                document.cookie = `first_name=${encodeURIComponent(formData.firstName.trim())}; path=/;`;
                document.cookie = `last_name=${encodeURIComponent(formData.lastName.trim())}; path=/;`;
                document.cookie = `email=${encodeURIComponent(emailTrimmed)}; path=/;`;
                document.cookie = `user_id=${authData.user.id}; path=/;`;
                document.cookie = `is_professional=false; path=/;`;

                // 4. Redirect
                router.replace("/home/patient");
                router.refresh();
            }
        } catch (err: any) {
            console.error("Error en registro:", err);
            setError(err.message || "Ocurrió un error al crear la cuenta. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
            {/* Left Column - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12 lg:py-0 relative z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-50/50 to-white/50 -z-10"></div>

                <div className="max-w-md w-full mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-600 font-bold mb-8 hover:text-teal-700 transition-colors group">
                        <Stethoscope className="w-6 h-6 text-teal-500 group-hover:scale-110 transition-transform" />
                        AgendaApp
                    </Link>

                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Únete como Paciente</h1>
                    <p className="text-slate-500 font-medium mb-8">Crea tu cuenta gratis y gestiona tu salud de manera simple y segura.</p>

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
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="Ej. Juan"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Apellidos</label>
                                <input
                                    type="text" name="lastName" required
                                    value={formData.lastName} onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="Ej. Pérez"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Correo electrónico</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email" name="email" required
                                    value={formData.email} onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    placeholder="tu@correo.com"
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
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 font-medium"
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
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 font-medium"
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
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 font-medium"
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
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-70 mt-6"
                        >
                            {loading ? "Creando cuenta..." : "Comenzar Gratis"}
                            {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-sm font-medium mt-8">
                        ¿Ya tienes cuenta? <button onClick={() => {
                            setShowLoginModal(true);
                        }} className="text-teal-600 font-bold hover:underline">Inicia Sesión</button>
                    </p>
                </div>
            </div>

            {/* Right Column - Presentation */}
            <div className="hidden lg:flex w-1/2 bg-teal-600 flex-col items-center justify-center relative overflow-hidden px-12 rounded-tl-[50%] rounded-bl-[50%] transition-all ease-in-out duration-300 hover:rounded-tl-[30%] hover:rounded-bl-[30%]">
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10 max-w-lg text-white">
                    <h2 className="text-5xl font-extrabold mb-6 leading-tight">Tu salud en un solo lugar.</h2>
                    <p className="text-teal-100 text-lg mb-12 font-medium leading-relaxed">Únete a miles de pacientes que ya agendan sus citas médicas de forma rápida, segura y sin esperas telefónicas.</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-teal-700/30 backdrop-blur-md p-4 rounded-2xl border border-teal-500/30">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <CalendarClock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Agendamiento 24/7</h4>
                                <p className="text-teal-100/80 text-sm">Reserva tu hora médica cuando quieras, desde donde estés.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-teal-700/30 backdrop-blur-md p-4 rounded-2xl border border-teal-500/30">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Datos Protegidos</h4>
                                <p className="text-teal-100/80 text-sm">Tu historial médico está cifrado y seguro bajo nuestra plataforma.</p>
                            </div>
                        </div>
                    </div>
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
