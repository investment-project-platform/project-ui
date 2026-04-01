"use client";

import { useState, type ReactNode } from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { EditProfileModal } from "@/components/features/dashboard/edit-profile-modal";
import { DashboardDataProvider } from "@/context/dashboard-context";

export const DashboardShell = ({ children }: { children: ReactNode }) => {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    return (
        <DashboardDataProvider openEditProfile={() => setIsEditProfileOpen(true)}>
            <DashboardHeader onEditProfile={() => setIsEditProfileOpen(true)} />
            {children}
            <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
        </DashboardDataProvider>
    );
};
