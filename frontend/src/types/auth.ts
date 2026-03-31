export interface HeaderProps {
    firstName: string;
    isLoggedIn: boolean;
    isProfessional: string;
}

export interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    setIsLoggedIn: (loggedIn: boolean) => void;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    isProfessional: boolean;
    phone: string;
    email: string;
    password: string;
    subspecialtyId?: string | null;
}
