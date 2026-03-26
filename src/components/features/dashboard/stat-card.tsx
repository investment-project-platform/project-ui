import type { FC } from "react";
import { ArrowUpRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface StatCardProps {
    label: string;
    value: string;
    change?: string;
    icon?: FC<{ className?: string }>;
    className?: string;
}

export const StatCard = ({ label, value, change, icon: Icon, className }: StatCardProps) => {
    return (
        <div
            className={cx(
                "flex w-[248px] flex-col gap-6 rounded-xl bg-white px-8 py-7",
                className,
            )}
        >
            <div className="flex items-center gap-2">
                {Icon && (<div className="flex size-8 items-center justify-center rounded-full bg-gray-400">
                    <Icon className="size-5 shrink-0 text-black" />
                    </div>
                )}
                <span className="font-body text-lg text-black">{label}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="font-display text-[56px] font-semibold leading-none text-black">{value}</span>
                {change && (
                    <div className="flex items-start">
                        <ArrowUpRight className="size-5 shrink-0 text-green-700" />
                        <p className="font-body text-sm leading-snug text-black">
                            <span className="text-green-700">{change.split(" ")[0]}</span>{" "}
                            {change.split(" ").slice(1).join(" ")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
