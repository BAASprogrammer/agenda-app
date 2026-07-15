export interface Professional {
    id: string;
    first_name: string;
    last_name: string;
}

export interface ProfessionalListItem {
    id: string;
    first_name: string;
    last_name: string;
    subspecialty_id?: string;
    subspecialty_name?: string;
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