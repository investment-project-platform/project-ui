"use client";

import type { ReactNode, Ref } from "react";
import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import { cx } from "@/utils/cx";

export interface CheckboxBaseProps {
    size?: "sm" | "md";
    /**
     * Visual variant for different backgrounds.
     * @default "light"
     */
    variant?: "light" | "dark";
    className?: string;
    isFocusVisible?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isIndeterminate?: boolean;
}

export const CheckboxBase = ({
    className,
    isSelected,
    isDisabled,
    isIndeterminate,
    size = "sm",
    variant = "light",
    isFocusVisible = false,
}: CheckboxBaseProps) => {
    const isDark = variant === "dark";

    return (
        <div
            data-variant={variant}
            className={cx(
                "relative flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-xs ring-1 ring-inset",
                size === "md" && "size-5 rounded-md",
                // Light variant
                !isDark && "bg-white ring-gray-300",
                !isDark && (isSelected || isIndeterminate) && "bg-brand-600 ring-brand-600",
                // Dark variant
                isDark && "bg-[rgb(252_252_252_/_0.1)] ring-white",
                isDark && (isSelected || isIndeterminate) && "bg-brand-600 ring-brand-600",
                // Disabled state
                isDisabled && !isDark && "cursor-not-allowed bg-gray-50 ring-gray-300",
                isDisabled && isDark && "cursor-not-allowed bg-gray-800 ring-gray-700",
                isFocusVisible && "outline-2 outline-offset-2 outline-brand-500",
                className,
            )}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 14 14"
                fill="none"
                className={cx(
                    "pointer-events-none absolute h-3 w-2.5 text-fg-white opacity-0 transition-inherit-all",
                    size === "md" && "size-3.5",
                    isIndeterminate && "opacity-100",
                    isDisabled && "text-fg-disabled_subtle",
                )}
            >
                <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <svg
                aria-hidden="true"
                viewBox="0 0 14 14"
                fill="none"
                className={cx(
                    "pointer-events-none absolute size-3 text-fg-white opacity-0 transition-inherit-all",
                    size === "md" && "size-3.5",
                    isSelected && !isIndeterminate && "opacity-100",
                    isDisabled && "text-fg-disabled_subtle",
                )}
            >
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};
CheckboxBase.displayName = "CheckboxBase";

interface CheckboxProps extends AriaCheckboxProps {
    ref?: Ref<HTMLLabelElement>;
    size?: "sm" | "md";
    /**
     * Visual variant for different backgrounds.
     * @default "light"
     */
    variant?: "light" | "dark";
    label?: ReactNode;
    hint?: ReactNode;
}

export const Checkbox = ({ label, hint, size = "sm", variant = "light", className, ...ariaCheckboxProps }: CheckboxProps) => {
    const isDark = variant === "dark";

    const sizes = {
        sm: {
            root: "gap-2",
            textWrapper: "",
            label: "text-sm font-medium",
            hint: "text-sm",
        },
        md: {
            root: "gap-3",
            textWrapper: "gap-0.5",
            label: "text-md font-medium",
            hint: "text-md",
        },
    };

    return (
        <AriaCheckbox
            {...ariaCheckboxProps}
            className={(state) =>
                cx(
                    "flex items-start",
                    state.isDisabled && "cursor-not-allowed",
                    sizes[size].root,
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isSelected, isIndeterminate, isDisabled, isFocusVisible }) => (
                <>
                    <CheckboxBase
                        size={size}
                        variant={variant}
                        isSelected={isSelected}
                        isIndeterminate={isIndeterminate}
                        isDisabled={isDisabled}
                        isFocusVisible={isFocusVisible}
                        className={label || hint ? "mt-0.5" : ""}
                    />
                    {(label || hint) && (
                        <div className={cx("inline-flex flex-col", sizes[size].textWrapper)}>
                            {label && <p className={cx("select-none", !isDark && "text-gray-900", isDark && "text-white", sizes[size].label)}>{label}</p>}
                            {hint && (
                                <span
                                    className={cx(!isDark && "text-gray-700", isDark && "text-gray-500", sizes[size].hint)}
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    {hint}
                                </span>
                            )}
                        </div>
                    )}
                </>
            )}
        </AriaCheckbox>
    );
};
Checkbox.displayName = "Checkbox";
