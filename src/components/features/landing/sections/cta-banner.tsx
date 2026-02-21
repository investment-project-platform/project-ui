"use client";

import { Button } from "@/components/base/buttons/button";
import { motion } from "motion/react";

export const CtaBanner = () => {
    return (
        <section className="px-4 md:px-16">
            <motion.div
                className="mx-auto flex max-w-[1320px] flex-col gap-8 rounded-2xl p-8 md:flex-row md:items-end md:justify-between md:gap-10 md:p-10"
                style={{
                    background: "linear-gradient(90deg, #111325 -3%, #C2B6FF 130%)",
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Text content */}
                <div className="flex flex-col gap-8">
                    <h2 className="font-body text-3xl leading-tight font-semibold text-white md:text-[40px] md:leading-[0.75em]">
                        Готові почати інвестувати?{" "}
                    </h2>
                    <p className="max-w-[496px] font-body text-lg leading-relaxed text-white">
                        Зареєструйтесь у особистому кабінеті та оберіть план, який підходить саме вам!
                    </p>
                </div>

                {/* CTA Button */}
                <Button href="/register" size="lg" color="primary" className="gradient-border-light w-fit shrink-0 !shadow-none !ring-0">
                    Зареєструватись
                </Button>
            </motion.div>
        </section>
    );
};
