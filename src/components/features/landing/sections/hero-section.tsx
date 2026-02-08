import Image from "next/image";
import { Button } from "@/components/base/buttons/button";

export const HeroSection = () => {
    return (
        <section className="relative">
            {/* Hero background */}
            <div className="relative min-h-[calc(100dvh+3rem)] w-full overflow-hidden">
                {/* Image fallback (visible when video fails or does not autoplay) */}
                <Image src="/assets/images/landing/hero-background.webp" alt="" fill priority className="object-cover" sizes="100vw" aria-hidden />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/images/landing/hero-background.webp"
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-hidden
                >
                    <source src="/assets/images/landing/hero-background.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/16" />

                {/* Hero content on the image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
                    <div className="flex max-w-[1096px] flex-col items-center gap-8 text-center md:gap-12">
                        <h1
                            className="max-w-[26ch] font-display text-3xl leading-tight font-extrabold text-pretty text-white uppercase md:text-4xl lg:text-[56px] lg:leading-[1.2]"
                            style={{ textShadow: "0px 4px 19.5px rgba(0, 0, 0, 0.25)" }}
                        >
                            Забезпечуємо можливість доступних інвестицій <span className="text-brand-200">для кожного</span>
                        </h1>

                        <Button href="#plans" size="lg" color="primary" className="gradient-border-light !shadow-none !ring-0">
                            Перейти до планів
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
