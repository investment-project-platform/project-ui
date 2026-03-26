"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthenticatedUser } from "@projectua/project-backend-client";
import { api } from "@/lib/api";

interface AuthContextValue {
    user: AuthenticatedUser | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<AuthenticatedUser>;
    register: (name: string, surname: string, email: string, password: string) => Promise<AuthenticatedUser>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    updateProfile: (name: string, surname: string) => Promise<AuthenticatedUser>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function setAuthCookie() {
    document.cookie = "auth_status=1; path=/; max-age=1209600; SameSite=Lax";
}

function clearAuthCookie() {
    document.cookie = "auth_status=; path=/; max-age=0; SameSite=Lax";
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.initialize(true).then((restored) => {
            if (restored) {
                setUser(api.getCurrentUser());
                setAuthCookie();
            } else {
                clearAuthCookie();
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    async function login(email: string, password: string): Promise<AuthenticatedUser> {
        const response = await api.auth.login({ email, password });
        setUser(response.user);
        setAuthCookie();
        return response.user;
    }

    async function register(name: string, surname: string, email: string, password: string): Promise<AuthenticatedUser> {
        const response = await api.auth.register({ name, surname, email, password });
        setUser(response.user);
        setAuthCookie();
        return response.user;
    }

    async function logout(): Promise<void> {
        await api.auth.logout();
        setUser(null);
        clearAuthCookie();
    }

    async function forgotPassword(email: string): Promise<void> {
        await api.auth.forgotPassword({ email });
    }

    async function updateProfile(name: string, surname: string): Promise<AuthenticatedUser> {
        const updated = await api.user.updateProfile({ name, surname });
        setUser(updated);
        return updated;
    }

    async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
        await api.auth.changePassword({ current_password: currentPassword, new_password: newPassword });
    }

    async function refreshUser(): Promise<void> {
        const profile = await api.user.getProfile();
        setUser(profile);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout, forgotPassword, updateProfile, changePassword, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
