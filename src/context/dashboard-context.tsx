"use client";

import { createContext, useContext } from "react";

interface DashboardContextValue {
    openEditProfile: () => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export const DashboardProvider = DashboardContext.Provider;

export function useDashboard(): DashboardContextValue {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within DashboardProvider");
    }
    return context;
}
