import type { Metadata, Viewport } from "next";
import { Lato, Manrope, Mulish } from "next/font/google";
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
        <html lang="en" suppressHydrationWarning>
            <body className={cx(mulish.variable, lato.variable, manrope.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    <Theme>{children}</Theme>
                </RouteProvider>
            </body>
        </html>
    );
}
