import { api } from "@/lib/api";
import { supabase } from "@/lib/supabaseClient";
import { RegisterData } from "@/types/auth";
//Check email exists
export async function checkEmailExists(email: string) {
    const response = await api.get(`/users/check-email?email=${encodeURIComponent(email.trim())}`);
    return response.data.exists;
}

export async function registerUser(data: RegisterData) {
    try {
        // 1. Check email exists
        const checkRes = await api.get(`/users/check-email?email=${encodeURIComponent(data.email.trim())}`);
        if (checkRes.data.exists) {
            throw new Error("Este correo ya se encuentra registrado. Intenta iniciar sesión.");
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email.trim(),
            password: data.password
        });
        if (authError) throw authError;
        if (!authData.user) throw new Error("No se pudo obtener el usuario autenticado.");

        if (!authData.session) {
            throw new Error("Debes confirmar tu correo antes de continuar.");
        }

        await api.post("/users/register", {
            first_name: data.firstName.trim(),
            last_name: data.lastName.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
            is_professional: data.isProfessional,
            subspecialty_id: data.subspecialtyId || null
        });

        return {
            userId: authData.user.id,
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: data.email.trim(),
            isProfessional: data.isProfessional.toString(),
        };
    } catch (error: any) {
        if (error.response) {
            console.error("Status error servidor:", error.response.status);
            console.error("Respuesta error servidor:", error.response.data);
            const serverMessage = error.response.data.message || error.response.data.error || "Error en el servidor";
            throw new Error(serverMessage);
        } else if (error.request) {
            console.error("No se recibió respuesta del servidor:", error.request);
            throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
        } else {
            throw new Error(error.message || "Error inesperado");
        }
    }


}