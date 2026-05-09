"use client";

import { ArrowUpRight } from "@untitledui/icons";
import { motion } from "motion/react";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

export type PlanCardData = {
    title: string;
    description: string;
    isActive?: boolean;
    features?: string[];
    disclaimer?: string;
};

type PlanCardProps = PlanCardData;

const PlanCard = ({ title, description, isActive = false, features, disclaimer }: PlanCardProps) => {
    return (
        <div
            className={cx(
                "relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 md:max-w-[424px] md:p-10 lg:w-[424px]",
                isActive ? "min-h-[528px] w-full min-w-0 md:min-h-[579px]" : "min-h-[480px] w-full md:min-h-[528px]",
            )}
            style={{
                background: isActive ? "radial-gradient(circle at 50% 13%, #111325 0%, #42478B 100%)" : "rgba(46, 50, 96, 0.3)",
            }}
        >
            {/* Gradient border */}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    padding: "1px",
                    background: "linear-gradient(180deg, rgba(65,71,136,1) 0%, rgba(17,19,37,1) 100%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                }}
            />

            {/* Top content */}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xl leading-snug font-bold text-white uppercase md:text-2xl md:leading-tight">{title}</h3>
                    <div className="h-px w-full bg-gray-600" />
                </div>

                <p className="font-body text-base leading-snug text-white">{description}</p>

                {features && (
                    <div className="flex flex-col gap-2">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-start gap-2">
                                <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-blue-500" />
                                <span className="font-body text-base leading-normal text-white">{feature}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom content */}
            <div className="mt-8 flex flex-col gap-4">
                {disclaimer && <p className="font-body text-sm leading-snug text-gray-600">{disclaimer}</p>}

                {isActive ? (
                    <Button href="/invest" size="lg" color="primary" className="gradient-border-light w-full !shadow-none !ring-0">
                        Інвестувати
                    </Button>
                ) : (
                    <button
                        disabled
                        className="gradient-border-dark relative flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-black px-10 py-3 font-body text-md font-semibold text-white/40 transition-all"
                    >
                        В розробці
                    </button>
                )}
            </div>
        </div>
    );
};

interface InvestmentPlansSectionProps {
    title: string;
    description?: string;
    plans: PlanCardData[];
    id?: string;
}

export const InvestmentPlansSection = ({ title, description, plans, id = "plans" }: InvestmentPlansSectionProps) => {
    return (
        <section
            id={id}
            className="px-4 py-16 md:px-16 md:py-24"
            style={{
                background: "radial-gradient(circle at 50% 50%, #1E234E 0%, #111325 100%)",
            }}
        >
            <motion.div
                className="mx-auto max-w-[1320px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.1,
                        },
                    },
                }}
            >
                {/* Header */}
                <motion.div
                    className="flex flex-col gap-6"
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="font-display text-3xl leading-tight font-bold text-white uppercase md:text-4xl lg:text-[56px] lg:leading-[1.2]">
                        {title}
                    </h2>
                    {/* Decorative line */}
                    <div className="h-0.5 w-full border-t-2 border-[#463D67]" />
                </motion.div>

                {/* Description */}
                {description && (
                    <motion.p
                        className="mt-12 ml-auto max-w-[39ch] font-body text-lg leading-relaxed text-pretty text-white"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {description}
                    </motion.p>
                )}

                {/* Plan cards */}
                <div className="mt-16 flex flex-col items-center gap-6 lg:flex-row">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <PlanCard {...plan} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
