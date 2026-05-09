"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function ScrollToSection() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const section = searchParams.get("section");

    useEffect(() => {
        if (!section) return;
        router.replace("/", { scroll: false });
        requestAnimationFrame(() => {
            document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
        });
    }, [section, router]);

    return null;
}
