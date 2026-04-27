"use client";

import { LineChartUp01, PieChart01, UserEdit, Wallet03 } from "@untitledui/icons";
import { formatMoney } from "@projectua/project-core";
import { StatCard } from "@/components/features/dashboard/stat-card";
import { useDashboard } from "@/context/dashboard-context";

interface GreetingSectionProps {
    fullName: string;
    onEditProfile: () => void;
}

export const GreetingSection = ({ fullName, onEditProfile }: GreetingSectionProps) => {
    const { stats, statsLoading } = useDashboard();

    const fmt = (value: number) => formatMoney(value, { currency: "USD" }).replace(/\.\d{2}$/, "");

    return (
        <div
            className="overflow-hidden rounded-b-xl pt-28 pb-10 md:pt-32 px-4 md:px-8"
            style={{ background: "linear-gradient(180deg, #0a0b1a 0%, #111325 40%, #1a1040 100%)" }}
        >
            <div className="mx-auto max-w-[1400px]">
                {/* Greeting */}
                <div className="mb-16 flex items-center justify-between border-b-2 border-[#463D67] pb-7">
                    <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-[48px] lg:leading-[1.2]">
                        <span className="text-brand-500">Вітаю!</span> {fullName}
                    </h1>
                    <button
                        type="button"
                        onClick={onEditProfile}
                        className="cursor-pointer items-center justify-center rounded-md bg-white p-2 transition-colors hover:bg-gray-600"
                        aria-label="Редагувати профіль"
                    >
                        <UserEdit className="size-6 text-black" />
                    </button>
                </div>

                {/* Stats section */}
                <div
                    className="flex flex-col justify-between rounded-xl border gap-6 border-gray-blue-700 p-8 lg:flex-row md:px-[51px] md:py-[54px]"
                    style={{ backgroundImage: "linear-gradient(180deg, var(--color-black) 4.91%, var(--color-gray-blue-600) 128.36%)" }}
                >
                    <div className="shrink-0 md:w-[378px]">
                        <h2 className="mb-6 font-display text-display-sm leading-[1.1] font-bold text-white md:text-display-md">Загальні дані проєктів:</h2>
                    </div>
                    {statsLoading ? (
                        <div className="flex flex-wrap gap-4">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="flex w-[260px] animate-pulse flex-col gap-6 rounded-xl bg-white px-8 py-7">
                                    <div className="flex items-center gap-2">
                                        <div className="size-8 rounded-full bg-gray-200" />
                                        <div className="h-5 w-24 rounded bg-gray-200" />
                                    </div>
                                    <div className="h-12 w-32 rounded bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            <StatCard label="Мої вкладення:" value={stats ? fmt(stats.totalInvested) : "—"} icon={Wallet03} />
                            <StatCard label="Капіталізація:" value={stats ? fmt(stats.capitalization) : "—"} icon={LineChartUp01} />
                            <StatCard label="Дивіденди:" value={stats ? fmt(stats.totalDividends) : "—"} icon={PieChart01} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
