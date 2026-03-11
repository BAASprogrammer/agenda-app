import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const userId = req.cookies.get("user_id")?.value;
    const { pathname } = req.nextUrl;
    const publicRoutes = ["/", "/about", "/contact", "/register/patient", "/register/professional"];
    const isPublicRoute = publicRoutes.includes(pathname);
    if (!userId && !isPublicRoute) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (userId && pathname === "/") {
        const is_professional = req.cookies.get("is_professional")?.value;
        const dashboard = is_professional === "true" ? "/home/professional" : "/home/patient";
        return NextResponse.redirect(new URL(dashboard, req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};