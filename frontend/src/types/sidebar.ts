import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface NavItem {
    href: string;
    icon: LucideIcon;
    label: string;
}

export interface SidebarProps {
    navItems: readonly NavItem[];
    active: string;
    header: ReactNode;
    buttonColor: string;
    activeBgColor: string;
    activeTextColor: string;
    hoverTextColor: string;
    iconActiveColor: string;
    ariaLabel: string;
}

export type ProfessionalSidebarActivePath =
    | "/home/professional"
    | "/schedule"
    | "/manageappointments"
    | "/mypatients"
    | "/settings";

export type PatientSidebarActivePath =
    | "/home/patient"
    | "/medicalhistory"
    | "/myappointments"
    | "/profile";

export interface ProSidebarProps {
    active: ProfessionalSidebarActivePath;
}

export interface ProSidebarPatientProps {
    active: PatientSidebarActivePath;
}
