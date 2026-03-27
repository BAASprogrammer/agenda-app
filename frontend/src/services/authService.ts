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
    if (!user) throw new Error("No se pudo obtener el usuario autenticado.");

    // Try to fetch profile from backend with fresh token
    try {
        const { data: userData } = await api.get(`/users/me`, {
            headers: { Authorization: `Bearer ${sessionData.session?.access_token}` }
        });
        
        return {
            firstName: userData.first_name || userData.firstName || user.user_metadata?.first_name || "",
            lastName: userData.last_name || userData.lastName || user.user_metadata?.last_name || "",
            email: userData.email || user.email || "",
            isProfessional: (userData.is_professional ?? userData.isProfessional)?.toString() || user.user_metadata?.is_professional?.toString() || "false",
            userId: user.id,
        };
    } catch (apiError) {
        console.warn("Backend profile fetch failed, falling back to Supabase metadata:", apiError);
        // Fallback to Supabase data if backend is unreachable
        return {
            firstName: user.user_metadata?.first_name || "",
            lastName: user.user_metadata?.last_name || "",
            email: user.email || "",
            isProfessional: user.user_metadata?.is_professional?.toString() || "false",
            userId: user.id,
        };
    }
}

export async function resetPasswordRequest(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
}
