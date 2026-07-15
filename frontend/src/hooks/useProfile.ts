import { useMutation, useQuery, type UseMutationOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ProfileUpdatePayload, ProfileUpdateResponse } from "@/types/patient";

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
    options?: Omit<UseMutationOptions<ProfileUpdateResponse, Error, ProfileUpdatePayload>, "mutationFn">
) {
    return useMutation({
        mutationFn: async (updatedData: ProfileUpdatePayload) => {
            try {
                const { data } = await api.put<ProfileUpdateResponse>('/users/profile', updatedData, {
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