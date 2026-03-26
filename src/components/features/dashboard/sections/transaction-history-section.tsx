"use client";

import { Briefcase01, Calendar, ChevronDown, CoinsStacked01, File06 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

const transactionData = [
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "06.02.2024", amount: "$150" },
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "05.02.2024", amount: "$150" },
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "04.02.2024", amount: "$150" },
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "02.02.2024", amount: "$150" },
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "01.02.2024", amount: "$150" },
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "27.01.2024", amount: "-$150" },
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "25.01.2024", amount: "$150" },
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "25.01.2024", amount: "$150" },
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "24.01.2024", amount: "$150" },
    { name: "Зняття дивідендів", plan: "Загальний капітал", date: "23.01.2024", amount: "$150" },
];

export const TransactionHistorySection = () => {
    return (
        <section id="transactions" className="bg-white px-4 pt-12 md:px-8 lg:pt-16 pb-16 md:pb-24">
            <div className="mx-auto max-w-[1400px]">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-display text-2xl font-bold text-black uppercase md:text-3xl lg:text-[36px]">Історія транзакцій</h2>
                    <button type="button" className="flex w-fit cursor-pointer items-center gap-2 rounded-full bg-black px-5 py-2.5">
                        <span className="font-body text-sm font-medium text-white">Лютий 2025 р.</span>
                        <ChevronDown className="size-4 text-white/70" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-0 pb-3 text-left">
                                    <button type="button" className="flex cursor-pointer items-center gap-1.5">
                                        <File06 className="size-4 text-purple-600" />
                                        <span className="font-body text-md font-semibold text-purple-600">Назва</span>
                                        <ChevronDown className="size-3.5 text-purple-600/60" />
                                    </button>
                                </th>
                                <th className="px-0 pb-3 text-left">
                                    <button type="button" className="flex cursor-pointer items-center gap-1.5">
                                        <Briefcase01 className="size-4 text-purple-600" />
                                        <span className="font-body text-md font-semibold text-purple-600">План</span>
                                        <ChevronDown className="size-3.5 text-purple-600/60" />
                                    </button>
                                </th>
                                <th className="w-40 px-0 pb-3 text-left">
                                    <button type="button" className="flex cursor-pointer items-center gap-1.5">
                                        <Calendar className="size-4 text-purple-600" />
                                        <span className="font-body text-md font-semibold text-purple-600">Дата</span>
                                        <ChevronDown className="size-3.5 text-purple-600/60" />
                                    </button>
                                </th>
                                <th className="w-28 px-0 pb-3 text-left">
                                    <button type="button" className="flex cursor-pointer items-center gap-1.5">
                                        <CoinsStacked01 className="size-4 text-purple-600" />
                                        <span className="font-body text-md font-semibold text-purple-600">Сума</span>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionData.map((tx, i) => (
                                <tr key={i} className="border-b border-gray-100">
                                    <td className="py-4 pr-4 font-body text-md text-black">{tx.name}</td>
                                    <td className="py-4 pr-4 font-body text-md font-semibold text-black">{tx.plan}</td>
                                    <td className="w-40 py-4 pr-4 font-body text-md text-black">{tx.date}</td>
                                    <td className="w-28 py-4 pr-4 text-right font-body text-md text-black">{tx.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button size="lg" color="primary" className="gradient-border-dark !bg-black !text-white !ring-0">
                        Переглянути більше
                    </Button>
                </div>
            </div>
        </section>
    );
};
