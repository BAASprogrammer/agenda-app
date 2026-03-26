import { api } from "@/lib/api";
import { supabase } from "@/lib/supabaseClient";

export interface RegisterData {
    firstName: string;
    lastName: string;
    isProfessional: boolean;
    phone: string
    email: string;
    password: string;
}

export async function registerUser(data: RegisterData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("No se pudo obtener el usuario autenticado.");

    if (!authData.session) {
        throw new Error("Debes confirmar tu correo antes de continuar.");
    }

    const token = authData.session.access_token;

    await api.post("/users/register", {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        isProfessional: data.isProfessional,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return {
        userId: authData.user.id,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        isProfessional: data.isProfessional.toString(),
    };
}