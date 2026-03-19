"use client";
import { setAuthCookies } from '@/app/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, ArrowRight, Activity, Stethoscope } from 'lucide-react';
import { loginUser } from '@/services/authService';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    setIsLoggedIn: (loggedIn: boolean) => void;
}

export function LoginModal({ open, onClose, setIsLoggedIn }: LoginModalProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // If modal is not open, render nothing
    if (!open) return null;

    // Close the modal
    const handleClose = () => {
        onClose();
    }

    // Handle login logic: authenticate with Supabase, fetch user's first name from 'users' table, set cookie, reload UI
    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);

        const emailTrimmed = email.trim();
        try {
            const userData = await loginUser(emailTrimmed, password);
            // Set the cookies using Next.js Server Action
            await setAuthCookies(userData);
            setIsLoggedIn(true);
            setError(null);
            onClose();

            // Redirect based on user role
            if (userData.isProfessional === "true") {
                router.push("/home/professional");
            } else if (userData.isProfessional === "false") {
                router.push("/home/patient");
            }
            router.refresh();
        } catch (error: any) {
            setError(error.message || "Error al iniciar sesión. Verifique sus credenciales.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/40 transition-opacity" onClick={handleClose}></div>

            {/* Modal Container */}
            <div className="relative bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-3xl w-full max-w-md p-8 sm:p-10 z-50 animate-scale-in">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all"
                    title="Cerrar"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-8 mt-2">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-5 shadow-inner">
                        <Stethoscope className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Iniciar Sesión</h2>
                    <p className="text-slate-500 font-medium text-[15px]">Accede a tu cuenta segura de AgendaApp.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Inputs */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">Correo electrónico</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@correo.com"
                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-[15px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="password" className="block text-sm font-bold text-slate-700">Contraseña</label>
                            <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">¿Olvidaste tu contraseña?</a>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-[15px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800"
                                required
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3.5 bg-rose-50 text-rose-600 text-sm font-bold rounded-xl animate-fade-in text-center border border-rose-100 flex items-center justify-center gap-2">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none mt-2"
                    >
                        {loading ? "Iniciando..." : "Ingresar a mi cuenta"}
                        {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm font-medium text-slate-500">
                    <p className="mb-3">¿No tienes una cuenta aún?</p>
                    <div className="flex items-center justify-center gap-3">
                        <button onClick={() => { onClose(); router.push('/register/patient'); }} className="text-teal-600 font-bold hover:text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-lg transition-colors">
                            Crear cuenta Paciente
                        </button>
                        <span className="text-slate-200">|</span>
                        <button onClick={() => { onClose(); router.push('/register/professional'); }} className="text-blue-600 font-bold hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                            Soy Profesional
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}