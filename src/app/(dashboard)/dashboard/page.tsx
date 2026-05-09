"use client";

import { GreetingSection } from "@/components/features/dashboard/sections/greeting-section";
import { ProjectHistorySection } from "@/components/features/dashboard/sections/project-history-section";
import { TransactionHistorySection } from "@/components/features/dashboard/sections/transaction-history-section";
import { FaqSection } from "@/components/features/shared/faq-section";
import { InvestmentPlansSection, type PlanCardData } from "@/components/features/shared/investment-plans-section";
import { LandingFooter } from "@/components/layout/footer";
import { useAuth } from "@/context/auth-context";
import { useDashboard } from "@/context/dashboard-context";

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const { openEditProfile, offers } = useDashboard();

    if (isLoading) {
        return (
            <div className="flex min-h-dvh items-center justify-center bg-black">
                <div className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            </div>
        );
    }

    const fullName = user ? `${user.name} ${user.surname}` : "";

    const plans: PlanCardData[] = offers.map((offer) => ({
        title: offer.title,
        description: offer.content ?? "",
    }));

    return (
        <div className="min-h-dvh bg-white">
            <GreetingSection fullName={fullName} onEditProfile={openEditProfile} />
            <ProjectHistorySection />
            <TransactionHistorySection />
            <div className="relative z-10 -mt-6 overflow-hidden rounded-t-xl md:-mt-10">
                <InvestmentPlansSection id="proposals" title="Пропозиції користувача" plans={plans} />
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
