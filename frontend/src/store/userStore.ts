import { create } from 'zustand';

export interface UserState {
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    isProfessional: string;
    setUser: (userData: Partial<UserState>) => void;
    clearUser: () => void;
}

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
