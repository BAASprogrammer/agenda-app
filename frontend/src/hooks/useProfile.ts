import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useProfile(userId: string) {
    return useQuery({
        queryKey: ["patient", userId],
        queryFn: async () => {
            const { data } = await api.get('/users/profile', { params: { userId } })
            return data;
        },
        enabled: !!userId
    });
}

export function useUpdateProfile(userId: string, options: any) {
    return useMutation({
        mutationFn: async (updatedData: any) => {
            try {
                const { data } = await api.put('/users/profile', updatedData, {
                    params: { userId }
                });
                return data;
            } catch (error: any) {
                throw new Error(
                    error.response?.data?.message || "Error al actualizar perfil"
                );
            }
        },
        ...options
    });
}