"use client";

import { GreetingSection } from "@/components/features/dashboard/sections/greeting-section";
import { ProjectHistorySection } from "@/components/features/dashboard/sections/project-history-section";
import { TransactionHistorySection } from "@/components/features/dashboard/sections/transaction-history-section";
import { FaqSection } from "@/components/features/shared/faq-section";
import { InvestmentPlansSection, type PlanCardData } from "@/components/features/shared/investment-plans-section";

const plans: PlanCardData[] = [
    {
        title: "точкова інвестиція",
        description: "Інвестиції в конкретний актив компанії",
    },
    {
        title: "Загальний портфель",
        description: "Інвестиція в загальний капітал проекту, який складається з наступних активів:",
        isActive: true,
        features: [
            "Інвестиції в криптопроєкти",
            "Торгівля на фючерсах і споті",
            "Використання API забезпечення для автоматичної торгівлі",
            "Стейкінг та депозити на перспективних монетах",
            "Венчурні активи",
        ],
        disclaimer: "* Натискаючи кнопку, ви перейдете на форму для заповнення усіх деталей",
    },
    {
        title: "Часткова інвестиція",
        description: "Інвестиції в певну галузь портфелю компанії",
    },
];
import { LandingFooter } from "@/components/layout/footer";
import { useAuth } from "@/context/auth-context";
import { useDashboard } from "@/context/dashboard-context";

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const { openEditProfile } = useDashboard();

    if (isLoading) {
        return (
            <div className="flex min-h-dvh items-center justify-center bg-black">
                <div className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            </div>
        );
    }

    const fullName = user ? `${user.name} ${user.surname}` : "";

    return (
        <div className="min-h-dvh bg-white">
            <GreetingSection fullName={fullName} onEditProfile={openEditProfile} />
            <ProjectHistorySection />
            <TransactionHistorySection />
            <div className="relative z-10 -mt-6 overflow-hidden rounded-t-xl md:-mt-10">
                <InvestmentPlansSection title="Пропозиції користувача" plans={plans} />
            </div>
            <div className="relative z-20 -mt-6 md:-mt-10">
                <FaqSection />
            </div>
            <div className="relative z-30 -mt-6 md:-mt-10">
                <LandingFooter />
            </div>
        </div>
    );
}
