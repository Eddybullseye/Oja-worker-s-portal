"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ChevronLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 300);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-oja-bg-dark">
      <header className="px-4 py-4 flex items-center sticky top-0 bg-white dark:bg-oja-bg-dark z-40">
        <Link href="/login" className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10">
          <ChevronLeft size={24} className="dark:text-white" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col justify-center px-6 pb-24">
        <div className="mx-auto w-full max-w-sm">
          {!isSent ? (
            <>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                Enter your email address and we&apos;ll send you instructions to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="Email address" 
                    className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white placeholder:text-slate-400 transition-shadow"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white py-3.5 rounded-xl font-medium shadow-sm transition-colors flex justify-center items-center"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-oja-teal/10 dark:bg-oja-seafoam/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={32} className="text-oja-teal dark:text-oja-seafoam" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Check Your Email</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                We&apos;ve sent password reset instructions to your email address.
              </p>
              <Link 
                href="/login" 
                className="inline-block bg-slate-100 hover:bg-slate-200 dark:bg-oja-surface-dark dark:hover:bg-white/10 text-slate-900 dark:text-white py-3.5 px-8 rounded-xl font-medium transition-colors"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
