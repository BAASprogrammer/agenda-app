export interface PatientData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
}

export interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
}

export interface ProfessionalPatientSummary {
    id: string;
    first_name: string;
    last_name: string;
    total: number;
    lastDate: string;
    nextDate: string | null;
}