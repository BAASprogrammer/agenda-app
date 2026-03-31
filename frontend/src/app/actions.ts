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

    cookieStore.set("first_name", data.firstName, { maxAge, path: "/" });
    cookieStore.set("last_name", data.lastName, { maxAge, path: "/" });
    if (data.email) {
        cookieStore.set("email", data.email, { maxAge, path: "/" });
    }
    cookieStore.set("user_id", data.userId, { maxAge, path: "/" });
    cookieStore.set("is_professional", data.isProfessional, { maxAge, path: "/" });
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
