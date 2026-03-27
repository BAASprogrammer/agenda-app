import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

// 1. Query specialties
export function useSpecialties() {
    return useQuery({
        queryKey: ['specialties'],
        queryFn: async () => {
            const response = await api.get('/specialties');
            return response.data;
        }
    });
}

// 2. Query subspecialties
export function useSubSpecialties(specialtyId: string) {
    return useQuery({
        queryKey: ['subspecialties', specialtyId],
        enabled: !!specialtyId,
        queryFn: async () => {
            const response = await api.get('/subspecialties', {
                params: {
                    specialtyId: specialtyId
                }
            });
            return response.data;
        }
    });
}

// 3. Query professionals
export function useProfessionals(subspecialtyId: string) {
    return useQuery({
        queryKey: ['professionals', subspecialtyId],
        queryFn: async () => {
            const response = await api.get('/users/professionals', {
                params: { subspecialtyId: subspecialtyId }
            });
            return response.data;
        },
        enabled: !!subspecialtyId
    });
}

// 4. Create appointment
export function useCreateAppointment(options?: any) {
    return useMutation({
        mutationFn: async (appointmentData: any) => {
            const response = await api.post('/appointments', appointmentData);
            return response.data;
        },
        ...options
    });
}

// 5. Update appointment status hook
export function useUpdateAppointmentStatus() {
    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const response = await api.put('/appointments', { id, status });
            return response.data;
        }
    });
}
