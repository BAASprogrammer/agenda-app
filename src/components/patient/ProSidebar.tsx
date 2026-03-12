import { CalendarClock, NotepadText, LayoutDashboard, LogOut, CircleUser, HeartPulse } from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";

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
    const handleLogout = useLogout();

    return (
        <div>
            <aside className="w-full h-full md:w-64 bg-white border-r border-slate-100 flex flex-col z-20 animate-slide-in-left">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center shadow-md shadow-teal-200/60 hover:scale-105 transition-transform duration-300">
                        <LayoutDashboard className="text-white w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[15px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-teal-500 tracking-tight">
                        Menú Principal
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1" aria-label="Patient main navigation">
                    {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
                        const isActive = active === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${isActive
                                    ? "bg-teal-50 text-teal-700 shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
                                    }`}
                            >
                                <Icon
                                    className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-teal-600" : "text-slate-400"}`}
                                    aria-hidden="true"
                                />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-semibold text-sm transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" aria-hidden="true" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>
        </div>
    );
}
