"use client";

import type { FC, ReactNode, Ref, RefAttributes } from "react";
import { createContext, isValidElement } from "react";
import { ChevronDown } from "@untitledui/icons";
import type { SelectProps as AriaSelectProps } from "react-aria-components";
import { Button as AriaButton, ListBox as AriaListBox, Select as AriaSelect, SelectValue as AriaSelectValue } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";
import { ComboBox } from "./combobox";
import { Popover } from "./popover";
import { SelectItem } from "./select-item";

export type SelectItemType = {
    id: string;
    label?: string;
    avatarUrl?: string;
    isDisabled?: boolean;
    supportingText?: string;
    icon?: FC | ReactNode;
};

export interface CommonProps {
    hint?: string;
    label?: string;
    tooltip?: string;
    size?: "sm" | "md";
    /**
     * Visual variant for different backgrounds.
     * @default "light"
     */
    variant?: "light" | "dark";
    placeholder?: string;
}

interface SelectProps extends Omit<AriaSelectProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement>, CommonProps {
    items?: SelectItemType[];
    popoverClassName?: string;
    placeholderIcon?: FC | ReactNode;
    children: ReactNode | ((item: SelectItemType) => ReactNode);
}

interface SelectValueProps {
    isOpen: boolean;
    size: "sm" | "md";
    variant: "light" | "dark";
    isFocused: boolean;
    isDisabled: boolean;
    placeholder?: string;
    ref?: Ref<HTMLButtonElement>;
    placeholderIcon?: FC | ReactNode;
}

export const sizes = {
    sm: { root: "py-2 px-3", shortcut: "pr-2.5" },
    md: { root: "py-2.5 px-3.5", shortcut: "pr-3" },
};

const SelectValue = ({ isOpen, isFocused, isDisabled, size, variant, placeholder, placeholderIcon, ref }: SelectValueProps) => {
    const isDark = variant === "dark";

    return (
        <AriaButton
            ref={ref}
            data-variant={variant}
            className={cx(
                "relative flex w-full cursor-pointer items-center rounded-sm outline-hidden transition duration-100 ease-linear",
                // Light variant
                !isDark && "bg-white shadow-xs ring-1 ring-gray-300 ring-inset",
                !isDark && (isFocused || isOpen) && "ring-2 ring-brand-500",
                // Dark variant
                isDark && "bg-[rgb(252_252_252_/_0.1)] ring-[1.5px] ring-brand-900 ring-inset",
                isDark && (isFocused || isOpen) && "ring-2 ring-brand-700",
                // Disabled
                isDisabled && !isDark && "cursor-not-allowed bg-gray-50 text-gray-500",
                isDisabled && isDark && "cursor-not-allowed bg-gray-800 text-gray-500",
            )}
        >
            <AriaSelectValue<SelectItemType>
                className={cx(
                    "flex h-max w-full items-center justify-start gap-2 truncate text-left align-middle",

                    // Icon styles
                    "*:data-icon:size-5 *:data-icon:shrink-0 in-disabled:*:data-icon:text-fg-disabled",
                    !isDark && "*:data-icon:text-gray-700",
                    isDark && "*:data-icon:text-gray-500",

                    sizes[size].root,
                )}
            >
                {(state) => {
                    const Icon = state.selectedItem?.icon || placeholderIcon;
                    return (
                        <>
                            {state.selectedItem?.avatarUrl ? (
                                <Avatar size="xs" src={state.selectedItem.avatarUrl} alt={state.selectedItem.label} />
                            ) : isReactComponent(Icon) ? (
                                <Icon data-icon aria-hidden="true" />
                            ) : isValidElement(Icon) ? (
                                Icon
                            ) : null}

                            {state.selectedItem ? (
                                <section className="flex w-full gap-2 truncate">
                                    <p className={cx("truncate text-md font-medium", !isDark && "text-gray-900", isDark && "text-white")}>
                                        {state.selectedItem?.label}
                                    </p>
                                    {state.selectedItem?.supportingText && (
                                        <p className={cx("text-md", !isDark && "text-gray-700", isDark && "text-gray-500")}>
                                            {state.selectedItem?.supportingText}
                                        </p>
                                    )}
                                </section>
                            ) : (
                                <p className={cx("text-md", !isDark && "text-gray-700", isDark && "text-gray-500", isDisabled && "text-disabled")}>
                                    {placeholder}
                                </p>
                            )}

                            <ChevronDown
                                aria-hidden="true"
                                className={cx(
                                    "ml-auto shrink-0",
                                    !isDark && "text-gray-700",
                                    isDark && "text-gray-500",
                                    size === "sm" ? "size-4 stroke-[2.5px]" : "size-5",
                                )}
                            />
                        </>
                    );
                }}
            </AriaSelectValue>
        </AriaButton>
    );
};

export const SelectContext = createContext<{ size: "sm" | "md"; variant?: "light" | "dark" }>({ size: "sm", variant: "light" });

const Select = ({
    placeholder = "Select",
    placeholderIcon,
    size = "sm",
    variant = "light",
    children,
    items,
    label,
    hint,
    tooltip,
    className,
    ...rest
}: SelectProps) => {
    return (
        <SelectContext.Provider value={{ size, variant }}>
            <AriaSelect {...rest} className={(state) => cx("flex flex-col gap-1.5", typeof className === "function" ? className(state) : className)}>
                {(state) => (
                    <>
                        {label && (
                            <Label isRequired={state.isRequired} tooltip={tooltip} variant={variant}>
                                {label}
                            </Label>
                        )}

                        <SelectValue {...state} {...{ size, variant, placeholder }} placeholderIcon={placeholderIcon} />

                        <Popover size={size} className={rest.popoverClassName}>
                            <AriaListBox items={items} className="size-full outline-hidden">
                                {children}
                            </AriaListBox>
                        </Popover>

                        {hint && (
                            <HintText isInvalid={state.isInvalid} variant={variant}>
                                {hint}
                            </HintText>
                        )}
                    </>
                )}
            </AriaSelect>
        </SelectContext.Provider>
    );
};

const _Select = Select as typeof Select & {
    ComboBox: typeof ComboBox;
    Item: typeof SelectItem;
};
_Select.ComboBox = ComboBox;
_Select.Item = SelectItem;

export { _Select as Select };
