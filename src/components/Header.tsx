// Header component: Displays navigation bar and user session info. Handles login modal and logout logic.
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LoginModal } from "./login/LoginModal";
import { Activity, LogOut, User } from "lucide-react";

interface HeaderProps {
    firstName: string;
    userId: string;
    isLoggedIn: boolean;
}

export default function Header({ firstName, userId, isLoggedIn }: HeaderProps) {
    // State to control the visibility of the login modal
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isProfessional, setIsProfessional] = useState<boolean | null>(null);
    const pathname = usePathname();

    // Fetch is_professional from users table if logged in and userId is provided
    // Only runs once on mount or when userId changes
    useEffect(() => {
        const fetchUserRole = async () => {
            if (isLoggedIn && userId) {
                const { data, error } = await supabase
                    .from('users')
                    .select('is_professional')
                    .eq('id', userId)
                    .single();
                if (!error && data) {
                    setIsProfessional(!!data.is_professional);
                } else {
                    setIsProfessional(null);
                }
            } else {
                setIsProfessional(null);
            }
        };
        fetchUserRole();
    }, [isLoggedIn, userId]);

    // Open the login modal
    const handleLogin = () => {
        setShowLoginModal(true);
    };

    // Handle user logout: sign out from Supabase, clear cookie, refresh UI
    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await supabase.auth.signOut();
        // Delete the cookie on the client side
        document.cookie = "first_name=; expires=Sat, 01 Jan 2000 00:00:00 UTC; path=/;";
        document.cookie = "user_id=; expires=Sat, 01 Jan 2000 00:00:00 UTC; path=/;";
        window.location.reload();
    };

    return (
        <header className="sticky top-0 z-50">
            <nav className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white transition-all duration-300">
                <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 text-slate-800 text-2xl font-extrabold tracking-tight hover:scale-105 transition-transform duration-300">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md">
                            <Activity className="text-white w-6 h-6 animate-pulse-slow" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
                            AgendaApp
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-2">
                        {/* Mostrar navegación según el rol */}
                        {isLoggedIn && isProfessional === true ? (
                            <a
                                href="/homeprofessional"
                                className={`px-4 py-2 rounded-xl transition-all font-semibold text-sm ${pathname === "/homeprofessional" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"}`}
                            >Inicio</a>
                        ) : isLoggedIn && isProfessional === false ? (
                            <a
                                href="/homepatiente"
                                className={`px-4 py-2 rounded-xl transition-all font-semibold text-sm ${pathname === "/homepatiente" ? "bg-cyan-50 text-cyan-600" : "text-slate-600 hover:bg-slate-50 hover:text-cyan-600"}`}
                            >Inicio</a>
                        ) : (
                            <a
                                href="/"
                                className={`px-4 py-2 rounded-xl transition-all font-semibold text-sm ${pathname === "/" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"}`}
                            >Inicio</a>
                        )}
                        <a
                            href="/about"
                            className={`px-4 py-2 rounded-xl transition-all font-semibold text-sm ${pathname === "/about" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"}`}
                        >Acerca de</a>
                        <a
                            href="/contact"
                            className={`px-4 py-2 rounded-xl transition-all font-semibold text-sm ${pathname === "/contact" ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"}`}
                        >Contacto</a>
                    </div>

                    <div className="flex items-center gap-3">
                        {isLoggedIn && firstName ? (
                            <div className="flex items-center gap-3">
                                <span className="hidden sm:inline-flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-bold shadow-sm border border-slate-100 text-sm">
                                    <User className="w-4 h-4 text-indigo-500" /> Hola, {firstName}
                                </span>
                                <a
                                    href="#"
                                    onClick={handleLogout}
                                    className="flex items-center justify-center p-2 sm:px-4 sm:py-2 bg-white text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-bold transition-colors text-sm border border-slate-200"
                                    title="Cerrar Sesión"
                                >
                                    <LogOut className="w-4 h-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Salir</span>
                                </a>
                            </div>
                        ) : (
                            <a
                                href="#"
                                onClick={handleLogin}
                                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
                            >
                                Iniciar Sesión
                            </a>
                        )}
                    </div>
                </div>
            </nav>
            {/* Aquí se renderiza el modal de login si es necesario. */}
            {showLoginModal && <LoginModal setIsLoggedIn={() => { window.location.reload(); }} open={showLoginModal} onClose={() => setShowLoginModal(false)} />}
        </header>
    );
}