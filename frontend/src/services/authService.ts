import { api } from "@/lib/api";
import { supabase } from "@/lib/supabaseClient";
import { UserData } from "@/types/user-data";

export async function loginUser(email: string, password: string): Promise<UserData> {
    const { error: authError, data: sessionData } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (authError) throw new Error("Email o contraseña incorrectos.");
    const user = sessionData?.session?.user;
    console.log(sessionData.session?.access_token);

    if (!user) throw new Error("No se pudo obtener el usuario autenticado.");

    // Pasamos el token directamente para evitar timing issues con el interceptor
    const accessToken = sessionData.session?.access_token;
    const { data: userData } = await api.get(`/users/me`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    
    if (!userData) {
        throw new Error("No se pudo obtener la información del perfil del usuario.");
    }

    return {
        firstName: userData.first_name || userData.firstName || "",
        lastName: userData.last_name || userData.lastName || "",
        email: userData.email || "",
        isProfessional: (userData.is_professional ?? userData.isProfessional)?.toString() || "false",
        userId: user.id,
    };
}

export async function resetPasswordRequest(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
}
