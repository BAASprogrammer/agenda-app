import type { LucideIcon } from "lucide-react";

export interface Specialty {
    name: string;
    desc: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    bghover: string;
    colorhover: string;
    popular?: boolean;
}

export interface SpecialtyOption {
    id: string;
    name: string;
}

export interface SubSpecialtyOption {
    id: string;
    name: string;
    specialty_id: string;
}