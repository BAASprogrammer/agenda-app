import { RescheduleAppointmentData } from "@/types/appointment";

export interface RescheduleModalProps {
    appointment: RescheduleAppointmentData;
    onClose: () => void;
    onSuccess: (newDate: string, newTime: string) => void;
}

export interface SpecialistsModalProps {
    specialtyName: string;
    onClose: () => void;
}

export interface DoctorProfileData {
    first_name?: string;
    last_name?: string;
}

export interface DoctorProfileModalProps {
    professional: DoctorProfileData | null;
    onClose: () => void;
}
