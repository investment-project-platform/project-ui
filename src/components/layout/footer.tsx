"use client";

import { Mail01 } from "@untitledui/icons";
import BottomBanner from "@/assets/images/footer/bottom-banner.svg";
import { Button } from "@/components/base/buttons/button";

const navItems = [
    { label: "Про нас", href: "#about" },
    { label: "Плани", href: "#plans" },
    { label: "Проєкти", href: "#projects" },
    { label: "Поширені запитання", href: "#faq" },
];

const TelegramIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M22 3.47L18.9 20.17C18.9 20.17 18.47 21.27 17.27 20.74L11.36 16.13L8.73 14.88L4.22 13.38C4.22 13.38 3.52 13.14 3.45 12.61C3.38 12.08 4.24 11.79 4.24 11.79L20.49 5.42C20.49 5.42 22 4.77 22 3.47Z"
            fill="currentColor"
        />
        <path
            d="M8.73 20.23C8.73 20.23 8.51 20.21 8.24 19.34C7.97 18.47 6.81 14.05 6.81 14.05L17.99 7.1C17.99 7.1 18.63 6.72 18.6 7.1C18.6 7.1 18.7 7.17 18.36 7.48C18.02 7.79 9 16 9 16"
            fill="currentColor"
        />
        <path d="M11.06 18.02L8.97 20.17C8.97 20.17 8.82 20.28 8.73 20.23L9.12 16.09" fill="currentColor" />
    </svg>
);

const InstagramIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path
            d="M3 12C3 7.8 3 5.7 4.35 4.35C5.7 3 7.8 3 12 3C16.2 3 18.3 3 19.65 4.35C21 5.7 21 7.8 21 12C21 16.2 21 18.3 19.65 19.65C18.3 21 16.2 21 12 21C7.8 21 5.7 21 4.35 19.65C3 18.3 3 16.2 3 12Z"
            stroke="currentColor"
            strokeWidth="2"
        />
    </svg>
);

export const LandingFooter = () => {
    return (
        <footer className="relative overflow-hidden rounded-t-xl bg-black">
            {/* Top section: email + nav */}
            <div className="border-white/10 px-6 py-8 md:px-16 md:py-12">
                <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                    <div className="flex flex-col gap-4">
                        <span className="font-display text-3xl font-bold text-brand-500 uppercase lg:text-[56px]">Proєсt@gmail.com</span>
                        <Button
                            href="mailto:project.su.main@gmail.com"
                            size="md"
                            color="primary"
                            iconLeading={<Mail01 />}
                            className="gradient-border-light w-fit !shadow-none !ring-0"
                        >
                            Написати на пошту
                        </Button>
                    </div>

                    <nav className="flex flex-row flex-wrap gap-4 md:flex-col md:items-end">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="cursor-pointer rounded-2xl font-body text-md font-semibold text-white transition-colors hover:text-white/70"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Bottom section: social + email */}
            <div className="px-6 pt-8 pb-2 md:px-16 md:pt-12">
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-4">
                        <a
                            href="https://t.me/project"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/20 px-5 py-2.5 font-body text-md font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            <TelegramIcon />
                            Telegram
                        </a>
                        <a
                            href="https://instagram.com/project"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/20 px-5 py-2.5 font-body text-md font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            <InstagramIcon />
                            Instagram
                        </a>
                    </div>

                    <span className="font-body text-sm text-brand-500">proєct@gmail.com</span>
                </div>
            </div>

            <div className="px-6 md:px-16">
                <BottomBanner className="relative w-full" aria-hidden="true" />
            </div>
        </footer>
    );
};
