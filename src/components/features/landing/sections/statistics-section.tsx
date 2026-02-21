"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";

const stats = [
    {
        badge: "Інвестиції",
        value: "5М",
        description: "Залучено інвестицій за останній рік",
    },
    {
        badge: "Дохідність",
        value: "15%",
        description: "Середня дохідність інвестицій наших клієнтів за рік",
    },
    {
        badge: "Прибуток",
        value: "3М₴",
        description: "Загальний прибуток клієнтів за останній рік",
    },
    {
        badge: "Проєкти",
        value: "5+",
        description: "Успішних проєктів отримали фінансування",
    },
];

const GradientDivider = () => (
    <div
        className="hidden h-[335px] w-px shrink-0 lg:block"
        style={{
            background: "linear-gradient(90deg, #111325 0%, #9E94D1 26%, #514C6B 62%, #111325 99%)",
        }}
    />
);

const parseValue = (value: string): { number: number; suffix: string } => {
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) return { number: 0, suffix: value };
    return {
        number: parseFloat(match[1]),
        suffix: match[2] ?? "",
    };
};

const AnimatedNumber = ({ value }: { value: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [displayNumber, setDisplayNumber] = useState(0);

    const { number: target, suffix } = useMemo(() => parseValue(value), [value]);

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(0, target, {
            duration: 1,
            ease: [0.22, 0.61, 0.36, 1],
            onUpdate: (latest) => setDisplayNumber(latest),
        });
        return () => controls.stop();
    }, [isInView, target]);

    const formatted = target % 1 === 0 ? Math.round(displayNumber) : displayNumber.toFixed(1);

    return (
        <span ref={ref}>
            {formatted}
            {suffix}
        </span>
    );
};

export const StatisticsSection = () => {
    return (
        <section id="projects" className="bg-black px-4 py-16 md:px-16 md:py-24">
            <motion.div
                className="mx-auto max-w-[1320px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Header */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-accent text-3xl font-extrabold uppercase leading-tight text-white md:text-4xl lg:text-[56px] lg:leading-[1.37]">
                        Статистика проєктів
                    </h2>
                    {/* Decorative line */}
                    <div className="h-0.5 w-full border-t-2 border-[#463D67]" />
                </div>

                {/* Stats row */}
                <div className="mt-16 grid grid-cols-2 gap-8 lg:flex lg:items-center lg:gap-3">
                    {stats.map((stat, index) => (
                        <Fragment key={stat.badge}>
                            <motion.div
                                className="flex flex-col items-center gap-5 lg:w-[312px]"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                            >
                                {/* Badge */}
                                <span className="inline-flex items-center justify-center rounded-2xl bg-[#98C6EE] px-6 py-2 font-body text-sm text-black">
                                    {stat.badge}
                                </span>

                                {/* Large number */}
                                <span className="font-mono text-6xl font-semibold leading-none text-white md:text-[80px] lg:text-[118px]">
                                    <AnimatedNumber value={stat.value} />
                                </span>

                                {/* Description */}
                                <p className="px-4 text-center font-body text-base leading-normal text-gray-600 md:px-8">{stat.description}</p>
                            </motion.div>
                            {index < stats.length - 1 && <GradientDivider />}
                        </Fragment>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
