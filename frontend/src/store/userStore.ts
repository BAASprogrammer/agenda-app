import { create } from 'zustand';
import { UserState } from "@/types/user-state";

export const useUserStore = create<UserState>((set) => ({
    isLoggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    userId: "",
    isProfessional: "false",
    setUser: (userData) => set((state) => ({ ...state, ...userData })),
    clearUser: () => set({
        isLoggedIn: false,
        firstName: "",
        lastName: "",
        email: "",
        userId: "",
        isProfessional: "false"
    })
}));
