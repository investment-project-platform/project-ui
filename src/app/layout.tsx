import type { Metadata, Viewport } from "next";
import { Lato, Manrope, Mulish, Roboto } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const mulish = Mulish({
    subsets: ["latin", "cyrillic"],
    display: "swap",
    variable: "--font-mulish",
});

const lato = Lato({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "700"],
    variable: "--font-lato",
});

const manrope = Manrope({
    subsets: ["latin", "cyrillic"],
    display: "swap",
    variable: "--font-manrope",
});

const roboto = Roboto({
    subsets: ["latin", "cyrillic"],
    display: "swap",
    weight: ["400", "600", "700"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "Інвестиційна Платформа",
    description: "Платформа для венчурних інвестицій в бізнес",
};

export const viewport: Viewport = {
    themeColor: "#514C6B",
    colorScheme: "light dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk" suppressHydrationWarning>
            <body className={cx(mulish.variable, lato.variable, manrope.variable, roboto.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    <Theme>
                        <AuthProvider>{children}</AuthProvider>
                    </Theme>
                </RouteProvider>
            </body>
        </html>
    );
}
