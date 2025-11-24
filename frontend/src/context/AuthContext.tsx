// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
    fullName: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    myCourses: string[];
    login: (token: string, user: User) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [myCourses, setMyCourses] = useState<string[]>([]);

    // Load data from localStorage when app starts
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        const savedCourses = localStorage.getItem("myCourses");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }

        if (savedCourses) {
            setMyCourses(JSON.parse(savedCourses));
        }
    }, []);

    const login = (tokenValue: string, userData: User) => {
        setUser(userData);
        setToken(tokenValue);

        localStorage.setItem("token", tokenValue);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setMyCourses([]);

        localStorage.clear(); // full clean
    };

    return (
        <AuthContext.Provider value={{ user, token, myCourses, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
    return context;
};
