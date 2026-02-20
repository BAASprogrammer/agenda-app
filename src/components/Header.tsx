// Header component: Displays navigation bar and user session info. Handles login modal and logout logic.
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginModal } from "./login/LoginModal";

interface HeaderProps {
    firstName: string;
    isLoggedIn: boolean;
}

export default function Header({ isLoggedIn, firstName }: HeaderProps) {
    // State to control the visibility of the login modal
    const [showLoginModal, setShowLoginModal] = useState(false);
    const router = useRouter();

    // Open the login modal
    const handleLogin = () => {
        setShowLoginModal(true);
    };

    // Handle user logout: sign out from Supabase, clear cookie, refresh UI
    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await supabase.auth.signOut();
        // Delete the cookie on the client side
        document.cookie = "first_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.refresh();
    };

    return (
        <header>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-white text-lg font-bold">AgendaApp</a>
                    <div>
                        <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded">Inicio</a>
                        <a href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded">Acerca de</a>
                        <a href="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded">Contacto</a>
                    </div>
                    <div>
                        {isLoggedIn && firstName ? (
                            <div>
                                <span className="text-gray-300 px-3 py-2">Hola, {firstName}</span>
                                <a href="#" className="text-gray-300  px-3 py-2 border border-amber-50 rounded-3xl hover:bg-amber-50 hover:text-gray-800" onClick={handleLogout}>Logout</a>
                            </div>
                        ) : (
                            <a href="#" className="text-gray-300  px-3 py-2 border border-amber-50 rounded-3xl hover:bg-amber-50 hover:text-gray-800" onClick={handleLogin}>Login</a>
                        )}
                    </div>
                </div>
            </nav>
            {/* Here you can render the login modal if needed. The setIsLoggedIn callback reloads the page to update the session info from cookies. */}
            {showLoginModal && <LoginModal setIsLoggedIn={() => { window.location.reload(); }} open={showLoginModal} onClose={() => setShowLoginModal(false)} />}
        </header>
    );
}