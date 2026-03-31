import { BarChart2, Calendar, ClipboardList, Users, Settings, LayoutDashboard } from "lucide-react";
import Sidebar from "@/components/shared/Sidebar";

interface ProSidebarProps {
    active: "/home/professional" | "/schedule" | "/manageappointments" | "/mypatients" | "/settings";
}

const NAV_ITEMS = [
    { href: "/home/professional", icon: BarChart2, label: "Dashboard" },
    { href: "/schedule", icon: Calendar, label: "Ver Agenda" },
    { href: "/manageappointments", icon: ClipboardList, label: "Gestionar Citas" },
    { href: "/mypatients", icon: Users, label: "Mis Pacientes" },
    { href: "/settings", icon: Settings, label: "Configuración" },
] as const;

export default function ProSidebar({ active }: ProSidebarProps) {
    return (
        <Sidebar
            navItems={NAV_ITEMS}
            active={active}
            header={
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md shadow-blue-200/60 hover:scale-105 transition-transform duration-300">
                        <LayoutDashboard className="text-white w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[15px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">
                        Menú Profesional
                    </span>
                </div>
            }
            buttonColor="bg-blue-500"
            activeBgColor="bg-blue-50"
            activeTextColor="text-blue-700"
            hoverTextColor="text-blue-700"
            iconActiveColor="text-blue-600"
            ariaLabel="Professional main navigation"
        />
    );
}
