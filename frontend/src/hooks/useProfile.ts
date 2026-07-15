import { useMutation, useQuery, type UseMutationOptions } from "@tanstack/react-query";
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

export function useUpdateProfile(
    userId: string,
    options?: Omit<UseMutationOptions<Record<string, unknown>, Error, Record<string, unknown>>, "mutationFn">
) {
    return useMutation({
        mutationFn: async (updatedData: Record<string, unknown>) => {
            try {
                const { data } = await api.put('/users/profile', updatedData, {
                    params: { userId }
                });
                return data;
            } catch (error: unknown) {
                const message = error instanceof Error
                    ? error.message
                    : "Error al actualizar perfil";
                throw new Error(message);
            }
        },
        ...options
    });
}