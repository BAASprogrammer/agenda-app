export interface MedicalRecord {
    id: string;
    appointment_date: string;
    professional: {
        first_name: string;
        last_name: string;
    };
    reason?: string;
}

export interface MedicalSpecialty {
    id: string;
    name: string;
}