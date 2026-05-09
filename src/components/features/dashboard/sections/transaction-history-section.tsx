"use client";

import { Briefcase01, Calendar, ChevronDown, CoinsStacked01, File06 } from "@untitledui/icons";
import { formatMoney, formatDate, TRANSACTION_TYPE_LABELS } from "@projectua/project-core";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import type { BadgeColors } from "@/components/base/badges/badge-types";
import { Button } from "@/components/base/buttons/button";
import { useDashboard } from "@/context/dashboard-context";

const PAYMENT_METHOD_MAP: Record<string, { label: string; color: BadgeColors }> = {
    bank_transfer:  { label: "Банківський переказ", color: "blue" },
    card:           { label: "Картка",              color: "gray-blue" },
    credit_card:    { label: "Кредитна картка",     color: "gray-blue" },
    debit_card:     { label: "Дебетова картка",     color: "gray-blue" },
    crypto:         { label: "Криптовалюта",        color: "purple" },
    cash:           { label: "Готівка",             color: "success" },
    wire_transfer:  { label: "Міжнародний переказ", color: "indigo" },
};

function PaymentMethodCell({ method }: { method: string | null | undefined }) {
    if (!method) {
        return <Badge color="gray" size="md" className="!ring-gray-400 !text-gray-700 !bg-gray-100">Не вказано</Badge>;
    }
    const mapped = PAYMENT_METHOD_MAP[method.toLowerCase()];
    if (mapped) {
        return <BadgeWithDot color={mapped.color} size="md">{mapped.label}</BadgeWithDot>;
    }
    return <Badge color="gray" size="md">{method}</Badge>;
}

export const TransactionHistorySection = () => {
    const {
        transactions,
        transactionsLoading,

        hasMoreTransactions,
        loadMoreTransactions,
        loadingMore,
    } = useDashboard();

    return (
        <section id="transactions" className="bg-white px-4 pt-12 md:px-8 lg:pt-16 pb-16 md:pb-24">
            <div className="mx-auto max-w-[1400px]">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-display text-2xl font-bold text-black uppercase md:text-3xl lg:text-[36px]">Історія транзакцій</h2>
                    <button type="button" className="flex w-fit cursor-pointer items-center gap-2 rounded-full bg-black px-5 py-2.5">
                        <span className="font-body text-sm font-medium text-white">Всі транзакції</span>
                        <ChevronDown className="size-4 text-white/70" />
                    </button>
                </div>

                {transactionsLoading && (
                    <div className="animate-pulse overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    {[...Array(4)].map((_, i) => (
                                        <th key={i} className={`px-0 pb-3 text-left${i === 2 ? " w-40" : i === 3 ? " w-28" : ""}`}>
                                            <div className="h-5 w-20 rounded bg-gray-200" />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(7)].map((_, row) => (
                                    <tr key={row} className="border-b border-gray-100">
                                        <td className="py-4 pr-4"><div className="h-4 w-36 rounded bg-gray-200" /></td>
                                        <td className="py-4 pr-4"><div className="h-4 w-24 rounded bg-gray-200" /></td>
                                        <td className="w-40 py-4 pr-4"><div className="h-4 w-24 rounded bg-gray-200" /></td>
                                        <td className="w-28 py-4 pr-4 text-right"><div className="ml-auto h-4 w-16 rounded bg-gray-200" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!transactionsLoading && transactions.length === 0 && (
                    <p className="py-8 text-center font-body text-md">Немає транзакцій</p>
                )}

                {!transactionsLoading && transactions.length > 0 && (
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
                                            <span className="font-body text-md font-semibold text-purple-600">Метод</span>
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
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="border-b border-gray-100">
                                        <td className="py-4 pr-4 font-body text-md text-black">{TRANSACTION_TYPE_LABELS[tx.type]}</td>
                                        <td className="py-4 pr-4"><PaymentMethodCell method={tx.paymentMethod} /></td>
                                        <td className="w-40 py-4 pr-4 font-body text-md text-black">{formatDate(tx.createdAt)}</td>
                                        <td className="w-28 py-4 pr-4 text-right font-body text-md text-black">{formatMoney(tx.amount, { currency: "USD" })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {hasMoreTransactions && (
                    <div className="mt-8 flex justify-center">
                        <Button
                            size="lg"
                            color="primary"
                            className="gradient-border-dark !bg-black !text-white !ring-0"
                            onClick={loadMoreTransactions}
                            isLoading={loadingMore}
                        >
                            Переглянути більше
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};
