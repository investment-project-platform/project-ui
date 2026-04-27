"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, LineChartUp01, PieChart01, Wallet03 } from "@untitledui/icons";
import { AnimatePresence, motion } from "motion/react";
import { formatMoney, formatPercent } from "@projectua/project-core";
import { StatCard } from "@/components/features/dashboard/stat-card";
import { useDashboard } from "@/context/dashboard-context";
import { cx } from "@/utils/cx";

export const ProjectHistorySection = () => {
    const { projects, projectsLoading } = useDashboard();
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

    useEffect(() => {
        setHistorySlide(0);
    }, [projects]);

    function goToSlide(index: number) {
        setDirection(index > historySlide ? 1 : -1);
        setHistorySlide(index);
    }

    function prev() {
        if (historySlide > 0) goToSlide(historySlide - 1);
    }

    function next() {
        if (historySlide < projects.length - 1) goToSlide(historySlide + 1);
    }

    const slide = projects[historySlide];

    return (
        <section className="px-4 py-12 md:px-8 lg:py-20">
            <div className="mx-auto max-w-[1400px]">
                {/* Title + decorative line */}
                <div className="mb-16 flex flex-col gap-4 border-b-2 border-[#EAEAF3] pb-7">
                    <h2 className="font-display text-2xl font-bold text-gray-950 uppercase md:text-3xl lg:text-[36px]">Історія проєктів</h2>
                </div>

                {projectsLoading && (
                    <div className="animate-pulse rounded-xl bg-gray-400 p-8 md:p-10 lg:p-12">
                        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                            <div className="shrink-0 space-y-4 md:w-[368px]">
                                <div className="h-10 w-24 rounded bg-gray-300" />
                                <div className="h-10 w-48 rounded bg-gray-300" />
                                <div className="h-4 w-56 rounded bg-gray-300" />
                                <div className="h-4 w-40 rounded bg-gray-300" />
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="flex w-[260px] flex-col gap-6 rounded-xl bg-white/60 px-8 py-7">
                                        <div className="flex items-center gap-2">
                                            <div className="size-8 rounded-full bg-gray-300" />
                                            <div className="h-5 w-24 rounded bg-gray-300" />
                                        </div>
                                        <div className="h-12 w-32 rounded bg-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {!projectsLoading && projects.length === 0 && (
                    <p className="py-8 text-center font-body text-md">У вас поки немає проєктів</p>
                )}

                {!projectsLoading && projects.length > 0 && slide && (
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
                                            <p className="font-display text-[40px] font-bold leading-none text-purple-800">Проєкт:</p>
                                            <h3 className="font-display text-[40px] font-bold leading-tight text-black">{slide.title}</h3>
                                            <p className="mt-3 font-body text-md leading-[22px] text-black">{slide.description ?? slide.status}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            <StatCard label="Вкладення:" value={formatMoney(slide.totalInvested, { currency: "USD" }).replace(/\.\d{2}$/, "")} icon={Wallet03} />
                                            <StatCard label="Капіталізація:" value={formatMoney(slide.capitalization, { currency: "USD" }).replace(/\.\d{2}$/, "")} icon={LineChartUp01} />
                                            <StatCard label="Прибуток:" value={formatPercent(slide.profitPercentage, { decimals: 0 })} icon={PieChart01} />
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
                                historySlide >= projects.length - 1 && "pointer-events-none opacity-30",
                            )}
                            aria-label="Наступний проєкт"
                        >
                            <ChevronRight className="size-8" />
                        </button>
                    </div>
                )}

                {/* Pagination dots */}
                {!projectsLoading && projects.length > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        {projects.map((_, dot) => (
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
                )}
            </div>
        </section>
    );
};
