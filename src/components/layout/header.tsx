"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const navItems = [
    { label: "Про нас", href: "#about" },
    { label: "Плани", href: "#plans" },
    { label: "Проєкти", href: "#projects" },
    { label: "Поширені запитання", href: "#faq" },
];

export const LandingHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-4 right-0 left-0 z-50 flex justify-center px-4 md:top-6 md:px-8">
            <div
                className={cx(
                    "gradient-border-header relative flex w-full max-w-[1320px] items-center justify-between rounded-3xl px-4 py-2.5 md:px-6 md:py-3",
                    "[--header-bg:rgba(16,17,30,0.57)]",
                    "bg-[var(--header-bg)] shadow-lg backdrop-blur-xl",
                )}
            >
                {/* Logo */}
                <Link href="/" className="relative z-10 shrink-0 cursor-pointer">
                    <Image src="/logo.svg" alt="Proєct" width={37} height={40} className="h-8 w-auto md:h-10" />
                </Link>

                {/* Desktop Nav + CTA */}
                <div className="relative z-10 hidden items-center gap-2 lg:flex">
                    <nav>
                        <ul className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="cursor-pointer rounded-lg px-3 py-2 font-body text-md font-semibold text-white transition-colors hover:text-brand-500"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <Button
                        href="/login"
                        size="md"
                        color="primary"
                        className="gradient-border-light ml-2 !shadow-none !ring-0"
                    >
                        Увійти до кабінету
                    </Button>
                </div>

                {/* Mobile menu button - animated hamburger */}
                <button
                    aria-label={mobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="relative z-10 cursor-pointer rounded-lg p-2 text-white lg:hidden"
                >
                    <span className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
                        <span
                            className={cx(
                                "block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ease-in-out",
                                mobileMenuOpen && "translate-y-[7px] rotate-45",
                            )}
                        />
                        <span
                            className={cx(
                                "block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ease-in-out",
                                mobileMenuOpen && "scale-x-0 opacity-0",
                            )}
                        />
                        <span
                            className={cx(
                                "block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ease-in-out",
                                mobileMenuOpen && "-translate-y-[7px] -rotate-45",
                            )}
                        />
                    </span>
                </button>

                {/* Mobile menu dropdown - animated */}
                <div
                    className={cx(
                        "absolute top-full right-0 left-0 mt-2 origin-top rounded-2xl bg-[rgba(16,17,30,0.95)] p-4 shadow-2xl backdrop-blur-xl",
                        "transition-all duration-300 ease-in-out",
                        mobileMenuOpen
                            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                            : "pointer-events-none -translate-y-2 scale-95 opacity-0",
                    )}
                    aria-hidden={!mobileMenuOpen}
                >
                    <nav>
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMobileMenuOpen(false);
                                            document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="block cursor-pointer rounded-lg px-4 py-3 font-body text-md font-semibold text-white transition-colors hover:bg-white/10"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Button
                        href="/login"
                        size="lg"
                        color="primary"
                        className="gradient-border-light mt-3 w-full !shadow-none !ring-0"
                    >
                        Увійти до кабінету
                    </Button>
                </div>
            </div>
        </header>
    );
};
