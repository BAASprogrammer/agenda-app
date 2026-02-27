import { CalendarDays, FileText, HeartPulse, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

interface ProSidebarPatientProps {
    active: "/homepatient" | "/medicalhistory" | "/myappointments" | "/profile";
}

const NAV_ITEMS = [
    { href: "/homepatient", icon: HeartPulse, label: "Mi Resumen" },
    { href: "/myappointments", icon: CalendarDays, label: "Mis Citas" },
    { href: "/medicalhistory", icon: FileText, label: "Historial Médico" },
    { href: "/profile", icon: UserCircle, label: "Mi Perfil" },
] as const;

export default function ProSidebarPatient({ active }: ProSidebarPatientProps) {
    const router = useRouter();
    const handleLogout = useLogout();
    return (
        <div>
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col z-20">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                        <HeartPulse className="text-white w-6 h-6 animate-pulse-slow" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                        AgendaApp
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
                        const isActive = active === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:scale-[1.02] ${isActive
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                                    }`}
                            >
                                <Icon className="w-5 h-5" aria-hidden="true" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl font-medium transition-all hover:scale-[1.02]"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>
        </div>
    )
}
