"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface AuthLayoutProps {
    children: ReactNode;
    /** "login" has white left side, "signup" has dark left side */
    variant: "login" | "signup";
}

export const AuthLayout = ({ children, variant }: AuthLayoutProps) => {
    const isLogin = variant === "login";

    return (
        <div className="relative flex min-h-dvh w-full">
            {/* Left side — form area */}
            <div
                className={cx(
                    "relative z-10 flex w-full flex-col lg:min-h-dvh",
                    isLogin ? "bg-white lg:w-[43%]" : "bg-black lg:w-[61%]",
                )}
            >
                {/* Breadcrumb */}
                <div className="px-6 pt-12 md:px-12 md:pt-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 pb-0.5 text-lg text-brand-700 transition-colors hover:text-brand-800"
                    >
                        <ArrowLeft className="size-5" />
                        <span className="font-body">Головна</span>
                    </Link>
                </div>

                {/* Form content */}
                <div className="flex flex-1 flex-col">{children}</div>
            </div>

            {/* Right side — video background */}
            <div
                className={cx(
                    "relative hidden overflow-hidden lg:block",
                    isLogin ? "lg:w-[57%]" : "lg:w-[39%]",
                )}
            >
                {/* Dark base layer */}
                <div className="absolute inset-0 bg-black" />

                {/* Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.84]"
                >
                    <source src="/assets/images/landing/hero-background.mp4" type="video/mp4" />
                </video>

                {/* Logo centered in the video area */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/logo.svg"
                        alt="Proєct"
                        width={207}
                        height={50}
                        className="h-[50px] w-auto"
                    />
                </div>
            </div>
        </div>
    );
};
