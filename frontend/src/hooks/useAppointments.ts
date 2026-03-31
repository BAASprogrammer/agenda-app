// ===================================================================
// Custom Hook: useAppointments
// ===================================================================
// Rule: all hooks MUST start with "use" (React convention).
//
// What this file does:
//   → Contains ALL data logic for the professional's appointments.
//   → The page component calls it and only receives what it needs.
//   → If the data source changes (e.g. Supabase → REST API),
//     only THIS file needs to change, not the page.
// ===================================================================

import { useUserStore } from "@/store/userStore";
import { api } from "@/lib/api";
import { useEffect, useState, useCallback } from "react";
import { ManagedAppointment } from "@/types/appointment";

// STEP 1: The hook receives parameters just like any regular function.
// 'filter' comes from the component because it's controlled by the user via the UI.
export function useAppointments(filter: string) {
    // STEP 2: State lives in the hook, not in the component.
    // When state changes, React automatically re-renders the component.
    const [appointments, setAppointments] = useState<ManagedAppointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // useUserStore() also works inside hooks (because it's a hook itself).
    const user = useUserStore();

    // STEP 3: useCallback prevents fetchAppointments from being re-created on every render.
    // Think of it as "memoizing" the function. It only re-creates if its dependencies change.
    // Without useCallback, it could cause infinite loops in the useEffect below.
    const fetchAppointments = useCallback(async () => {
        if (!user.userId) return;
        setLoading(true);
        setError(null);

        try {
            const { data } = await api.get('/appointments/professional/all');

            let filtered = data ?? [];
            if (filter !== "todas") {
                filtered = filtered.filter((a: any) => a.status === filter);
            }

            const formatted: ManagedAppointment[] = filtered.map((a: any) => {
                const parts = a.appointment_date.replace(" ", "T").split("T");
                const datePart = parts[0];
                const timePart = parts[1] ? parts[1].split(":") : ["00", "00"];
                const [yr, mo, dy] = datePart.split("-").map(Number);
                const d = new Date(yr, mo - 1, dy);
                return {
                    ...a,
                    patient: {
                        first_name: a.first_name,
                        last_name: a.last_name
                    },
                    displayDate: isNaN(d.getTime())
                        ? datePart
                        : d.toLocaleDateString("cl-CL", { day: "2-digit", month: "short", year: "numeric" }),
                    displayTime: `${timePart[0]}:${timePart[1]}`,
                };
            });

            setAppointments(formatted);
        } catch (error) {
            setError("No hay citas agendadas.");
        } finally {
            setLoading(false);
        }
    }, [user.userId, filter]); // ← Only re-created when userId or filter change

    // STEP 4: The hook calls fetchAppointments automatically when dependencies change.
    // The component doesn't need to know HOW the data is fetched.
    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    // STEP 5: This function mutates data and then refreshes the list.
    // It lives in the hook because it's data logic, not render logic.
    const updateStatus = async (id: string, newStatus: "completada" | "cancelada") => {
        try {
            await api.put('/appointments', { id, status: newStatus });
            // Refresh the list so the UI reflects the change immediately
            fetchAppointments();
        } catch (updateError) {
            setError("Could not update status. Please try again.");
        }
    };

    // STEP 6: The hook RETURNS only what the component needs.
    // The component never sees the fetch logic, supabase calls, or internal useState.
    // It only sees: the data, the loading/error states, and the available actions.
    return {
        appointments,  // ← Formatted data ready to render
        loading,       // ← Use to show a spinner or skeleton
        error,         // ← Use to show an error banner
        updateStatus,  // ← Mark appointment as completed or cancelled
        refresh: fetchAppointments, // ← In case the user wants to manually reload
    };
}
