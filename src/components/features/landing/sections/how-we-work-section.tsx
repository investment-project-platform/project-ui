"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const steps = [
    {
        number: "01",
        title: "Збираємо інвестиції",
        illustration: "/assets/images/landing/currencies.svg",
    },
    {
        number: "02",
        title: "Купуємо активи",
        illustration: "/assets/images/landing/bank.svg",
    },
    {
        number: "03",
        title: "Керуємо процесом",
        illustration: "/assets/images/landing/gears.svg",
    },
    {
        number: "04",
        title: "Клієнт отримує прибуток",
        illustration: "/assets/images/landing/percents.svg",
    },
];

export const HowWeWorkSection = () => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const lineWidth = useTransform(scrollYProgress, [0.28, 0.6], ["0%", "100%"]);

    // Step 1 is always visible (no animation)
    const step2Opacity = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
    const step2Y = useTransform(scrollYProgress, [0.3, 0.42], [30, 0]);
    const step3Opacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
    const step3Y = useTransform(scrollYProgress, [0.42, 0.52], [30, 0]);
    const step4Opacity = useTransform(scrollYProgress, [0.52, 0.6], [0, 1]);
    const step4Y = useTransform(scrollYProgress, [0.52, 0.6], [30, 0]);

    const stepTransforms = [
        { opacity: 1, y: 0 },
        { opacity: step2Opacity, y: step2Y },
        { opacity: step3Opacity, y: step3Y },
        { opacity: step4Opacity, y: step4Y },
    ];

    return (
        <section ref={ref} id="about" className="rounded-t-xl bg-white px-4 py-16 md:px-16 md:py-24">
            <div className="mx-auto max-w-[1320px]">
                {/* Header */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-display text-3xl leading-tight font-bold text-black uppercase md:text-4xl lg:text-[56px] lg:leading-[1.2]">
                        Як ми працюємо?
                    </h2>
                    {/* Decorative line */}
                    <div className="h-0.5 w-full bg-gray-600" />
                </div>

                {/* Description */}
                <p className="mt-12 ml-auto max-w-[45ch] font-body text-lg leading-relaxed text-pretty text-black">
                    Ми створили прозору систему інвестування, яка працює для вашого успіху. Збираємо інвестиції, купуємо активи, керуємо процесами, і ви
                    отримуєте прибуток. Кожен крок чітко структурований, щоб забезпечити довіру та максимальну вигоду.
                </p>

                {/* Steps with progress line */}
                <div className="relative mt-16 md:mt-24">
                    {/* Progress line (behind dots) */}
                    <motion.div className="absolute top-[141px] left-0 z-0 hidden h-2 bg-gray-200 lg:block" style={{ width: lineWidth }} aria-hidden />

                    <div className="relative z-10 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                className="flex flex-col items-center gap-3"
                                style={{
                                    opacity: stepTransforms[index].opacity,
                                    y: stepTransforms[index].y,
                                }}
                            >
                                {/* Illustration */}
                                <div className="flex h-[126px] items-end justify-center">
                                    <Image src={step.illustration} alt={step.title} width={140} height={126} className="h-auto max-h-[126px] w-auto" />
                                </div>

                                {/* Dot + Number + Title */}
                                <div className="flex flex-col items-center gap-3">
                                    {/* Blue dot - on the progress line */}
                                    <div className="h-3.5 w-3.5 shrink-0 rounded-[3px] bg-[#2323F4]" />

                                    {/* Number */}
                                    <span className="font-body text-[64px] leading-none font-bold tracking-[-0.04em] text-[#2323F4] md:text-[96px]">
                                        {step.number}
                                    </span>

                                    {/* Title */}
                                    <span className="text-center font-body text-lg leading-snug font-semibold text-black md:text-xl">{step.title}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
