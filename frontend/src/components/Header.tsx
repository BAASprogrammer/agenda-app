// Header component: Displays navigation bar and user session info. Handles login modal and logout logic.
"use client";

import { clearAuthCookies } from "@/app/actions";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoginModal } from "./login/LoginModal";
import { LogOut, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { HeaderProps } from "@/types/auth";

export default function Header({ firstName, isLoggedIn, isProfessional }: HeaderProps) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const redirection =
        isProfessional === "true"
            ? "/home/professional"
            : isProfessional === "false"
                ? "/home/patient"
                : "/";

    const handleLogin = () => setShowLoginModal(true);

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await supabase.auth.signOut();
        await clearAuthCookies();
        window.location.replace("/");
    };

    const navLinkClass = (href: string) =>
        `px-4 py-2 rounded-xl transition-all duration-200 font-semibold text-sm ${pathname === href
            ? "bg-blue-50 text-blue-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
        }`;

    return (
        <header className="sticky top-0 z-80">
            <nav className="bg-white/85 backdrop-blur-xl shadow-sm border-b border-slate-100 transition-all duration-300">
                <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">

                    {/* Logo */}
                    <Link
                        href={redirection}
                        className="flex items-center gap-2.5 hover:scale-[1.02] transition-transform duration-300"
                    >
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-md shadow-blue-200/60">
                            <Stethoscope className="text-white w-5 h-5" aria-hidden="true" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-blue-500">
                            AgendaApp
                        </span>
                    </Link>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center gap-1">
                        {isLoggedIn && isProfessional === "true" ? (
                            <Link href="/home/professional" className={navLinkClass("/home/professional")}>Inicio</Link>
                        ) : (
                            <Link href={isLoggedIn ? "/home/patient" : "/"} className={navLinkClass(isLoggedIn ? "/home/patient" : "/")}>Inicio</Link>
                        )}
                        <Link href="/about" className={navLinkClass("/about")}>Acerca de</Link>
                        <Link href="/contact" className={navLinkClass("/contact")}>Contacto</Link>
                    </div>

                    {/* User actions */}
                    <div className="flex items-center gap-3">
                        {isLoggedIn && firstName ? (
                            <div className="flex items-center gap-3">
                                <span className="hidden sm:inline-flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-bold shadow-sm border border-slate-100 text-sm">
                                    <User className="w-4 h-4 text-blue-500" /> Hola, {firstName}
                                </span>
                                <Link
                                    href="#"
                                    onClick={handleLogout}
                                    className="flex items-center justify-center p-2 bg-white text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-bold transition-all duration-200 text-sm border border-slate-200"
                                    title="Cerrar Sesión"
                                >
                                    <LogOut className="w-4 h-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Salir</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="#"
                                    onClick={handleLogin}
                                    className="bg-linear-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm"
                                >
                                    Iniciar Sesión
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {showLoginModal && (
                <LoginModal
                    setIsLoggedIn={() => { window.location.reload(); }}
                    open={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            )}
        </header>
    );
}