"use client";

import Image from "next/image";
import { ArrowDown } from "@untitledui/icons";
import { motion } from "motion/react";
import { Button } from "@/components/base/buttons/button";

export const HeroSection = () => {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative">
            {/* Hero background */}
            <div className="relative min-h-[calc(100dvh+3rem)] w-full overflow-hidden">
                {/* Image fallback (visible when video fails or does not autoplay) */}
                <Image src="/assets/images/landing/hero-background.webp" alt="" fill priority className="object-cover" sizes="100vw" aria-hidden />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/images/landing/hero-background.webp"
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-hidden
                >
                    <source src="/assets/images/landing/hero-background.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/16" />

                {/* Hero content on the image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
                    <motion.div
                        className="flex max-w-[1096px] flex-col items-center gap-8 text-center md:gap-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1
                            className="max-w-[26ch] font-display text-3xl leading-tight font-extrabold text-pretty text-white uppercase md:text-4xl lg:text-[56px] lg:leading-[1.2]"
                            style={{ textShadow: "0px 4px 19.5px rgba(0, 0, 0, 0.25)" }}
                        >
                            Забезпечуємо можливість доступних інвестицій <span className="text-brand-200">для кожного</span>
                        </h1>

                        <Button onClick={() => scrollToSection("plans")} size="lg" color="primary" className="gradient-border-light !shadow-none !ring-0">
                            Перейти до планів
                        </Button>
                    </motion.div>
                </div>

                {/* Animated scroll-down arrow button — bottom right, animation on button */}
                <motion.a
                    href="#about"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("about");
                    }}
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-8 z-10 flex py-4 px-1 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(16,17,30,0.57)] backdrop-blur-xl gradient-border-header shadow-lg transition-opacity hover:opacity-90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    aria-label="Прокрутити до наступного розділу"
                >
                    <ArrowDown className="size-6 shrink-0 text-white" />
                </motion.a>
            </div>
        </section>
    );
};
