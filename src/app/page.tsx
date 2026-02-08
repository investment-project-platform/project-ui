import { LandingHeader } from "@/components/layout/header";
import { LandingFooter } from "@/components/layout/footer";
import { HeroSection } from "@/components/features/landing/sections/hero-section";
import { HowWeWorkSection } from "@/components/features/landing/sections/how-we-work-section";
import { ProfitFormulaSection } from "@/components/features/landing/sections/profit-formula-section";
import { CtaBanner } from "@/components/features/landing/sections/cta-banner";
import { InvestmentPlansSection } from "@/components/features/landing/sections/investment-plans-section";
import { StatisticsSection } from "@/components/features/landing/sections/statistics-section";
import { FaqSection } from "@/components/features/landing/sections/faq-section";

export default function HomePage() {
    return (
        <div className="min-h-dvh bg-black">
            <LandingHeader />

            <main>
                {/* Hero - fills the entire viewport */}
                <HeroSection />

                {/* White content card floating over dark bg, small overlap into hero bottom */}
                <div className="relative z-10 -mt-6 rounded-xl bg-white md:-mt-10 md:rounded-xl">
                    <HowWeWorkSection />
                    <ProfitFormulaSection />
                </div>

                {/* CTA Banner - dark page bg continues naturally, no overlay needed */}
                <div className="py-16 md:py-24">
                    <CtaBanner />
                </div>

                {/* Dark sections on page bg */}
                <InvestmentPlansSection />
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
