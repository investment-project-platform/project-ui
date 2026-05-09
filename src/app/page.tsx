import { Suspense } from "react";
import { LandingHeader } from "@/components/layout/header";
import { LandingFooter } from "@/components/layout/footer";
import { HeroSection } from "@/components/features/landing/sections/hero-section";
import { HowWeWorkSection } from "@/components/features/landing/sections/how-we-work-section";
import { ProfitFormulaSection } from "@/components/features/landing/sections/profit-formula-section";
import { CtaBanner } from "@/components/features/landing/sections/cta-banner";
import { InvestmentPlansSection, type PlanCardData } from "@/components/features/shared/investment-plans-section";
import { ScrollToSection } from "@/components/features/landing/scroll-to-section";

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
import { StatisticsSection } from "@/components/features/landing/sections/statistics-section";
import { FaqSection } from "@/components/features/shared/faq-section";

export default function HomePage() {
    return (
        <div className="min-h-dvh bg-black">
            <LandingHeader />
            <Suspense>
                <ScrollToSection />
            </Suspense>

            <main>
                {/* Hero - fills the entire viewport */}
                <HeroSection />

                {/* White content card floating over dark bg, small overlap into hero bottom */}
                <div className="relative z-10 -mt-6 overflow-hidden rounded-xl bg-white md:-mt-10 md:rounded-xl">
                    <HowWeWorkSection />
                    <ProfitFormulaSection />
                </div>

                {/* CTA Banner - dark page bg continues naturally, no overlay needed */}
                <div className="py-16 md:py-24">
                    <CtaBanner />
                </div>

                {/* Dark sections on page bg */}
                <InvestmentPlansSection
                    title="Оберіть інвестицію"
                    description="На даний момент доступний один інвестиційний план, але ми не зупиняємося! Уже зовсім скоро ви зможете обирати серед ще двох нових можливостей для інвестування. Стежте за оновленнями!"
                    plans={plans}
                />
                <StatisticsSection />

                {/* FAQ - light card with rounded top over dark bg */}
                <FaqSection />
            </main>

            {/* Footer overlaps FAQ bottom padding */}
            <div className="relative z-20 -mt-6 md:-mt-10">
                <LandingFooter />
            </div>
        </div>
    );
}
