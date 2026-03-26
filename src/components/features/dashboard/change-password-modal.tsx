"use client";

import { useMemo, useState } from "react";
import { Check, Eye, EyeOff, Lock01, XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { useAuth } from "@/context/auth-context";
import { cx } from "@/utils/cx";

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const passwordRules = [
    { id: "uppercase", label: "Включати принаймні одну велику літеру (A-Z)", test: (pw: string) => /[A-Z]/.test(pw) },
    { id: "length", label: "Містити щонайменше 8 символів", test: (pw: string) => pw.length >= 8 },
    { id: "digit", label: "Містити щонайменше одну цифру (0–9)", test: (pw: string) => /\d/.test(pw) },
];

export const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
    const { changePassword } = useAuth();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const ruleResults = useMemo(() => passwordRules.map((rule) => ({ ...rule, passed: rule.test(newPassword) })), [newPassword]);

    const allRulesPassed = ruleResults.every((r) => r.passed);
    const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
    const canSubmit = allRulesPassed && passwordsMatch && currentPassword.length > 0;

    function handleClose() {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError(null);
        setShowCurrent(false);
        setShowNew(false);
        setShowConfirm(false);
        onClose();
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;
        setError(null);
        setIsLoading(true);
        try {
            await changePassword(currentPassword, newPassword);
            handleClose();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Помилка зміни паролю. Спробуйте ще раз.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && handleClose()} isDismissable>
            <Modal className="max-w-[650px]">
                <Dialog>
                    <div className="relative w-full rounded-3xl bg-white px-4 pt-6 pb-8 sm:px-10 sm:pt-10 sm:pb-10">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:top-6 sm:right-6"
                            aria-label="Закрити"
                        >
                            <XClose className="size-6 text-black" />
                        </button>

                        <div className="flex flex-col gap-8 sm:gap-14">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div
                                        className="flex size-[56px] shrink-0 items-center justify-center rounded-full p-px"
                                        style={{
                                            background: "linear-gradient(-36deg, rgba(151, 71, 255, 1) 4%, rgba(81, 76, 107, 1) 52%, rgba(158, 148, 209, 0) 93%)",
                                        }}
                                    >
                                        <div className="flex size-full items-center justify-center rounded-full bg-white">
                                            <Lock01 className="size-[28px] text-black" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h2 className="font-display text-xl font-semibold leading-[1.2] text-black sm:text-[28px]">
                                            Зміна паролю
                                        </h2>
                                        <p className="font-body text-sm text-gray-800 sm:text-md">
                                            Змініть пароль для збереження охорони паролю.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-10">
                                <div className="flex flex-col gap-4">
                                    <PasswordField
                                        label="Старий пароль"
                                        value={currentPassword}
                                        onChange={setCurrentPassword}
                                        showPassword={showCurrent}
                                        onToggle={() => setShowCurrent(!showCurrent)}
                                        isRequired
                                    />
                                    <PasswordField
                                        label="Новий пароль"
                                        value={newPassword}
                                        onChange={setNewPassword}
                                        showPassword={showNew}
                                        onToggle={() => setShowNew(!showNew)}
                                        isRequired
                                    />
                                    <PasswordField
                                        label="Повторіть новий пароль"
                                        value={confirmPassword}
                                        onChange={setConfirmPassword}
                                        showPassword={showConfirm}
                                        onToggle={() => setShowConfirm(!showConfirm)}
                                        isRequired
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <p className="font-body text-md text-gray-900">
                                        Пароль має відповідати таким вимогам:
                                    </p>
                                    <ul className="flex flex-col gap-2">
                                        {ruleResults.map((rule) => (
                                            <li key={rule.id} className="flex items-center gap-2">
                                                <span className={cx(
                                                    "flex size-5 items-center justify-center rounded-full",
                                                    rule.passed ? "text-green-600" : "text-gray-400",
                                                )}>
                                                    {rule.passed ? (
                                                        <Check className="size-4" />
                                                    ) : (
                                                        <span className="size-2.5 rounded-full bg-current" />
                                                    )}
                                                </span>
                                                <span className={cx(
                                                    "font-body text-md",
                                                    rule.passed ? "text-gray-900" : "text-red-500",
                                                )}>
                                                    {rule.label}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {error && <p className="text-sm text-red-600">{error}</p>}

                                <Button
                                    type="submit"
                                    size="lg"
                                    color="primary"
                                    isDisabled={!canSubmit}
                                    isLoading={isLoading}
                                    className="gradient-border-dark w-full !bg-black !text-white !ring-0 disabled:!opacity-50"
                                >
                                    Зберегти
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};

interface PasswordFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    showPassword: boolean;
    onToggle: () => void;
    isRequired?: boolean;
}

function PasswordField({ label, value, onChange, showPassword, onToggle, isRequired }: PasswordFieldProps) {
    const EyeIcon = showPassword ? EyeOff : Eye;

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 px-1">
                <label className="font-body text-md font-semibold text-black">{label}</label>
                {isRequired && <span className="text-brand-500">*</span>}
            </div>
            <div className="flex items-center rounded-lg bg-white px-4 py-2 ring-1 ring-gray-600 ring-inset focus-within:ring-2 focus-within:ring-brand-500">
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-transparent font-body text-lg text-black outline-hidden placeholder:text-gray-500"
                    required={isRequired}
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className="ml-2 shrink-0 cursor-pointer text-gray-700 transition-colors hover:text-gray-900"
                    aria-label={showPassword ? "Сховати пароль" : "Показати пароль"}
                >
                    <EyeIcon className="size-6" />
                </button>
            </div>
        </div>
    );
}
