import { Plus } from "@untitledui/icons";
import Image from "next/image";

const formulaCards = [
    {
        icon: "/assets/images/landing/coins.svg",
        title: "Пропорційний прибуток відносно вкладення",
    },
    {
        icon: "/assets/images/landing/capitalization.svg",
        title: "Відсоток за менеджмент підприємства",
    },
    {
        icon: "/assets/images/landing/income.svg",
        title: "Дохід",
    },
];

const PlusIcon = () => <Plus className="size-8 shrink-0 text-black" strokeWidth={2.5} />;

const EqualsIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M6 12H26M6 20H26" stroke="#111325" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ProfitFormulaSection = () => {
    return (
        <section className="bg-white px-4 py-16 md:px-16 md:py-24">
            <div className="mx-auto max-w-[1320px]">
                {/* Header */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-display text-3xl leading-tight font-bold text-black uppercase md:text-4xl lg:text-[56px] lg:leading-[1.2]">
                        Наша формула прибутку
                    </h2>
                    {/* Decorative line */}
                    <div className="h-0.5 w-full bg-gray-600" />
                </div>

                {/* Description */}
                <p className="mt-12 ml-auto max-w-[45ch] font-body text-lg leading-relaxed text-pretty text-black md:ml-auto">
                    Ми створили прозору систему інвестування, яка працює для вашого успіху. Збираємо інвестиції, купуємо активи, керуємо процесами, і ви
                    отримуєте прибуток. Кожен крок чітко структурований, щоб забезпечити довіру та максимальну вигоду.
                </p>

                {/* Formula cards */}
                <div className="mt-12 rounded-2xl bg-gray-400 p-4 md:p-6">
                    <div className="flex flex-col items-center gap-4 md:flex-row md:items-stretch md:gap-0">
                        {formulaCards.map((card, index) => (
                            <div key={card.title} className="flex w-full flex-col items-center gap-4 md:flex-row">
                                {/* Card */}
                                <div className="flex h-full w-full justify-center flex-col items-center gap-4 rounded-lg bg-white p-6 md:flex-1">
                                    <Image src={card.icon} alt="" width={120} height={120} className="h-20 w-auto md:h-24" />
                                    <p className="text-center font-body text-lg leading-snug font-semibold text-black md:text-xl">{card.title}</p>
                                </div>

                                {/* Operator between cards */}
                                {index < formulaCards.length - 1 && (
                                    <div className="flex shrink-0 items-center justify-center px-3 py-2 md:px-4">
                                        {index === 0 ? <PlusIcon /> : <EqualsIcon />}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
