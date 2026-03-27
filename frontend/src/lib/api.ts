import axios, { InternalAxiosRequestConfig } from "axios";
import { supabase } from "./supabaseClient";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to inject Supabase Bearer token in API requests
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    // If request already has an explicit token (e.g. login), don't touch it
    if (config.headers.Authorization) {
        return config;
    }

    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }
    } catch (e) {
        console.error("Error in Supabase session interceptor:", e);
    }
    
    return config;
});