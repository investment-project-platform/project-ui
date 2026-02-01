"use client";

import { Check, HelpCircle, Mail01, Plus, SearchLg, User01 } from "@untitledui/icons";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";

const colorSwatches = [
    { name: "brand-50", className: "bg-brand-50" },
    { name: "brand-100", className: "bg-brand-100" },
    { name: "brand-200", className: "bg-brand-200" },
    { name: "brand-300", className: "bg-brand-300" },
    { name: "brand-400", className: "bg-brand-400" },
    { name: "brand-500", className: "bg-brand-500" },
    { name: "brand-600", className: "bg-brand-600" },
    { name: "brand-700", className: "bg-brand-700" },
    { name: "brand-800", className: "bg-brand-800" },
    { name: "brand-900", className: "bg-brand-900" },
];

const graySwatches = [
    { name: "gray-50", className: "bg-gray-50" },
    { name: "gray-100", className: "bg-gray-100" },
    { name: "gray-200", className: "bg-gray-200" },
    { name: "gray-300", className: "bg-gray-300" },
    { name: "gray-400", className: "bg-gray-400" },
    { name: "gray-500", className: "bg-gray-500" },
    { name: "gray-600", className: "bg-gray-600" },
    { name: "gray-700", className: "bg-gray-700" },
    { name: "gray-800", className: "bg-gray-800" },
    { name: "gray-900", className: "bg-gray-900" },
];

const selectItems = [
    { id: "1", label: "Опція 1" },
    { id: "2", label: "Опція 2" },
    { id: "3", label: "Опція 3" },
];

