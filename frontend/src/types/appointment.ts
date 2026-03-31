export interface AppointmentPatient {
    id: string;
    appointment_date: string;
    professional_first_name: string;
    professional_last_name: string;
    status: string;
    reason?: string;
}

export interface Appointment {
    id: string;
    patient_id: string;
    professional_id: string;
    appointment_date: string;
    status: string;
    reason?: string;
    created_at: string;
    updated_at: string;
}

export interface AppointmentData {
    id: string;
    appointment_date: string;
    professional_first_name: string;
    professional_last_name: string;
    status: string;
    reason?: string;
}

export interface FormattedAppointment extends AppointmentData {
    professional: {
        first_name: string;
        last_name: string;
    };
    displayMonth: string;
    displayDay: number;
    displayFullDate: string;
    displayTime: string;
    displayDate: string;
}

export type AppointmentStatus = "agendada" | "completada" | "cancelada";

export interface ManagedAppointmentPatient {
    first_name: string;
    last_name: string;
}

export interface ManagedAppointment {
    id: string;
    appointment_date: string;
    status: AppointmentStatus;
    reason: string | null;
    patient: ManagedAppointmentPatient | null;
    displayDate: string;
    displayTime: string;
}

export interface ProfessionalScheduleAppointment {
    id: string;
    appointment_date: string;
    status: AppointmentStatus;
    reason: string | null;
    patient: ManagedAppointmentPatient | null;
    displayTime: string;
}

export interface RescheduleAppointmentData {
    id: string;
    displayDate?: string;
    displayTime?: string;
}