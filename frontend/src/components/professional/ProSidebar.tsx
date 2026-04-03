import { BarChart2, Calendar, ClipboardList, Users, Settings, LayoutDashboard } from "lucide-react";
import Sidebar from "@/components/shared/Sidebar";
import { ProSidebarProps } from "@/types/sidebar";

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
                <div className="px-4 py-1.5 bg-blue-50/50 border border-blue-100/50 rounded-xl shadow-xs inline-flex backdrop-blur-sm self-start">
                    <span className="text-[14px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">
                        Menú Principal
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
