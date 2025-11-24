import { createContext, useContext, useState, ReactNode } from "react";

interface AuthUIContextType {
    showLogin: boolean;
    setShowLogin: (value: boolean) => void;
    showSignup: boolean;
    setShowSignup: (value: boolean) => void;
}

interface AuthUIProviderProps {
    children: ReactNode;
}

const AuthUIContext = createContext<AuthUIContextType | null>(null);

export function AuthUIProvider({ children }: AuthUIProviderProps) {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    return (
        <AuthUIContext.Provider value={{ showLogin, setShowLogin, showSignup, setShowSignup }}>
            {children}
        </AuthUIContext.Provider>
    );
}

export const useAuthUI = () => {
    const context = useContext(AuthUIContext);
    if (!context) {
        throw new Error("useAuthUI must be used inside AuthUIProvider");
    }
    return context;
};
