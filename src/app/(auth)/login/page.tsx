"use client";

import { useState } from "react";
import { Mail01 } from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ForgotPasswordModal } from "@/components/features/auth/forgot-password-modal";
import { AuthLayout } from "@/components/layout/auth-layout";

export default function LoginPage() {
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    return (
        <AuthLayout variant="login">
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-16">
                {/* Header */}
                <div className="flex w-full max-w-[496px] flex-col items-center gap-14">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-center font-display text-[40px] leading-[1.2] font-bold text-black uppercase">Раді бачити вас!</h1>
                        <p className="max-w-[283px] text-center font-body text-md leading-[1.25] text-[#62677D]">
                            Заповніть деталі нижче, щоб увійти до вашого акаунту
                        </p>
                    </div>

                    {/* Form */}
                    <Form className="flex w-full max-w-[369px] flex-col gap-4">
                        {/* Inputs */}
                        <div className="flex flex-col gap-2">
                            <Input
                                type="email"
                                name="email"
                                placeholder="project@gmail.com"
                                icon={Mail01}
                                variant="light"
                                isRequired
                                aria-label="Електронна пошта"
                                wrapperClassName="!ring-gray-600"
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Введіть пароль"
                                icon={Mail01}
                                variant="light"
                                isRequired
                                aria-label="Пароль"
                                wrapperClassName="!ring-gray-600"
                            />
                        </div>

                        {/* Remember me + forgot password */}
                        <div className="flex items-center justify-between">
                            <Checkbox variant="light" label="Запамʼятати мене" name="remember" />
                            <button
                                type="button"
                                onClick={() => setIsForgotPasswordOpen(true)}
                                className="cursor-pointer text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
                            >
                                Забули пароль?
                            </button>
                        </div>
                    </Form>
                </div>

                {/* Bottom actions */}
                <div className="mt-12 flex w-full max-w-[419px] flex-col items-center gap-12">
                    <div className="flex w-full flex-col items-center gap-2">
                        {/* Submit button */}
                        <Button type="submit" size="lg" color="primary" className="gradient-border-dark w-full max-w-[368px] !bg-black !text-white !ring-0">
                            Увійти
                        </Button>

                        {/* Divider */}
                        {/* <div className="flex w-full items-center gap-[11px] py-2">
                            <div className="h-px flex-1 bg-gray-400" />
                            <span className="font-body text-md font-medium text-[#62677D]">або</span>
                            <div className="h-px flex-1 bg-gray-400" />
                        </div> */}
                    </div>

                    {/* Sign up link */}
                    <div className="flex items-center gap-[9px]">
                        <span className="font-body text-md text-[#62677D]">Ще не маєте акаунта?</span>
                        <Link href="/signup" className="font-body text-md font-medium text-[#0609F2] underline-offset-2 hover:underline">
                            Зареєструйтесь тут
                        </Link>
                    </div>
                </div>
            </div>

            {/* Forgot password modal */}
            <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} />
        </AuthLayout>
    );
}
