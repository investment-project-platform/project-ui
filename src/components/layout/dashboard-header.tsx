"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut01, Settings01 } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { useAuth } from "@/context/auth-context";
import { cx } from "@/utils/cx";

const navItems = [
    { label: "Історія транзакцій", id: "transactions" },
    { label: "Пропозиції", id: "proposals" },
    { label: "Поширені запитання", id: "faq" },
];

interface DashboardHeaderProps {
    onEditProfile?: () => void;
}

export const DashboardHeader = ({ onEditProfile }: DashboardHeaderProps) => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const fullName = user ? `${user.name} ${user.surname}` : "";

    async function handleLogout() {
        await logout();
        router.push("/login");
    }

    function scrollToSection(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <header className="fixed top-4 right-0 left-0 z-50 flex justify-center px-4 md:top-6 md:px-8">
            <div
                className={cx(
                    "relative flex w-full max-w-[1400px] items-center justify-between rounded-[72px] px-4 py-3 md:px-6",
                    "bg-black",
                    "shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
                )}
            >
                <Link href="/dashboard" className="relative z-10 shrink-0 cursor-pointer">
                    <Image src="/logo.svg" alt="Proєct" width={37} height={40} className="h-8 w-auto md:h-10" />
                </Link>

                <div className="relative z-10 hidden items-center gap-2 lg:flex">
                    <nav>
                        <ul className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection(item.id)}
                                        className="cursor-pointer rounded-lg px-3 py-2 font-body text-md font-semibold text-white transition-colors hover:text-brand-500"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <Dropdown.Root>
                        <AriaButton className="ml-2 flex cursor-pointer items-center gap-2 rounded-[32px] bg-white/10 px-4 py-2 text-white outline-hidden transition-colors hover:bg-white/15">
                            <span className="font-body text-md font-semibold">{fullName}</span>
                            <ChevronDown className="size-5 text-white/70" />
                        </AriaButton>
                        <Dropdown.Popover>
                            <Dropdown.Menu onAction={(key) => {
                                if (key === "edit-profile") onEditProfile?.();
                                if (key === "logout") handleLogout();
                            }}>
                                <Dropdown.Item id="edit-profile" icon={Settings01} label="Редагувати профіль" />
                                <Dropdown.Item id="logout" icon={LogOut01} label="Вийти" />
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                </div>

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

                <div
                    className={cx(
                        "absolute top-full right-0 left-0 mt-2 origin-top rounded-xl bg-[rgba(16,17,30,0.95)] p-4 shadow-2xl [backdrop-filter:blur(24px)_saturate(1.6)]",
                        "transition-all duration-300 ease-in-out",
                        mobileMenuOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0",
                    )}
                    aria-hidden={!mobileMenuOpen}
                >
                    <nav>
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            scrollToSection(item.id);
                                        }}
                                        className="block w-full cursor-pointer rounded-lg px-4 py-3 text-left font-body text-md font-semibold text-white transition-colors hover:bg-white/10"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                        <span className="px-4 font-body text-md font-semibold text-white">{fullName}</span>
                        <button
                            type="button"
                            onClick={() => { setMobileMenuOpen(false); onEditProfile?.(); }}
                            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-left font-body text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Settings01 className="size-4" />
                            Редагувати профіль
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
                </div>
            </div>
        </header>
    );
};
