'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    CheckCircle,
    Globe,
    User,
    Briefcase,
    KeyRound,
    ArrowLeft,
    Check,
    Phone,
} from 'lucide-react';

interface AuthGatewayProps {
    initialMode?: 'signin' | 'signup' | 'forgot' | 'verify-otp' | 'reset-password';
}

export default function AuthGateway({ initialMode = 'signup' }: AuthGatewayProps) {
    const router = useRouter();

    // Mode: 'signin' | 'signup' | 'forgot' | 'verify-otp' | 'reset-password' | 'verify-email'
    const [authMode, setAuthMode] = useState<
        'signin' | 'signup' | 'forgot' | 'verify-otp' | 'reset-password' | 'verify-email' | 'success'
    >(initialMode);

    // Form States
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Sign In Inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Sign Up Inputs
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    // Forgot Password / Reset Inputs
    const [resetEmail, setResetEmail] = useState('');
    const [otpCode, setOtpCode] = useState(['', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    // Handle Sign In Submit
    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem('oja_worker_auth', 'true');
            triggerToast('Welcome back! Signed in to Worker Portal.');
            setTimeout(() => {
                router.push('/');
            }, 600);
        }, 800);
    };

    // Handle Sign Up Submit
    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem('oja_worker_auth', 'true');
            setAuthMode('verify-email');
        }, 800);
    };

    // Handle Send Reset Code
    const handleSendResetCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetEmail) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAuthMode('verify-otp');
            triggerToast(`Verification code sent to ${resetEmail}`);
        }, 800);
    };

    // Handle Verify OTP
    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAuthMode('reset-password');
            triggerToast('Code verified! Enter your new password.');
        }, 800);
    };

    // Handle Password Reset Submit
    const handlePasswordResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAuthMode('success');
            triggerToast('Password reset successfully!');
        }, 900);
    };

    // Social Login Simulator
    const handleSocialLogin = (provider: string) => {
        triggerToast(`Signing in with ${provider}...`);
        setTimeout(() => {
            localStorage.setItem('oja_worker_auth', 'true');
            router.push('/');
        }, 800);
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-oja-bg-dark flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Blur Blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-oja-teal/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-oja-orange/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

            {/* Header Logo */}
            <div className="max-w-md w-full mx-auto flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5 group cursor-default">
                    <div className="w-10 h-10 rounded-2xl bg-oja-teal flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-xl leading-none">O</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Oja</span>
                        <span className="text-[10px] uppercase font-bold text-oja-teal dark:text-oja-seafoam -mt-1 tracking-widest">
                            Worker Portal
                        </span>
                    </div>
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Service Provider Portal
                </div>
            </div>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-3 px-4 rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200 border border-slate-800 dark:border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Auth Card Container */}
            <div className="max-w-md w-full mx-auto my-8 z-10">
                <div className="bg-white dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">

                    {/* Provider Badge */}
                    <div className="flex items-center justify-center gap-2 bg-oja-teal/10 text-oja-teal dark:text-oja-seafoam py-2 px-4 rounded-2xl mb-6 font-bold text-xs">
                        <Briefcase className="w-4 h-4" />
                        <span>Service Provider Portal</span>
                    </div>

                    {/* ==================== SIGN IN VIEW ==================== */}
                    {authMode === 'signin' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Welcome Back, Partner
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Sign in to access your job requests, calendar, and earnings.
                                </p>
                            </div>

                            <form onSubmit={handleSignIn} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="pro@example.com"
                                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal placeholder-slate-400"
                                        />
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setAuthMode('forgot')}
                                            className="text-xs font-bold text-oja-teal dark:text-oja-seafoam hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-10 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal placeholder-slate-400"
                                        />
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs pt-1">
                                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 font-medium">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="accent-oja-teal rounded scale-110"
                                        />
                                        Remember me for 30 days
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span>Signing in...</span>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Social Login Separator */}
                            <div className="relative flex items-center justify-center my-6">
                                <div className="border-t border-slate-200 dark:border-white/10 w-full" />
                                <span className="bg-white dark:bg-oja-surface-dark px-3 text-[10px] uppercase font-bold text-slate-400 absolute">
                                    Or continue with
                                </span>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Google')}
                                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-red-500" /> Google
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Apple')}
                                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-slate-900 dark:text-white" /> Apple
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Facebook')}
                                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-blue-600" /> Facebook
                                </button>
                            </div>

                            {/* Toggle to Sign Up */}
                            <div className="text-center pt-2 border-t border-slate-100 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
                                Don&apos;t have a provider account yet?{' '}
                                <button
                                    type="button"
                                    onClick={() => setAuthMode('signup')}
                                    className="font-bold text-oja-teal dark:text-oja-seafoam hover:underline ml-1"
                                >
                                    Sign up as a Provider
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ==================== SIGN UP VIEW ==================== */}
                    {authMode === 'signup' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Join as a Service Provider
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Offer your skills, manage your schedule, and get paid securely.
                                </p>
                            </div>

                            <form onSubmit={handleSignUp} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        Full Legal Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Alex Johnson"
                                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal placeholder-slate-400"
                                        />
                                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal placeholder-slate-400"
                                        />
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal placeholder-slate-400"
                                        />
                                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        Create Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            minLength={8}
                                            value={signupPassword}
                                            onChange={(e) => setSignupPassword(e.target.value)}
                                            placeholder="At least 8 characters"
                                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-10 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal placeholder-slate-400"
                                        />
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                                    By signing up, you agree to Oja&apos;s{' '}
                                    <span className="font-bold text-slate-700 dark:text-slate-300">Terms of Service</span> and{' '}
                                    <span className="font-bold text-slate-700 dark:text-slate-300">Privacy Policy</span>.
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span>Registering...</span>
                                    ) : (
                                        <>
                                            <span>Apply as Service Provider</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Toggle to Sign In */}
                            <div className="text-center pt-2 border-t border-slate-100 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
                                Already have a provider account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setAuthMode('signin')}
                                    className="font-bold text-oja-teal dark:text-oja-seafoam hover:underline ml-1"
                                >
                                    Sign in here
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ==================== VERIFY EMAIL VIEW ==================== */}
                    {authMode === 'verify-email' && (
                        <div className="text-center py-4 space-y-4">
                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Check Your Email App</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                We&apos;ve sent a confirmation link to <span className="font-bold text-slate-900 dark:text-white">{email || 'your email'}</span>.
                                Please check your inbox to continue your onboarding application.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    triggerToast('Resent confirmation link to your email!');
                                }}
                                className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                            >
                                Resend Link
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    router.push('/onboarding');
                                }}
                                className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 mt-4"
                            >
                                Proceed to Onboarding Profile
                            </button>
                        </div>
                    )}

                    {/* ==================== FORGOTTEN PASSWORD VIEW ==================== */}
                    {authMode === 'forgot' && (
                        <div className="space-y-6">
                            <button
                                type="button"
                                onClick={() => setAuthMode('signin')}
                                className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                            </button>

                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                    <KeyRound className="w-6 h-6 text-oja-teal" /> Reset Password
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Enter your email address and we&apos;ll send you a 4-digit verification code.
                                </p>
                            </div>

                            <form onSubmit={handleSendResetCode} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        Account Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal placeholder-slate-400"
                                        />
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? <span>Sending Code...</span> : <span>Send Recovery Code</span>}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ==================== VERIFY OTP CODE VIEW ==================== */}
                    {authMode === 'verify-otp' && (
                        <div className="space-y-6">
                            <button
                                type="button"
                                onClick={() => setAuthMode('forgot')}
                                className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Back
                            </button>

                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Enter 4-Digit Code
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    We sent a 4-digit code to <span className="font-bold text-slate-900 dark:text-white">{resetEmail}</span>.
                                </p>
                            </div>

                            <form onSubmit={handleVerifyOtp} className="space-y-5">
                                <div className="flex justify-center gap-3">
                                    {[0, 1, 2, 3].map((idx) => (
                                        <input
                                            key={idx}
                                            id={`otp-${idx}`}
                                            type="text"
                                            maxLength={1}
                                            value={otpCode[idx]}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                const newOtp = [...otpCode];
                                                newOtp[idx] = val;
                                                setOtpCode(newOtp);
                                                if (val && idx < 3) {
                                                    const nextInput = document.getElementById(`otp-${idx + 1}`);
                                                    nextInput?.focus();
                                                }
                                            }}
                                            className="w-12 h-14 bg-slate-50 dark:bg-oja-bg-dark border-2 border-slate-200 dark:border-white/10 rounded-xl text-center text-xl font-bold text-slate-900 dark:text-slate-50 focus:border-oja-teal outline-none transition-colors"
                                        />
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || otpCode.join('').length < 4}
                                    className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? <span>Verifying...</span> : <span>Verify Code</span>}
                                </button>

                                <p className="text-center text-xs text-slate-400">
                                    Didn&apos;t receive a code?{' '}
                                    <button
                                        type="button"
                                        onClick={() => triggerToast('Resent verification code to your email!')}
                                        className="font-bold text-oja-teal dark:text-oja-seafoam hover:underline"
                                    >
                                        Resend Code
                                    </button>
                                </p>
                            </form>
                        </div>
                    )}

                    {/* ==================== CREATE NEW PASSWORD VIEW ==================== */}
                    {authMode === 'reset-password' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Set New Password
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Choose a strong password containing at least 8 characters.
                                </p>
                            </div>

                            <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            minLength={8}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="At least 8 characters"
                                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-10 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal placeholder-slate-400"
                                        />
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            minLength={8}
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            placeholder="Re-enter new password"
                                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-10 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal placeholder-slate-400"
                                        />
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? <span>Updating Password...</span> : <span>Update Password</span>}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ==================== SUCCESS VIEW ==================== */}
                    {authMode === 'success' && (
                        <div className="text-center py-4 space-y-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                                <Check className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Password Reset Complete</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Your password has been successfully updated. You can now log in with your new credentials.
                            </p>
                            <button
                                type="button"
                                onClick={() => setAuthMode('signin')}
                                className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                            >
                                Return to Sign In
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <footer className="text-center text-xs text-slate-400 dark:text-slate-600 z-10 py-4">
                &copy; 2026 Oja Worker Portal Inc. All rights reserved.
            </footer>
        </main>
    );
}
