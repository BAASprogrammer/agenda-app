export interface PatientData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
}

export interface ProfileUpdatePayload {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    subSpecialtyId?: string;
    isProfessional?: boolean;
    first_name?: string;
    last_name?: string;
}

export interface ProfileUpdateResponse {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: unknown;
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