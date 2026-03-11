"use client";
import {
    Activity, Calendar, ClipboardList, Users,
    Settings, LogOut, LayoutGrid
} from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";

// ✅ TypeScript: define the exact prop this component accepts (union type, not just string).
// TypeScript will warn you if you pass an invalid route.
interface ProSidebarProps {
    active: "/homeprofessional" | "/schedule" | "/manageappointments" | "/mypatients" | "/settings";
}

// Defined outside the component so it's not re-created on every render.
const NAV_ITEMS = [
    { href: "/homeprofessional", icon: Activity, label: "Dashboard" },
    { href: "/schedule", icon: Calendar, label: "Ver Agenda" },
    { href: "/manageappointments", icon: ClipboardList, label: "Gestionar Citas" },
    { href: "/mypatients", icon: Users, label: "Mis Pacientes" },
    { href: "/settings", icon: Settings, label: "Configuración" },
] as const; // "as const" makes TypeScript know the exact values, not just "string"

// ✅ Accessibility: aria-label on the nav and aria-current="page" on the active item.
// Screen readers use these to help users navigate. Zero visual impact, high a11y value.
export default function ProSidebar({ active }: ProSidebarProps) {
    const handleLogout = useLogout();
    return (
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col z-20">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
                    <LayoutGrid className="text-white w-6 h-6" aria-hidden="true" />
                </div>
                <span className="text-xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-cyan-500 tracking-tight">
                    Menú Profesional
                </span>
            </div>

            {/* aria-label describes the purpose of this navigation region */}
            <nav className="flex-1 p-4 space-y-2" aria-label="Professional main navigation">
                {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
                    const isActive = active === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            // aria-current="page" tells the browser which page is currently active
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
                    // aria-label: the button text already says "Cerrar Sesión" which is fine,
                    // but if it were icon-only, this would be mandatory for accessibility.
                    aria-label="Sign out and return to home"
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl font-medium transition-all"
                >
                    <LogOut className="w-5 h-5" aria-hidden="true" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
