"use client";
import {
    BarChart2, Calendar, ClipboardList, Users,
    Settings, LogOut, LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";

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
    const handleLogout = useLogout();

    return (
        <aside className="w-full md:w-64 bg-white border-r border-slate-100 flex flex-col z-20 animate-slide-in-left">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md shadow-blue-200/60 hover:scale-105 transition-transform duration-300">
                    <LayoutDashboard className="text-white w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-[15px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">
                    Menú Profesional
                </span>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-1" aria-label="Professional main navigation">
                {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
                    const isActive = active === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${isActive
                                ? "bg-blue-50 text-blue-700 shadow-sm"
                                : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                                }`}
                        >
                            <Icon
                                className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-blue-600" : "text-slate-400"}`}
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
                    aria-label="Sign out and return to home"
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-semibold text-sm transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" aria-hidden="true" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
