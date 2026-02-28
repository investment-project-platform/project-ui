"use client";

import { Eye } from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { AuthLayout } from "@/components/layout/auth-layout";

export default function SignupPage() {
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
                <Form className="mx-auto mt-10 flex w-full max-w-[744px] flex-col gap-7">
                    {/* Input grid — 2 columns */}
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                        <Input type="text" name="firstName" label="Імʼя" placeholder="Андрій" variant="dark" isRequired />
                        <Input type="text" name="lastName" label="Прізвище" placeholder="Андрієнко" variant="dark" isRequired />
                        <Input type="tel" name="phone" label="Номер телефону" placeholder="+(380) 555 55 55" variant="dark" isRequired />
                        <Input type="email" name="email" label="Електронна пошта" placeholder="andrii@gmail.com" variant="dark" isRequired />
                    </div>

                    {/* Password row */}
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                        <Input type="password" name="password" label="Пароль" placeholder="***********" variant="dark" isRequired />
                        <Input type="password" name="confirmPassword" label="Повторіть пароль" placeholder="***********" variant="dark" isRequired />
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
                </Form>

                {/* Bottom actions */}
                <div className="mx-auto mt-8 flex w-full max-w-[536px] flex-col items-center gap-8">
                    <div className="flex w-full flex-col items-center gap-2">
                        {/* Submit button */}
                        <Button type="submit" size="lg" color="primary" className="gradient-border-light w-full !ring-0">
                            Зареєструватись
                        </Button>

                        {/* Divider */}
                        {/* <div className="flex w-full items-center gap-[11px] py-2">
                            <div className="h-px flex-1 bg-gray-400" />
                            <span className="font-body text-md font-medium text-gray-600">або</span>
                            <div className="h-px flex-1 bg-gray-400" />
                        </div> */}
                    </div>

                    {/* Login link */}
                    <p className="text-center font-accent text-sm text-black">
                        Вже маєте обліковий запис?{" "}
                        <Link href="/login" className="underline underline-offset-2 hover:text-brand-700">
                            Увійдіть тут
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
