import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const userId = req.cookies.get("user_id")?.value;
    const { pathname } = req.nextUrl;

    // Rutas que no requieren sesión
    const publicRoutes = ["/", "/about", "/contact", "/register/patient", "/register/professional"];
    const isPublicRoute = publicRoutes.includes(pathname);

    // 1. Si NO hay sesión y la ruta NO es pública, redirigir a la landing (/)
    if (!userId && !isPublicRoute) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. Si YA hay sesión e intenta ir a la landing (/), redirigir a su Home respectiva
    if (userId && pathname === "/") {
        const isProfessional = req.cookies.get("is_professional")?.value;
        const dashboard = isProfessional === "true" ? "/home/professional" : "/home/patient";
        return NextResponse.redirect(new URL(dashboard, req.url));
    }

    return NextResponse.next();
}

// Configuración de rutas a las que aplica este middleware
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
