"use client";

import { LineChartUp01, PieChart01, UserEdit, Wallet03 } from "@untitledui/icons";
import { StatCard } from "@/components/features/dashboard/stat-card";

interface GreetingSectionProps {
    fullName: string;
    onEditProfile: () => void;
}

export const GreetingSection = ({ fullName, onEditProfile }: GreetingSectionProps) => {
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
                        <p className="font-body text-lg leading-relaxed text-gray-cool-300">
                            Наступне оновлення даних: <br />
                            <span className="text-purple-500">02 березня 2025</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <StatCard label="Мої вкладення:" value="$1,000" change="10% з попереднього кварталу" icon={Wallet03} />
                        <StatCard label="Мої вкладення:" value="$1,000" change="10% з попереднього кварталу" icon={LineChartUp01} />
                        <StatCard label="Мої вкладення:" value="15%" icon={PieChart01} />
                    </div>
                </div>
            </div>
        </div>
    );
};
