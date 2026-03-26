"use client";

import { useState } from "react";
import { Plus, X } from "@untitledui/icons";
import { motion } from "motion/react";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const faqItems = [
    {
        question: "Як почати інвестувати на вашій платформі?",
        answer: "Зареєструйтесь у особистому кабінеті та оберіть план, який підходить саме вам! Процес реєстрації займає лише кілька хвилин.",
    },
    {
        question: "Який мінімальний розмір інвестиції?",
        answer: "Мінімальний розмір інвестиції залежить від обраного плану. Деталі ви зможете побачити після реєстрації в особистому кабінеті.",
    },
    {
        question: "Який прибуток я можу отримати?",
        answer: "Середня дохідність інвестицій наших клієнтів за рік складає 15%. Однак результати можуть варіюватися залежно від обраної стратегії.",
    },
    {
        question: "Що робити, якщо я новачок в інвестуванні?",
        answer: "Наша платформа розроблена для інвесторів будь-якого рівня. Ми надаємо підтримку та консультації для початківців.",
    },
    {
        question: "Чи безпечно інвестувати через вашу платформу?",
        answer: "Так, ми використовуємо сучасні технології захисту та дотримуємося всіх норм безпеки для захисту ваших інвестицій.",
    },
];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="overflow-hidden rounded-2xl bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-100"
                aria-expanded={isOpen}
            >
                <span className="font-body text-lg text-black">{question}</span>
                <motion.div
                    className="flex shrink-0 items-center justify-center rounded-2xl bg-gray-200 p-2"
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                    <motion.span
                        key={isOpen ? "open" : "closed"}
                        initial={{ scale: 0.9, opacity: 0, filter: "blur(4px)" }}
                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                        transition={{
                            duration: 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="flex"
                    >
                        {isOpen ? <X className="size-6 text-gray-900" /> : <Plus className="size-6 text-gray-900" />}
                    </motion.span>
                </motion.div>
            </button>
            <div className={cx("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                    <motion.p
                        className="px-6 pt-2 pb-4 font-body text-base leading-relaxed text-gray-800"
                        initial={false}
                        animate={{
                            scale: isOpen ? 1 : 0.97,
                            opacity: isOpen ? 1 : 0,
                            filter: isOpen ? "blur(0px)" : "blur(6px)",
                        }}
                        transition={{
                            scale: { type: "spring", stiffness: 400, damping: 28 },
                            opacity: { duration: 0.25 },
                            filter: { duration: 0.3 },
                        }}
                    >
                        {answer}
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

export const FaqSection = () => {
    return (
        <section id="faq" className="rounded-t-xl bg-[#EAEAF3] px-4 py-16 md:rounded-t-xl md:px-16 md:py-24 lg:py-32">
            <motion.div
                className="mx-auto flex max-w-[1320px] flex-col gap-12 lg:flex-row lg:gap-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Left column */}
                <div className="flex flex-col gap-7 lg:w-[368px] lg:shrink-0">
                    <h2 className="font-display text-3xl leading-tight font-bold text-black uppercase md:text-4xl lg:text-[56px] lg:leading-[1.2]">
                        Поширені запитання
                    </h2>

                    <div className="flex flex-col gap-6">
                        <p className="font-body text-lg leading-relaxed text-black">
                            Не знайшли потрібного запитання?
                            <br />
                            Напишіть його нам
                        </p>

                        <Button
                            href="mailto:project.su.main@gmail.com"
                            size="lg"
                            color="primary"
                            className="gradient-border-dark w-fit !bg-black !text-white !shadow-none !ring-0 hover:!bg-[#1a1c3a]"
                        >
                            Написати
                        </Button>
                    </div>
                </div>

                {/* Right column - FAQ items */}
                <div className="flex flex-1 flex-col gap-4">
                    {faqItems.map((item) => (
                        <FaqItem key={item.question} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
