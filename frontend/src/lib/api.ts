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

// Interceptor to recover from expired access tokens once.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const { data: { session } } = await supabase.auth.refreshSession();
            const refreshedToken = session?.access_token;

            if (!refreshedToken) {
                return Promise.reject(error);
            }

            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;

            return api(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
);