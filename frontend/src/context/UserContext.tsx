"use client";
import { createContext, useContext } from "react";

export interface UserContextType {
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    isProfessional: string;
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ isLoggedIn, firstName, lastName, email, userId, isProfessional, children }: { isLoggedIn: boolean, firstName: string, lastName: string, email: string, userId: string, isProfessional: string, children: React.ReactNode }) => {
    return (
        <UserContext.Provider value={{ isLoggedIn, firstName, lastName, email, userId, isProfessional }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser debe ser usado dentro de un UserProvider");
    }
    return context;
}
