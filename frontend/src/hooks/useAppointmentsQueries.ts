import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

// Update appointment status hook
export function useUpdateAppointmentStatus() {
    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const response = await api.put('/appointments', { id, status });
            return response.data;
        }
    });
}

// Get appointments by patient hook
export function useAppointmentsByPatient(patientId: string, order: string = "ASC") {
    return useQuery({
        queryKey: ['appointments', patientId, order],
        enabled: !!patientId,
        queryFn: async () => {
            const response = await api.get('/appointments/appointmentsbyid', {
                params: {
                    patientId: patientId,
                    order: order
                }
            });
            return response.data;
        }
    });
}
// Cancel appointment hook
export function useCancelAppointment() {
    return useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            const response = await api.put('/appointments', { id, status: 'cancelada' });
            return response.data;
        }
    });
}
