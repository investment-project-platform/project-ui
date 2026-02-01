"use client";

import type { ReactNode, Ref } from "react";
import { HelpCircle } from "@untitledui/icons";
import type { LabelProps as AriaLabelProps } from "react-aria-components";
import { Label as AriaLabel } from "react-aria-components";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";

interface LabelProps extends AriaLabelProps {
    children: ReactNode;
    isRequired?: boolean;
    tooltip?: string;
    tooltipDescription?: string;
    /**
     * Visual variant for different backgrounds.
     * @default "light"
     */
    variant?: "light" | "dark";
    ref?: Ref<HTMLLabelElement>;
}

export const Label = ({ isRequired, tooltip, tooltipDescription, variant = "light", className, ...props }: LabelProps) => {
    const isDark = variant === "dark";

    return (
        <AriaLabel
            // Used for conditionally hiding/showing the label element via CSS:
            // <Input label="Visible only on mobile" className="lg:**:data-label:hidden" />
            // or
            // <Input label="Visible only on mobile" className="lg:label:hidden" />
            data-label="true"
            data-variant={variant}
            {...props}
            className={cx("flex cursor-default items-center gap-0.5 text-sm font-medium", !isDark && "text-gray-900", isDark && "text-gray-300", className)}
        >
            {props.children}

            <span className={cx("hidden text-brand-tertiary", isRequired && "block", typeof isRequired === "undefined" && "group-required:block")}>*</span>

            {tooltip && (
                <Tooltip title={tooltip} description={tooltipDescription} placement="top">
                    <TooltipTrigger
                        // `TooltipTrigger` inherits the disabled state from the parent form field
                        // but we don't that. We want the tooltip be enabled even if the parent
                        // field is disabled.
                        isDisabled={false}
                        className={cx(
                            "cursor-pointer transition duration-200",
                            !isDark && "text-gray-700 hover:text-gray-900 focus:text-gray-900",
                            isDark && "text-gray-500 hover:text-gray-400 focus:text-gray-400",
                        )}
                    >
                        <HelpCircle className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}
        </AriaLabel>
    );
};

Label.displayName = "Label";
