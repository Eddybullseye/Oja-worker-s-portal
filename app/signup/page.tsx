"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User, Phone, Briefcase, CheckCircle2 } from "lucide-react";

const SERVICE_CATEGORIES = [
    "Plumbing", "Electrical", "Cleaning", "Carpentry",
    "Painting", "Landscaping", "Moving", "Tutoring",
    "Photography", "Tech Support", "Assembly", "Handyman"
];

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const toggleService = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
    };

    const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        setStep(2);
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedServices.length === 0) {
            alert("Please select at least one service you offer.");
            return;
        }
        setIsLoading(true);
        // Simulate registration
        setTimeout(() => {
            localStorage.setItem("oja_worker_auth", "true");
            setIsLoading(false);
            router.push("/onboarding");
        }, 1000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-oja-bg-dark">
            {/* Header */}
            <div className="bg-oja-teal text-white px-6 pt-14 pb-10 rounded-b-[2.5rem]">
                <div className="flex justify-center mb-4">
                    <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg backdrop-blur-sm">
                        O
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-center mb-1">Join as a Service Provider</h1>
                <p className="text-white/80 text-sm text-center">Earn money doing what you're good at</p>

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    {[1, 2].map((s) => (
                        <div key={s} className={`h-2 rounded-full transition-all duration-300 ${step === s ? "w-8 bg-white" : "w-2 bg-white/40"}`} />
                    ))}
                </div>
            </div>

            <div className="flex-1 px-6 py-8">
                {step === 1 && (
                    <form onSubmit={handleStep1} className="space-y-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Your Details</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Create your service provider account</p>

                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                name="fullName"
                                type="text"
                                required
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white placeholder:text-slate-400 transition-shadow"
                            />
                        </div>

                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white placeholder:text-slate-400 transition-shadow"
                            />
                        </div>

                        <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                name="phone"
                                type="tel"
                                required
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white placeholder:text-slate-400 transition-shadow"
                            />
                        </div>

                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                minLength={8}
                                placeholder="Password (min. 8 characters)"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white placeholder:text-slate-400 transition-shadow"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white placeholder:text-slate-400 transition-shadow"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white py-4 rounded-xl font-semibold shadow-sm transition-colors text-sm mt-2"
                        >
                            Continue
                        </button>

                        <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
                            Already have an account?{" "}
                            <Link href="/login" className="font-medium text-oja-teal dark:text-oja-seafoam hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleFinalSubmit} className="space-y-4">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-10 h-10 rounded-full bg-oja-teal/10 text-oja-teal flex items-center justify-center">
                                <Briefcase size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Services</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Select all services you offer</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {SERVICE_CATEGORIES.map((service) => {
                                const isSelected = selectedServices.includes(service);
                                return (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => toggleService(service)}
                                        className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${isSelected
                                                ? "border-oja-teal bg-oja-teal/10 text-oja-teal dark:text-oja-seafoam dark:border-oja-seafoam dark:bg-oja-teal/20"
                                                : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-oja-teal/50"
                                            }`}
                                    >
                                        {isSelected ? (
                                            <CheckCircle2 size={16} className="shrink-0 text-oja-teal dark:text-oja-seafoam" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-white/20 shrink-0" />
                                        )}
                                        {service}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="pt-4 space-y-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white py-4 rounded-xl font-semibold shadow-sm transition-colors text-sm flex justify-center items-center"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    "Create Account & Continue"
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full py-3.5 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            >
                                Back
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Terms */}
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 pb-6 px-6">
                By signing up, you agree to Oja&apos;s{" "}
                <span className="text-oja-teal dark:text-oja-seafoam cursor-pointer">Terms of Service</span>{" "}
                and{" "}
                <span className="text-oja-teal dark:text-oja-seafoam cursor-pointer">Privacy Policy</span>
            </p>
        </div>
    );
}
