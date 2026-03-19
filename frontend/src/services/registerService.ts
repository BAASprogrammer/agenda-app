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
    // 1. Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email: data.email.trim(), 
        password: data.password 
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("No se pudo obtener el usuario autenticado.");

    // 2. Register in Backend API (Spring Boot)
    const response = await api.post("/users/register", {
        id: authData.user.id,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        password: data.password, // Added password here
        phone: data.phone.trim(),
        isProfessional: data.isProfessional,
    });


    if (response.data.error) {
        throw new Error(response.data.error);
    }

    // Return object compatible with setAuthCookies
    return {
        userId: authData.user.id,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        isProfessional: data.isProfessional.toString(),
    };
}