export default function UiKitPage() {
    return (
        <div className="min-h-screen">
            {/* Light Background Section */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-6xl space-y-12 px-6">
                    <header className="space-y-2">
                        <h1 className="font-display text-display-lg font-bold text-black">UI Kit</h1>
                        <p className="font-body text-lg text-gray-700">
                            Візуальна перевірка дизайн-токенів та базових компонентів
                        </p>
                    </header>

                    {/* Typography */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-black">Typography</h2>
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-medium text-gray-700">Display (Lato)</span>
                                    <p className="font-display text-display-lg font-bold text-black">Display LG</p>
                                    <p className="font-display text-display-md font-bold text-black">Display MD</p>
                                    <p className="font-display text-display-sm font-semibold text-black">Display SM</p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium text-gray-700">Body (Mulish)</span>
                                    <p className="font-body text-lg text-gray-800">
                                        Body LG — Швидка перевірка міжряддя та читабельності. Інвестуйте разом з нами!
                                    </p>
                                    <p className="font-body text-md text-gray-700">
                                        Body MD — Основний текст для інтерфейсу користувача.
                                    </p>
                                    <p className="font-body text-sm text-gray-600">Body SM — Допоміжний текст та підписи.</p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium text-gray-700">Accent (Manrope)</span>
                                    <p className="font-accent text-md text-gray-800">Accent font — Manrope для акцентних елементів</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-black">Colors</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 text-sm font-medium text-gray-700">Brand (Purple)</h3>
                                <div className="flex flex-wrap gap-2">
                                    {colorSwatches.map((swatch) => (
                                        <div key={swatch.name} className="text-center">
                                            <div className={`h-12 w-16 rounded-lg ${swatch.className} ring-1 ring-gray-200`} />
                                            <span className="text-xs text-gray-600">{swatch.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-2 text-sm font-medium text-gray-700">Gray</h3>
                                <div className="flex flex-wrap gap-2">
                                    {graySwatches.map((swatch) => (
                                        <div key={swatch.name} className="text-center">
                                            <div className={`h-12 w-16 rounded-lg ${swatch.className} ring-1 ring-gray-200`} />
                                            <span className="text-xs text-gray-600">{swatch.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-black">Buttons</h2>
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                            <div className="flex flex-wrap items-center gap-4">
                                <Button size="sm">Primary SM</Button>
                                <Button size="md">Primary MD</Button>
                                <Button size="lg">Primary LG</Button>
                                <Button size="xl">Primary XL</Button>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-4">
                                <Button color="secondary" size="lg">Secondary</Button>
                                <Button color="tertiary" size="lg">Tertiary</Button>
                                <Button color="link-color" iconLeading={Plus}>Link color</Button>
                                <Button color="link-gray" iconLeading={SearchLg}>Link gray</Button>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-4">
                                <Button color="primary-destructive" size="lg">Destructive</Button>
                                <Button color="secondary-destructive" size="lg">Secondary Destructive</Button>
                                <Button isDisabled size="lg">Disabled</Button>
                                <Button isLoading size="lg">Loading</Button>
                            </div>
                        </div>
                    </div>

                    {/* Form Components - Light Variant */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-black">Form Components (Light variant)</h2>
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Input label="Імʼя" placeholder="Введіть імʼя" icon={User01} />
                                <Input label="Email" placeholder="name@company.com" icon={Mail01} />
                                <Input label="З підказкою" placeholder="Введіть текст" labelTooltip="Це підказка для поля" />
                                <Input label="Disabled" placeholder="Disabled" isDisabled />
                                <Input label="Invalid" placeholder="Invalid" isInvalid hint="Приклад тексту помилки" />
                                <Input label="Пошук" placeholder="Пошук..." icon={SearchLg} shortcut />
                            </div>
                            <div className="mt-6 grid gap-6 md:grid-cols-2">
                                <Select label="Виберіть опцію" placeholder="Оберіть..." items={selectItems}>
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <TextArea label="Опис" placeholder="Введіть опис..." rows={3} />
                            </div>
                            <div className="mt-6 flex flex-wrap gap-6">
                                <Checkbox label="Checkbox light" />
                                <Checkbox label="Checked" isSelected />
                                <Checkbox label="Disabled" isDisabled />
                            </div>
                            <div className="mt-6">
                                <RadioGroup>
                                    <RadioButton value="1" label="Radio option 1" />
                                    <RadioButton value="2" label="Radio option 2" />
                                    <RadioButton value="3" label="Radio option 3 (disabled)" isDisabled />
                                </RadioGroup>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-black">Badges</h2>
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge color="gray">Gray</Badge>
                                <Badge color="brand">Brand</Badge>
                                <Badge color="success">Success</Badge>
                                <Badge color="warning">Warning</Badge>
                                <Badge color="error">Error</Badge>
                                <BadgeWithDot color="brand">Active</BadgeWithDot>
                                <BadgeWithIcon color="brand" iconLeading={Check}>Verified</BadgeWithIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dark Background Section */}
            <section className="bg-black py-16">
                <div className="mx-auto max-w-6xl space-y-12 px-6">
                    <header className="space-y-2">
                        <h1 className="font-display text-display-lg font-bold text-white">Dark Background</h1>
                        <p className="font-body text-lg text-brand-100">
                            Компоненти для темного фону (Auth pages, Investor dashboard)
                        </p>
                    </header>

                    {/* Form Components - Dark Variant */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Form Components (Dark variant)</h2>
                        <div className="rounded-xl border border-brand-900 bg-[rgb(252_252_252_/_0.05)] p-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Input variant="dark" label="Імʼя" placeholder="Введіть імʼя" icon={User01} />
                                <Input variant="dark" label="Email" placeholder="name@company.com" icon={Mail01} />
                                <Input variant="dark" label="З підказкою" placeholder="Введіть текст" labelTooltip="Це підказка для поля" />
                                <Input variant="dark" label="Disabled" placeholder="Disabled" isDisabled />
                                <Input variant="dark" label="Invalid" placeholder="Invalid" isInvalid hint="Приклад тексту помилки" />
                                <Input variant="dark" label="Пароль" placeholder="***********" />
                            </div>
                            <div className="mt-6 grid gap-6 md:grid-cols-2">
                                <Select variant="dark" label="Виберіть опцію" placeholder="Оберіть..." items={selectItems}>
                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                </Select>
                                <TextArea variant="dark" label="Опис" placeholder="Введіть опис..." rows={3} />
                            </div>
                            <div className="mt-6 flex flex-wrap gap-6">
                                <Checkbox variant="dark" label="Checkbox dark" />
                                <Checkbox variant="dark" label="Checked" isSelected />
                                <Checkbox variant="dark" label="Disabled" isDisabled />
                            </div>
                            <div className="mt-6">
                                <RadioGroup variant="dark">
                                    <RadioButton value="1" label="Radio option 1" />
                                    <RadioButton value="2" label="Radio option 2" />
                                    <RadioButton value="3" label="Radio option 3 (disabled)" isDisabled />
                                </RadioGroup>
                            </div>
                        </div>
                    </div>

                    {/* Buttons on Dark */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Buttons on Dark Background</h2>
                        <div className="rounded-xl border border-brand-900 bg-[rgb(252_252_252_/_0.05)] p-6">
                            <div className="flex flex-wrap items-center gap-4">
                                <Button size="lg">Primary Button</Button>
                                <Button size="lg" iconLeading={Plus}>With Icon</Button>
                            </div>
                        </div>
                    </div>

                    {/* Example Form */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Example Sign Up Form</h2>
                        <div className="mx-auto max-w-md rounded-xl border border-brand-900 bg-[rgb(252_252_252_/_0.05)] p-8">
                            <div className="mb-6 text-center">
                                <h3 className="font-display text-display-sm font-bold uppercase text-white">
                                    Інвестуйте разом з нами!
                                </h3>
                                <p className="mt-2 text-brand-100">
                                    Заповніть поля нижче, щоб створити ваш особистий акаунт
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input variant="dark" label="Імʼя" placeholder="Андрій" />
                                    <Input variant="dark" label="Прізвище" placeholder="Андрієнко" />
                                </div>
                                <Input variant="dark" label="Номер телефону" placeholder="+380 555 55 55" />
                                <Input variant="dark" label="Електронна пошта" placeholder="email@example.com" icon={Mail01} />
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input variant="dark" label="Пароль" placeholder="***********" />
                                    <Input variant="dark" label="Повторіть пароль" placeholder="***********" />
                                </div>
                                <Checkbox
                                    variant="dark"
                                    label="Створюючи обліковий запис, ви погоджуєтесь з нашими умовами використання"
                                />
                                <Button size="lg" className="w-full">
                                    Зареєструватись
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
