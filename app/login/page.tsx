"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('oja_worker_auth', 'true');
      router.push('/');
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-oja-bg-dark">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 bg-oja-teal rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              O
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8">
            Sign in to manage your jobs and earnings.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white placeholder:text-slate-400 transition-shadow"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
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

            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm font-medium text-oja-teal dark:text-oja-seafoam hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white py-3.5 rounded-xl font-medium shadow-sm transition-colors flex justify-center items-center"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-oja-teal dark:text-oja-seafoam hover:underline">
                Sign up as a Provider
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
