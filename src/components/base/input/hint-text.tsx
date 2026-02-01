"use client";

import type { ReactNode, Ref } from "react";
import type { TextProps as AriaTextProps } from "react-aria-components";
import { Text as AriaText } from "react-aria-components";
import { cx } from "@/utils/cx";

interface HintTextProps extends AriaTextProps {
    /** Indicates that the hint text is an error message. */
    isInvalid?: boolean;
    /**
     * Visual variant for different backgrounds.
     * @default "light"
     */
    variant?: "light" | "dark";
    ref?: Ref<HTMLElement>;
    children: ReactNode;
}

export const HintText = ({ isInvalid, variant = "light", className, ...props }: HintTextProps) => {
    const isDark = variant === "dark";

    return (
        <AriaText
            {...props}
            slot={isInvalid ? "errorMessage" : "description"}
            data-variant={variant}
            className={cx(
                "text-sm",
                !isDark && "text-gray-700",
                isDark && "text-gray-500",

                // Invalid state
                isInvalid && "text-error-primary",
                "group-invalid:text-error-primary",

                className,
            )}
        />
    );
};

HintText.displayName = "HintText";
