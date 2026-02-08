"use client";

import { useState } from "react";
import { ChevronDown } from "@untitledui/icons";
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
                <div
                    className={cx(
                        "flex shrink-0 items-center justify-center rounded-2xl bg-gray-200 p-2 transition-transform duration-300 ease-in-out",
                        isOpen && "rotate-180",
                    )}
                >
                    <ChevronDown className="size-6 text-gray-900" />
                </div>
            </button>
            <div className={cx("grid transition-all duration-300 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                    <p className="px-6 pt-2 pb-4 font-body text-base leading-relaxed text-gray-800">{answer}</p>
                </div>
            </div>
        </div>
    );
};

export const FaqSection = () => {
    return (
        <section id="faq" className="rounded-t-xl bg-[#EAEAF3] px-4 py-16 md:rounded-t-xl md:px-16 md:py-24 lg:py-32">
            <div className="mx-auto flex max-w-[1320px] flex-col gap-12 lg:flex-row lg:gap-20">
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
            </div>
        </section>
    );
};
