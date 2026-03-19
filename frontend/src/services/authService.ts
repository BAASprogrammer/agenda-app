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
    const { data: userData } = await api.get(`/users/${user.id}`, {
        headers: {
            Authorization: `Bearer ${sessionData.session?.access_token}`,
        },
    });
    return {
        firstName: userData.first_name || "",
        lastName: userData.last_name || "",
        email: userData.email || "",
        isProfessional: userData.is_professional?.toString() || "false",
        userId: user.id,
    };
}
