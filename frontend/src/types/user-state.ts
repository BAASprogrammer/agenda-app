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
