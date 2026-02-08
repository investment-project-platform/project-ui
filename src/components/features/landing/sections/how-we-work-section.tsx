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
    return (
        <section id="about" className="bg-white px-4 py-16 md:px-16 md:py-24 rounded-t-xl">
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

                {/* Steps */}
                <div className="mt-16 grid grid-cols-2 gap-6 md:mt-24 lg:grid-cols-4 lg:gap-6">
                    {steps.map((step) => (
                        <div key={step.number} className="flex flex-col items-center gap-3">
                            {/* Illustration */}
                            <div className="flex h-[126px] items-end justify-center">
                                <Image src={step.illustration} alt={step.title} width={140} height={126} className="h-auto max-h-[126px] w-auto" />
                            </div>

                            {/* Dot + Number + Title */}
                            <div className="flex flex-col items-center gap-3">
                                {/* Blue dot */}
                                <div className="h-3.5 w-3.5 rounded-sm bg-[#2323F4]" />

                                {/* Number */}
                                <span className="font-body text-[64px] leading-none font-bold tracking-[-0.04em] text-[#2323F4] md:text-[96px]">
                                    {step.number}
                                </span>

                                {/* Title */}
                                <span className="text-center font-body text-lg leading-snug font-semibold text-black md:text-xl">{step.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
