"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail01 } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ForgotPasswordModal } from "@/components/features/auth/forgot-password-modal";
import { AuthLayout } from "@/components/layout/auth-layout";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Помилка входу. Перевірте дані та спробуйте ще раз.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

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
                    <Form onSubmit={handleSubmit} className="flex w-full max-w-[369px] flex-col gap-4">
                        {/* Inputs */}
                        <div className="flex flex-col gap-2">
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={setEmail}
                                placeholder="project@gmail.com"
                                icon={Mail01}
                                variant="light"
                                isRequired
                                aria-label="Електронна пошта"
                                wrapperClassName="!ring-gray-600"
                            />
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={setPassword}
                                placeholder="Введіть пароль"
                                icon={Mail01}
                                variant="light"
                                isRequired
                                aria-label="Пароль"
                                wrapperClassName="!ring-gray-600"
                                trailingAdornment={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                                        aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
                                    >
                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                }
                            />
                        </div>

                        {/* Error message */}
                        {error && <p className="text-sm text-red-600">{error}</p>}

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

                        {/* Submit button — inside the form so type="submit" works */}
                        <div className="mt-8 flex flex-col items-center gap-12">
                            <div className="flex w-full flex-col items-center gap-2">
                                <Button
                                    type="submit"
                                    size="lg"
                                    color="primary"
                                    isLoading={isLoading}
                                    className="gradient-border-dark w-full !bg-black !text-white !ring-0"
                                >
                                    Увійти
                                </Button>
                            </div>

                            {/* Sign up link */}
                            <div className="flex items-center gap-[9px]">
                                <span className="font-body text-md text-[#62677D]">Ще не маєте акаунта?</span>
                                <Link href="/signup" className="font-body text-md font-medium text-[#0609F2] underline-offset-2 hover:underline">
                                    Зареєструйтесь тут
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

            {/* Forgot password modal */}
            <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} />
        </AuthLayout>
    );
}
