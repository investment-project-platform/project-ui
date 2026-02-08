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

export const StatisticsSection = () => {
    return (
        <section id="projects" className="bg-black px-4 py-16 md:px-16 md:py-24">
            <div className="mx-auto max-w-[1320px]">
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
                        <div key={stat.badge} className="contents">
                            {/* Stat item */}
                            <div className="flex flex-col items-center gap-5 lg:w-[312px]">
                                {/* Badge */}
                                <span className="inline-flex items-center justify-center rounded-2xl bg-[#98C6EE] px-6 py-2 font-body text-sm text-black">
                                    {stat.badge}
                                </span>

                                {/* Large number */}
                                <span className="font-mono text-6xl font-semibold leading-none text-white md:text-[80px] lg:text-[118px]">
                                    {stat.value}
                                </span>

                                {/* Description */}
                                <p className="px-4 text-center font-body text-base leading-normal text-gray-600 md:px-8">{stat.description}</p>
                            </div>

                            {/* Vertical divider (not after last item) */}
                            {index < stats.length - 1 && <GradientDivider />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
