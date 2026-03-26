"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut01, LayoutAlt01 } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { useAuth } from "@/context/auth-context";
import { cx } from "@/utils/cx";

const navItems = [
    { label: "Про нас", href: "#about" },
    { label: "Плани", href: "#plans" },
    { label: "Проєкти", href: "#projects" },
    { label: "Поширені запитання", href: "#faq" },
];

export const LandingHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();

    const isAuthenticated = !isLoading && !!user;
    const isLoadingAuth = isLoading;
    const fullName = user ? `${user.name} ${user.surname}` : "";

    async function handleLogout() {
        await logout();
        router.push("/");
    }

    return (
        <header className="fixed top-4 right-0 left-0 z-50 flex justify-center px-4 md:top-6 md:px-8">
            <div
                className={cx(
                    "liquid-glass gradient-border-header relative flex w-full max-w-[1400px] items-center justify-between rounded-[72px] px-4 py-3 md:px-6",
                    "bg-[rgba(16,17,30,0.47)]",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_40px_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.1)]",
                    "[backdrop-filter:blur(8px)_saturate(1.4)_brightness(1.1)]",
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

                    {isLoadingAuth ? (
                        <div className="ml-2 flex animate-pulse items-center gap-2 rounded-[32px] bg-white/10 px-4 py-2">
                            <div className="h-4 w-30 rounded-full bg-white/20" />
                            <div className="size-5 rounded-full bg-white/20" />
                        </div>
                    ) : isAuthenticated ? (
                        <Dropdown.Root>
                            <AriaButton className="ml-2 flex cursor-pointer items-center gap-2 rounded-[32px] bg-white/10 px-4 py-2 text-white outline-hidden transition-colors hover:bg-white/15">
                                <span className="font-body text-md font-semibold">{fullName}</span>
                                <ChevronDown className="size-5 text-white/70" />
                            </AriaButton>
                            <Dropdown.Popover>
                                <Dropdown.Menu onAction={(key) => {
                                    if (key === "dashboard") router.push("/dashboard");
                                    if (key === "logout") handleLogout();
                                }}>
                                    <Dropdown.Item id="dashboard" icon={LayoutAlt01} label="Редагувати профіль" />
                                    <Dropdown.Item id="logout" icon={LogOut01} label="Вийти" />
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown.Root>
                    ) : (
                        <Button href="/login" size="md" color="primary" className="gradient-border-light ml-2 !shadow-none !ring-0">
                            Увійти до кабінету
                        </Button>
                    )}
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
                        "absolute top-full right-0 left-0 mt-2 origin-top rounded-xl bg-[rgba(16,17,30,0.92)] p-4 shadow-2xl [backdrop-filter:blur(24px)_saturate(1.6)]",
                        "transition-all duration-300 ease-in-out",
                        mobileMenuOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0",
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
                    {isLoadingAuth ? (
                        <div className="mt-3 animate-pulse border-t border-white/10 pt-3 px-4">
                            <div className="h-4 w-32 rounded-full bg-white/20" />
                        </div>
                    ) : isAuthenticated ? (
                        <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                            <span className="px-4 font-body text-md font-semibold text-white">{fullName}</span>
                            <button
                                type="button"
                                onClick={() => { setMobileMenuOpen(false); router.push("/dashboard"); }}
                                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-left font-body text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <LayoutAlt01 className="size-4" />
                                Перейти до кабінету
                            </button>
                            <button
                                type="button"
                                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-left font-body text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <LogOut01 className="size-4" />
                                Вийти
                            </button>
                        </div>
                    ) : (
                        <Button href="/login" size="lg" color="primary" className="gradient-border-light mt-3 w-full !shadow-none !ring-0">
                            Увійти до кабінету
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};
