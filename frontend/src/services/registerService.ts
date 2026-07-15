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
            isProfessional: data.isProfessional,
        };
    } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as {
                response?: {
                    status?: number;
                    data?: { message?: string; error?: string };
                };
            };
            if (axiosError.response) {
                console.error("Status error servidor:", axiosError.response.status);
                console.error("Respuesta error servidor:", axiosError.response.data);
                const serverMessage = axiosError.response.data?.message || axiosError.response.data?.error || "Error en el servidor";
                throw new Error(serverMessage);
            }
        }

        if (error && typeof error === "object" && "request" in error) {
            console.error("No se recibió respuesta del servidor:", error);
            throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
        }

        if (error instanceof Error) {
            throw new Error(error.message || "Error inesperado");
        }

        throw new Error("Error inesperado");
    }


}