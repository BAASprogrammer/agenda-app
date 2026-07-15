export interface UserState {
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    isProfessional: boolean;
    setUser: (userData: Partial<UserState>) => void;
    clearUser: () => void;
}
