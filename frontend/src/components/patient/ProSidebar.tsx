import { CalendarClock, NotepadText, CircleUser, HeartPulse } from "lucide-react";
import Sidebar from "@/components/shared/Sidebar";

interface ProSidebarPatientProps {
    active: "/home/patient" | "/medicalhistory" | "/myappointments" | "/profile";
}

const NAV_ITEMS = [
    { href: "/home/patient", icon: HeartPulse, label: "Mi Resumen" },
    { href: "/myappointments", icon: CalendarClock, label: "Mis Citas" },
    { href: "/medicalhistory", icon: NotepadText, label: "Historial Médico" },
    { href: "/profile", icon: CircleUser, label: "Mi Perfil" },
] as const;

export default function ProSidebarPatient({ active }: ProSidebarPatientProps) {
    return (
        <Sidebar
            navItems={NAV_ITEMS}
            active={active}
            header={
                <span className="text-[15px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-teal-500 tracking-tight">
                    Menú Principal
                </span>
            }
            buttonColor="bg-teal-500"
            activeBgColor="bg-teal-50"
            activeTextColor="text-teal-700"
            hoverTextColor="text-teal-700"
            iconActiveColor="text-teal-600"
            ariaLabel="Patient main navigation"
        />
    );
}
