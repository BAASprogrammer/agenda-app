import axios, { InternalAxiosRequestConfig } from "axios";
import { supabase } from "./supabaseClient";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add Bearer token to requests (only if not already set)
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    // Si ya hay un Authorization header explícito, no lo sobreescribimos
    if (config.headers.Authorization) {
        return config;
    }
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }
    } catch (error) {
        console.error("Error al obtener sesión de Supabase:", error);
    }
    return config;
});