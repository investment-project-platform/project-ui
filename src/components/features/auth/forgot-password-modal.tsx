"use client";

import { useState } from "react";
import { Key01, XClose } from "@untitledui/icons";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { useAuth } from "@/context/auth-context";

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
    const { forgotPassword } = useAuth();

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await forgotPassword(email);
            setIsSuccess(true);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Помилка. Спробуйте ще раз.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

    function handleClose() {
        setEmail("");
        setError(null);
        setIsSuccess(false);
        onClose();
    }

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && handleClose()} isDismissable>
            <Modal className="max-w-[576px]">
                <Dialog>
                    <div className="relative w-full rounded-2xl bg-gray-50 px-20 pt-8 pb-10">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute top-8 right-8 flex size-10 cursor-pointer items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                            aria-label="Закрити"
                        >
                            <XClose className="size-8 text-black" />
                        </button>

                        <div className="flex flex-col items-center gap-8">
                            {/* Header with icon */}
                            <div className="flex flex-col items-center gap-5">
                                {/* Gradient circle icon */}
                                <div
                                    className="flex size-[97px] items-center justify-center rounded-full p-[15px]"
                                    style={{
                                        background: "linear-gradient(-36deg, rgba(178, 163, 253, 0.3) 4%, rgba(64, 69, 135, 0.2) 52%, rgba(36, 54, 224, 0) 93%)",
                                    }}
                                >
                                    <div
                                        className="flex size-full items-center justify-center rounded-full p-px"
                                        style={{
                                            background: "linear-gradient(-25deg, rgba(236, 232, 255, 1) 0%, rgba(26, 38, 152, 1) 59%, rgba(238, 238, 245, 1) 100%)",
                                        }}
                                    >
                                        <div className="flex size-full items-center justify-center rounded-full bg-white">
                                            <Key01 className="size-[34px] text-black" />
                                        </div>
                                    </div>
                                </div>

                                {/* Title and subtitle */}
                                <div className="flex flex-col items-center gap-2">
                                    <h2 className="text-center font-display text-[24px] font-bold uppercase leading-[1.2] text-black">
                                        Забули пароль?
                                    </h2>
                                    <p className="max-w-[421px] text-center font-body text-md leading-[1.25] text-[#62677D]">
                                        {isSuccess
                                            ? "Перевірте вашу пошту — ми надіслали інструкції для відновлення паролю."
                                            : "Введіть вашу пошту, щоб відновити пароль"}
                                    </p>
                                </div>
                            </div>

                            {isSuccess ? (
                                <Button
                                    type="button"
                                    size="lg"
                                    color="primary"
                                    onClick={handleClose}
                                    className="gradient-border-dark w-full !bg-black !text-white !ring-0"
                                >
                                    Закрити
                                </Button>
                            ) : (
                                <Form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={setEmail}
                                            label="Електронна пошта"
                                            placeholder="andrii87@gmail.com"
                                            variant="light"
                                            isRequired
                                            wrapperClassName="!ring-gray-600"
                                        />
                                        {error && <p className="text-sm text-red-600">{error}</p>}
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        color="primary"
                                        isLoading={isLoading}
                                        className="gradient-border-dark w-full !bg-black !text-white !ring-0"
                                    >
                                        Відновити пароль
                                    </Button>
                                </Form>
                            )}
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
