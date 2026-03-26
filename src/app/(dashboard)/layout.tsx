import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata: Metadata = {
    title: "Кабінет | Інвестиційна Платформа",
};

export default function DashboardRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DashboardShell>{children}</DashboardShell>;
}
