"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Phone01, User01, XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { ChangePasswordModal } from "@/components/features/dashboard/change-password-modal";
import { useAuth } from "@/context/auth-context";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
            setPhone("");
            setError(null);
        }
    }, [isOpen, user]);

    function handleClose() {
        setError(null);
        onClose();
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await updateProfile(name, surname);
            handleClose();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Помилка збереження. Спробуйте ще раз.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <ModalOverlay isOpen={isOpen && !isChangePasswordOpen} onOpenChange={(open) => !open && handleClose()} isDismissable>
                <Modal className="max-w-[872px]">
                    <Dialog>
                        <div className="relative w-full rounded-2xl bg-gray-50 pt-6 pb-8 sm:pt-8 sm:pb-10">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:top-6 sm:right-8"
                                aria-label="Закрити"
                            >
                                <XClose className="size-6 text-black" />
                            </button>

                            <div className="flex flex-col items-center gap-8 sm:gap-10">
                                <div className="flex w-full items-center gap-3 px-4 sm:gap-4 sm:px-10">
                                    <div
                                        className="flex size-[56px] shrink-0 items-center justify-center rounded-full p-px"
                                        style={{
                                            background: "linear-gradient(-36deg, rgba(151, 71, 255, 1) 4%, rgba(81, 76, 107, 1) 52%, rgba(158, 148, 209, 0) 93%)",
                                        }}
                                    >
                                        <div className="flex size-full items-center justify-center rounded-full bg-white">
                                            <User01 className="size-[28px] text-black" />
                                        </div>
                                    </div>
                                    <h2 className="font-display text-xl font-semibold leading-[1.2] text-black sm:text-[28px]">
                                        Редагування профілю
                                    </h2>
                                </div>

                                <Form onSubmit={handleSubmit} className="flex w-full flex-col gap-8 px-4 sm:gap-10 sm:px-10">
                                    <div className="flex flex-col gap-3 sm:gap-4">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                                            <div className="flex-1">
                                                <Input
                                                    name="name"
                                                    value={name}
                                                    onChange={setName}
                                                    label="Імʼя"
                                                    icon={User01}
                                                    variant="light"
                                                    isRequired
                                                    wrapperClassName="!ring-gray-600"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Input
                                                    name="surname"
                                                    value={surname}
                                                    onChange={setSurname}
                                                    label="Прізвище"
                                                    icon={User01}
                                                    variant="light"
                                                    isRequired
                                                    wrapperClassName="!ring-gray-600"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                                            <div className="flex-1">
                                                <Input
                                                    name="phone"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={setPhone}
                                                    label="Номер телефону"
                                                    placeholder="+ (380) 555 55 55"
                                                    icon={Phone01}
                                                    variant="light"
                                                    wrapperClassName="!ring-gray-600"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={setEmail}
                                                    label="Електронна пошта"
                                                    icon={User01}
                                                    variant="light"
                                                    wrapperClassName="!ring-gray-600"
                                                />
                                            </div>
                                        </div>

                                        <PasswordDisplay />
                                    </div>

                                    {error && <p className="text-sm text-red-600">{error}</p>}

                                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                                        <Button
                                            type="button"
                                            size="lg"
                                            color="primary"
                                            onClick={() => setIsChangePasswordOpen(true)}
                                            className="gradient-border-light flex-1 !shadow-none !ring-0"
                                        >
                                            Змінити пароль
                                        </Button>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            color="primary"
                                            isLoading={isLoading}
                                            className="gradient-border-dark flex-1 !bg-black !text-white !ring-0"
                                        >
                                            Зберегти зміни
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>

            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
            />
        </>
    );
};

function PasswordDisplay() {
    const [showPassword, setShowPassword] = useState(false);
    const EyeIcon = showPassword ? EyeOff : Eye;

    return (
        <div className="flex flex-col gap-1">
            <label className="px-1 font-body text-md font-semibold text-black">Пароль</label>
            <div className="flex items-center rounded-lg bg-white px-4 py-2 ring-1 ring-gray-600 ring-inset">
                <input
                    type={showPassword ? "text" : "password"}
                    value="**********"
                    readOnly
                    className="w-full bg-transparent font-body text-md text-black outline-hidden"
                    tabIndex={-1}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 shrink-0 cursor-pointer text-gray-700 transition-colors hover:text-gray-900"
                    aria-label={showPassword ? "Сховати пароль" : "Показати пароль"}
                >
                    <EyeIcon className="size-6" />
                </button>
            </div>
        </div>
    );
}
