"use client";

import { useState } from "react";
import { Eye, EyeOff } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { AuthLayout } from "@/components/layout/auth-layout";
import { useAuth } from "@/context/auth-context";

export default function SignupPage() {
    const { register } = useAuth();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }
        setPasswordMismatch(false);

        setIsLoading(true);
        try {
            await register(firstName, lastName, email, password);
            router.push("/dashboard");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Помилка реєстрації. Перевірте дані та спробуйте ще раз.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthLayout variant="signup">
            <div className="flex flex-1 flex-col px-6 py-12 md:px-12 lg:px-16">
                {/* Header */}
                <div className="mx-auto flex w-full max-w-[744px] flex-col items-center gap-2 lg:items-start">
                    <h1 className="text-center font-display text-[40px] leading-[1.2] font-bold text-white uppercase lg:w-full lg:text-center">
                        Інвестуйте разом{"\n"}з нами!
                    </h1>
                    <p className="text-center font-body text-md leading-[1.44] text-brand-100 lg:w-full lg:text-center">
                        Заповніть поля нижче, щоб створити ваш особистий акаунт
                    </p>
                </div>

                {/* Form */}
                <Form onSubmit={handleSubmit} className="mx-auto mt-10 flex w-full max-w-[744px] flex-col gap-7">
                    {/* Input grid — 2 columns */}
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                        <Input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={setFirstName}
                            label="Імʼя"
                            placeholder="Андрій"
                            variant="dark"
                            isRequired
                        />
                        <Input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={setLastName}
                            label="Прізвище"
                            placeholder="Андрієнко"
                            variant="dark"
                            isRequired
                        />
                        {/* Phone is kept in UI but not sent to the backend (not supported by SDK) */}
                        <Input type="tel" name="phone" label="Номер телефону" placeholder="+(380) 555 55 55" variant="dark" />
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={setEmail}
                            label="Електронна пошта"
                            placeholder="andrii@gmail.com"
                            variant="dark"
                            isRequired
                        />
                    </div>

                    {/* Password row */}
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={setPassword}
                            label="Пароль"
                            placeholder="***********"
                            variant="dark"
                            isRequired
                            trailingAdornment={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="text-gray-500 hover:text-gray-400 focus:outline-none"
                                    aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
                                >
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            }
                        />
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(val) => {
                                setConfirmPassword(val);
                                setPasswordMismatch(false);
                            }}
                            label="Повторіть пароль"
                            placeholder="***********"
                            variant="dark"
                            isRequired
                            isInvalid={passwordMismatch}
                            hint={passwordMismatch ? "Паролі не співпадають" : undefined}
                            trailingAdornment={
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    className="text-gray-500 hover:text-gray-400 focus:outline-none"
                                    aria-label={showConfirmPassword ? "Приховати пароль" : "Показати пароль"}
                                >
                                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            }
                        />
                    </div>

                    {/* Terms checkbox */}
                    <Checkbox
                        variant="dark"
                        name="terms"
                        label={
                            <span className="font-body text-sm text-white">
                                Створюючи обліковий запис, ви погоджуєтесь з нашими{" "}
                                <Link href="#" className="underline underline-offset-2">
                                    умовами використання
                                </Link>
                            </span>
                        }
                    />

                    {/* Error message */}
                    {error && <p className="text-sm text-red-400">{error}</p>}

                    {/* Bottom actions */}
                    <div className="mx-auto mt-1 flex w-full max-w-[536px] flex-col items-center gap-8">
                        <div className="flex w-full flex-col items-center gap-2">
                            <Button
                                type="submit"
                                size="lg"
                                color="primary"
                                isLoading={isLoading}
                                className="gradient-border-light w-full !ring-0"
                            >
                                Зареєструватись
                            </Button>
                        </div>

                        {/* Login link */}
                        <p className="text-center font-accent text-sm text-black">
                            Вже маєте обліковий запис?{" "}
                            <Link href="/login" className="underline underline-offset-2 hover:text-brand-700">
                                Увійдіть тут
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </AuthLayout>
    );
}
