"use server";

import { cookies } from "next/headers";

/**
 * Sets the authentication cookies for the session.
 * @param data Object containing user identification and basic info.
 */
export async function setAuthCookies(data: {
    firstName: string;
    lastName: string;
    email: string | null;
    userId: string;
    isProfessional: string;
}) {
    const cookieStore = await cookies();
    const maxAge = 60 * 60 * 24 * 7; // 1 week in seconds

    const cookieOpts = { maxAge, path: "/", httpOnly: true, secure: true, sameSite: "lax" as const };

    cookieStore.set("first_name", data.firstName, cookieOpts);
    cookieStore.set("last_name", data.lastName, cookieOpts);
    if (data.email) {
        cookieStore.set("email", data.email, cookieOpts);
    }
    cookieStore.set("user_id", data.userId, cookieOpts);
    cookieStore.set("is_professional", data.isProfessional, cookieOpts);
}

/**
 * Clears all authentication cookies.
 */
export async function clearAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.delete("first_name");
    cookieStore.delete("last_name");
    cookieStore.delete("email");
    cookieStore.delete("user_id");
    cookieStore.delete("is_professional");
}
