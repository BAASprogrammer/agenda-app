import { CalendarClock, NotepadText, LayoutDashboard, LogOut, CircleUser, HeartPulse, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="block md:hidden absolute top-20 right-5 z-61 w-8 h-8 bg-teal-500 rounded">
                <Menu className="w-6 h-6 m-auto mt-1 group-hover:scale-110 transition-transform cursor-pointer text-white" onClick={() => setOpen(!open)} />
            </div>
            <aside className={`absolute md:block right-4 md:right-0 top-28 md:top-0 h-1/2 w-1/2 md:static md:h-full md:w-64 bg-white md:border-r md:border-slate-100 rounded-lg md:rounded-none border-2 border-slate-200 flex flex-col z-20 animate-slide-in-left ${open ? "translate-x-0 opacity-100" : "translate-x-full hidden md:translate-x-0 md:opacity-100"}`}>
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
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
            </aside>
        </div>
    );
}
