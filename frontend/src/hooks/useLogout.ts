import { supabase } from "@/lib/supabaseClient";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const useLogout = () => {
    const router = useRouter();
    const handleLogout = useCallback(async () => {
        await supabase.auth.signOut();
        document.cookie = "first_name=; expires=Sat, 01 Jan 2000 00:00:00 UTC; path=/;";
        document.cookie = "user_id=; expires=Sat, 01 Jan 2000 00:00:00 UTC; path=/;";
        document.cookie = "is_professional=; expires=Sat, 01 Jan 2000 00:00:00 UTC; path=/;";
        window.location.replace("/");
    }, []);

    return handleLogout;
}