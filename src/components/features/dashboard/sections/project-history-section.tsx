"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, LineChartUp01, PieChart01, Wallet03 } from "@untitledui/icons";
import { AnimatePresence, motion } from "motion/react";
import { StatCard } from "@/components/features/dashboard/stat-card";
import { cx } from "@/utils/cx";

const projectHistorySlides = [
    {
        planLabel: "План:",
        planName: "Загальний",
        description: "Інвестиція в загальний капітал проекту",
        stats: [
            { label: "Мої вкладення:", value: "$1,000", change: "10% з попереднього кварталу", icon: Wallet03 },
            { label: "Мої вкладення:", value: "$1,000", change: "10% з попереднього кварталу", icon: LineChartUp01 },
            { label: "Мої вкладення:", value: "15%", icon: PieChart01 },
        ],
    },
    {
        planLabel: "План:",
        planName: "Точковий",
        description: "Інвестиція в конкретний актив компанії",
        stats: [
            { label: "Мої вкладення:", value: "$2,500", change: "12% з попереднього кварталу", icon: Wallet03 },
            { label: "Мої вкладення:", value: "$2,500", change: "12% з попереднього кварталу", icon: LineChartUp01 },
            { label: "Мої вкладення:", value: "20%", icon: PieChart01 },
        ],
    },
    {
        planLabel: "План:",
        planName: "Частковий",
        description: "Інвестиція в певну галузь портфелю",
        stats: [
            { label: "Мої вкладення:", value: "$500", change: "8% з попереднього кварталу", icon: Wallet03 },
            { label: "Мої вкладення:", value: "$500", change: "8% з попереднього кварталу", icon: LineChartUp01 },
            { label: "Мої вкладення:", value: "10%", icon: PieChart01 },
        ],
    },
    {
        planLabel: "План:",
        planName: "Венчурний",
        description: "Інвестиція у венчурні активи",
        stats: [
            { label: "Мої вкладення:", value: "$3,000", change: "15% з попереднього кварталу", icon: Wallet03 },
            { label: "Мої вкладення:", value: "$3,000", change: "15% з попереднього кварталу", icon: LineChartUp01 },
            { label: "Мої вкладення:", value: "25%", icon: PieChart01 },
        ],
    },
];

export const ProjectHistorySection = () => {
    const [historySlide, setHistorySlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    function goToSlide(index: number) {
        setDirection(index > historySlide ? 1 : -1);
        setHistorySlide(index);
    }

    function prev() {
        if (historySlide > 0) goToSlide(historySlide - 1);
    }

    function next() {
        if (historySlide < projectHistorySlides.length - 1) goToSlide(historySlide + 1);
    }

    const slide = projectHistorySlides[historySlide];

    return (
        <section className="px-4 py-12 md:px-8 lg:py-20">
            <div className="mx-auto max-w-[1400px]">
                {/* Title + decorative line */}
                <div className="mb-16 flex flex-col gap-4 border-b-2 border-[#EAEAF3] pb-7">
                    <h2 className="font-display text-2xl font-bold text-gray-950 uppercase md:text-3xl lg:text-[36px]">Історія проєктів</h2>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={historySlide}
                                custom={direction}
                                initial={{ opacity: 0, x: direction * 300 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -300 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                drag={isMobile ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.15}
                                onDragEnd={(_e, { offset, velocity }) => {
                                    const swipe = Math.abs(offset.x) * velocity.x;
                                    if (swipe < -2000 || offset.x < -80) {
                                        next();
                                    } else if (swipe > 2000 || offset.x > 80) {
                                        prev();
                                    }
                                }}
                                className="rounded-xl bg-gray-400 p-8 md:p-10 lg:p-12"
                            >
                                <div className="flex flex-col gap-6 md:flex-row justify-between">
                                    <div className="shrink-0 md:w-[368px]">
                                        <p className="font-display text-[40px] font-bold leading-none text-purple-800">{slide.planLabel}</p>
                                        <h3 className="font-display text-[40px] font-bold leading-tight text-black">{slide.planName}</h3>
                                        <p className="mt-3 font-body text-md leading-[22px] text-black">{slide.description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {slide.stats.map((stat, i) => (
                                            <StatCard key={i} {...stat} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation arrows */}
                    <button
                        type="button"
                        onClick={prev}
                        className={cx(
                            "absolute top-1/2 -left-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center text-gray-blue-600 transition-opacity hover:opacity-70 md:flex",
                            historySlide === 0 && "pointer-events-none opacity-30",
                        )}
                        aria-label="Попередній проєкт"
                    >
                        <ChevronLeft className="size-8" />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        className={cx(
                            "absolute top-1/2 -right-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center text-gray-blue-600 transition-opacity hover:opacity-70 md:flex",
                            historySlide >= projectHistorySlides.length - 1 && "pointer-events-none opacity-30",
                        )}
                        aria-label="Наступний проєкт"
                    >
                        <ChevronRight className="size-8" />
                    </button>
                </div>

                {/* Pagination dots – active: 24×6 #343A71 r-8, inactive: 6×6 circle gray */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    {projectHistorySlides.map((_, dot) => (
                        <button
                            key={dot}
                            type="button"
                            onClick={() => goToSlide(dot)}
                            className={cx(
                                "h-1.5 cursor-pointer rounded-[8px] transition-all duration-300",
                                dot === historySlide ? "w-6 bg-[#343A71]" : "w-1.5 bg-[#C5C0D8]",
                            )}
                            aria-label={`Слайд ${dot + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
