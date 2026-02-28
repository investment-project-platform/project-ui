import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Авторизація | Інвестиційна Платформа",
};

export default function AuthRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
