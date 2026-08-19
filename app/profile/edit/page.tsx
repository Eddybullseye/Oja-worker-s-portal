"use client";

import { ChevronLeft, Camera, Check, ShieldCheck, User, Phone, Mail, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function EditProfilePage() {
  const router = useRouter();
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => {
      setActiveToast(null);
      router.push('/profile');
    }, 1500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('✨ Profile changes saved successfully!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-32">
      {/* Toast Notification */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 left-4 right-4 z-50 max-w-md mx-auto bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700/40 text-xs font-semibold"
          >
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="flex-1">{activeToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-200/60 dark:border-white/10 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 transition-colors">
              <ChevronLeft size={20} className="text-slate-900 dark:text-white" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white">Edit Profile Details</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Update your public provider profile</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="text-xs font-bold px-4 py-2.5 bg-oja-teal text-white rounded-xl shadow-sm hover:bg-oja-teal/90 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Check size={16} /> Save Changes
          </button>
        </div>
      </header>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <form onSubmit={handleSave} className="space-y-6">

          {/* Photo Upload Avatar */}
          <div className="bg-white dark:bg-oja-surface-dark p-6 rounded-3xl shadow-sm border border-slate-200/60 dark:border-white/10 flex flex-col items-center justify-center text-center">
            <div className="relative mb-3">
              <div className="w-28 h-28 bg-gradient-to-tr from-oja-teal to-teal-800 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg">
                AW
              </div>
              <button
                type="button"
                className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2.5 rounded-2xl shadow-xl border-2 border-white dark:border-oja-surface-dark hover:bg-slate-800 transition-transform active:scale-90"
              >
                <Camera size={16} />
              </button>
            </div>
            <p className="font-bold text-sm text-slate-900 dark:text-white">Alex Walker</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">JPG or PNG under 5MB</p>
          </div>

          {/* Contact & Personal Info Card */}
          <div className="bg-white dark:bg-oja-surface-dark p-6 rounded-3xl shadow-sm border border-slate-200/60 dark:border-white/10 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2">Personal Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">First Name</label>
                <input
                  type="text"
                  defaultValue="Alex"
                  className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Last Name</label>
                <input
                  type="text"
                  defaultValue="Walker"
                  className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  defaultValue="+1 (555) 234-8901"
                  className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  defaultValue="alex.walker@provider.com"
                  className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
                />
              </div>
            </div>
          </div>

          {/* Provider Bio Card */}
          <div className="bg-white dark:bg-oja-surface-dark p-6 rounded-3xl shadow-sm border border-slate-200/60 dark:border-white/10 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2">Professional Bio & Experience</h3>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Provider Bio (Visible to Customers)</label>
              <textarea
                rows={4}
                defaultValue="Licensed master electrician and certified plumber with over 8 years of residential and commercial service experience across the NYC metro region. Specializing in smart home upgrades, pipe leak repairs, and emergency fixes."
                className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal resize-none"
              />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
