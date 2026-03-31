export interface Professional {
    id: string;
    first_name: string;
    last_name: string;
}

export interface SchedulePatient {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface ScheduleAppointment {
    id: string;
    patient_id: string;
    appointment_date: string;
    status: string;
    reason?: string;
}