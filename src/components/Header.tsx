// Header component: Displays navigation bar and user session info. Handles login modal and logout logic.
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LoginModal } from "./login/LoginModal";

interface HeaderProps {
    firstName: string;
    userId: string;
    isLoggedIn: boolean;
}

export default function Header({ firstName, userId, isLoggedIn}: HeaderProps) {
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
            <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 shadow-2xl p-0 transition-all duration-300">
                <div className="container mx-auto flex items-center justify-between py-3 px-4">
                    {/* Logo con icono */}
                    <a href="/" className="flex items-center gap-2 text-white text-2xl font-extrabold tracking-tight drop-shadow-lg bg-gradient-to-r from-blue-800/60 to-blue-900/10 px-4 py-1 rounded-2xl hover:scale-105 transition-transform duration-200">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-500 shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </span>
                        AgendaApp
                    </a>
                    <div className="flex gap-1 md:gap-2">
                        {/* Mostrar navegación según el rol */}
                        {isLoggedIn && isProfessional === true ? (
                            <>
                                <a
                                    href="/homeprofessional"
                                    className={`px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm md:text-base font-bold shadow-lg ${pathname === "/homeprofessional" ? "bg-blue-200 text-blue-900 scale-105" : "text-white hover:bg-white/20"}`}
                                >Inicio</a>
                            </>
                        ) : isLoggedIn && isProfessional === false ? (
                            <>
                                <a
                                    href="/homepatiente"
                                    className={`px-4 py-2 rounded-full font-bold transition-all duration-200 text-sm md:text-base ${pathname === "/homepatiente" ? "bg-blue-200 text-blue-900 scale-105" : "text-white hover:bg-white/20"}`}
                                >Inicio</a>
                            </>
                        ) : (
                            <>
                                <a
                                    href="/"
                                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm md:text-base ${pathname === "/" ? "bg-blue-200 text-blue-900 scale-105" : "text-white hover:bg-white/20"}`}
                                >Inicio</a>
                            </>
                        )}
                        <a
                            href="/about"
                            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm md:text-base ${pathname === "/about" ? "bg-blue-200 text-blue-900 scale-105" : "text-white hover:bg-white/20"}`}
                        >Acerca de</a>
                        <a
                            href="/contact"
                            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm md:text-base ${pathname === "/contact" ? "bg-blue-200 text-blue-900 scale-105" : "text-white hover:bg-white/20"}`}
                        >Contacto</a>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        {isLoggedIn && firstName ? (
                            <div className="flex items-center gap-2">
                                <span className="bg-white/90 text-blue-700 px-4 py-2 rounded-full font-bold shadow-lg border border-blue-100 animate-fade-in">Hola, {firstName}</span>
                                <a href="#" className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:from-blue-500 hover:to-blue-800 transition-all duration-200 animate-fade-in" onClick={handleLogout}>Cerrar Sesión</a>
                            </div>
                        ) : (
                            <a href="#" className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:from-blue-400 hover:to-blue-800 hover:brightness-110 transition-all duration-200 animate-fade-in" onClick={handleLogin}>Iniciar Sesión</a>
                        )}
                    </div>
                </div>
            </nav>
            {/* Aquí se renderiza el modal de login si es necesario. */}
            {showLoginModal && <LoginModal setIsLoggedIn={() => { window.location.reload(); }} open={showLoginModal} onClose={() => setShowLoginModal(false)} />}
        </header>
    );
}