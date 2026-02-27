"use client";
// LoginModal component: Handles user authentication and sets the first_name cookie for session display.
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    setIsLoggedIn: (loggedIn: boolean) => void;
}
export function LoginModal({ open, onClose, setIsLoggedIn }: LoginModalProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    // If modal is not open, render nothing
    if (!open) return null;

    // Close the modal
    const handleClose = () => {
        onClose();
    }

    // Handle login logic: authenticate with Supabase, fetch user's first name from 'users' table, set cookie, reload UI
    const handleLogin = async () => {
        const email = (document.getElementById('email') as HTMLInputElement)?.value;
        const password = (document.getElementById('password') as HTMLInputElement)?.value;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError('Ingrese email y contraseña válidos.');
            return false;
        } else {
            // Get the authenticated user from Supabase session
            const user = (await supabase.auth.getSession()).data.session?.user;
            let firstName = "";
            let lastName = "";
            let email = "";
            let isProfessional = "false";
            if (user) {
                // Query the 'users' table to get the real first name
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('first_name, last_name, email, is_professional')
                    .eq('id', user.id)
                    .single();
                if (!userError && userData?.first_name) {
                    firstName = userData.first_name;
                    lastName = userData.last_name || "";
                    email = userData.email || "";
                    isProfessional = userData.is_professional?.toString() || "false";
                } else {
                    setError('first_name no encontrado en la tabla de usuarios.');
                    return false;
                }

            } else {
                setError('No se pudo obtener el usuario autenticado.');
                return false;
            }
            // Set the first_name and user_id cookies for the server layout to read (codificando tildes y caracteres especiales)
            document.cookie = `first_name=${encodeURIComponent(firstName)}; path=/;`;
            document.cookie = `last_name=${encodeURIComponent(lastName)}; path=/;`;
            document.cookie = `email=${encodeURIComponent(email)}; path=/;`;
            document.cookie = `user_id=${user.id}; path=/;`;
            document.cookie = `is_professional=${isProfessional}; path=/;`;

            // Call setIsLoggedIn and close the modal
            setIsLoggedIn(true);
            setError(null);
            onClose();

            // Redirigir basado en el rol del usuario recién autenticado
            if (isProfessional === "true") {
                router.replace("/homeprofessional");
            } else if (isProfessional === "false") {
                router.replace("/homepatiente");
            } else {
                router.replace("/");
            }

            router.refresh();
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-blue-200 via-white to-blue-100 z-40"></div>
            {/* Modal */}
            <div className="relative bg-white shadow-2xl rounded-3xl p-6 w-96 h-96 border border-blue-200 flex flex-col justify-center z-50">
                <div className="text-blue-500 absolute right-6 top-2 cursor-pointer text-xl font-bold hover:text-blue-700 transition-colors duration-200" onClick={handleClose} title="Cerrar">×</div>
                <div className="text-center text-3xl font-extrabold text-blue-700 mb-4 mt-2 tracking-tight">Iniciar Sesión</div>
                <div className="p-2">
                    <label htmlFor="email" className="text-blue-700 block font-semibold">Email</label>
                    <input type="text" id="email" name="email" placeholder='email@dominio.com' className="border-2 border-blue-300 focus:border-blue-500 rounded-lg w-full text-gray-800 px-3 py-1 mt-1 transition-colors duration-200 outline-none" />
                </div>
                <div className="p-2">
                    <label htmlFor="password" className="text-blue-700 block font-semibold">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder='******' className="border-2 border-blue-300 focus:border-blue-500 rounded-lg w-full text-gray-800 px-3 py-1 mt-1 transition-colors duration-200 outline-none" />
                </div>
                {error && <div className="text-red-500 text-center m-0 font-bold text-sm absolute left-1/5">{error}</div>}
                <div className="p-2 text-center mt-8">
                    <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-200 cursor-pointer" onClick={handleLogin} title='Iniciar Sesión'>Iniciar Sesión</button>
                </div>
            </div>
        </div>
    );
}