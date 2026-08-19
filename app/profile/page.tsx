"use client";

import {
  User,
  Settings,
  Star,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  HelpCircle,
  ChevronRight,
  MapPin,
  Image as ImageIcon,
  Award,
  Clock,
  LogOut,
  Sparkles,
  Sliders,
  CheckCircle2,
  Phone,
  Mail,
  Briefcase
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProfilePage() {
  const router = useRouter();
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 3000);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oja_worker_auth');
    }
    showToast('Logged out successfully.');
    setTimeout(() => {
      router.push('/signup');
    }, 800);
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

      {/* Hero Profile Banner Header */}
      <header className="relative bg-white dark:bg-oja-surface-dark pb-8 rounded-b-[2.5rem] shadow-sm border-b border-slate-200/60 dark:border-white/10 overflow-hidden">
        {/* Cover Background */}
        <div className="h-44 sm:h-52 bg-gradient-to-r from-oja-teal via-teal-700 to-slate-900 relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex justify-end">
            <Link
              href="/settings"
              className="p-3 bg-white/15 hover:bg-white/25 backdrop-blur-xl rounded-2xl text-white transition-all border border-white/20 shadow-md active:scale-95 flex items-center gap-2 text-xs font-bold"
            >
              <Settings size={18} />
              <span className="hidden sm:inline">Portal Settings</span>
            </Link>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-4 border-white dark:border-oja-surface-dark shadow-2xl overflow-hidden bg-slate-200">
                <Image
                  src="https://picsum.photos/seed/workerprofile/200/200"
                  alt="Profile Avatar"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1.5 rounded-xl border-2 border-white dark:border-oja-surface-dark shadow-md" title="Verified Service Provider">
                <ShieldCheck size={16} />
              </div>
            </div>

            {/* Title & Badges */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Alex Walker</h1>
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20">
                  <CheckCircle2 size={12} /> Verified Provider
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Master Electrician & Licensed Plumbing Specialist
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/50 dark:border-amber-900/40">
                  <Star size={14} className="fill-amber-500" /> 4.95 (38 Client Reviews)
                </div>
                <div className="flex items-center gap-1 text-oja-teal dark:text-oja-seafoam font-bold bg-oja-teal/10 px-3 py-1 rounded-full">
                  <MapPin size={12} /> 15 Mile Radius
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/profile/edit"
              className="flex-1 sm:flex-none px-5 py-3 bg-oja-teal hover:bg-oja-teal/90 text-white rounded-2xl font-bold text-xs shadow-md transition-all active:scale-95 text-center"
            >
              Edit Profile Info
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body Layout Grid */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="/earnings" className="bg-white dark:bg-oja-surface-dark p-4 rounded-3xl shadow-sm border border-slate-200/60 dark:border-white/10 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-2xl bg-oja-teal/10 text-oja-teal dark:text-oja-seafoam">
                <TrendingUp size={20} />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">Monthly</span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">$3,240.00</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Total Payouts</p>
            </div>
          </Link>

          <Link href="/portfolio" className="bg-white dark:bg-oja-surface-dark p-4 rounded-3xl shadow-sm border border-slate-200/60 dark:border-white/10 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-2xl bg-oja-orange/10 text-oja-orange">
                <ImageIcon size={20} />
              </div>
              <span className="text-[10px] font-bold text-oja-orange bg-oja-orange/10 px-2 py-0.5 rounded-full">12 Photos</span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Portfolio</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Showcase Gallery</p>
            </div>
          </Link>

          <div className="bg-white dark:bg-oja-surface-dark p-4 rounded-3xl shadow-sm border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500">
                <Briefcase size={20} />
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">100% On-time</span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">42 Completed</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Jobs Serviced</p>
            </div>
          </div>

          <div className="bg-white dark:bg-oja-surface-dark p-4 rounded-3xl shadow-sm border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
                <Award size={20} />
              </div>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">Level 3</span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Platinum</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Provider Status</p>
            </div>
          </div>
        </div>

        {/* 2 Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: Profile Navigation Cards */}
          <div className="lg:col-span-7 space-y-6">

            {/* Provider Bio Card */}
            <div className="bg-white dark:bg-oja-surface-dark rounded-3xl p-6 shadow-sm border border-slate-200/60 dark:border-white/10 space-y-3">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">About My Services</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Licensed master electrician and certified plumber with over 8 years of residential and commercial service experience across the New York metro region. Specializing in smart home upgrades, pipe leak repairs, emergency fixes, and custom installations.
              </p>

              <div className="pt-3 flex flex-wrap gap-2">
                {['Licensed Electrician', 'Plumbing Master', 'Smart Home Certified', 'Background Checked', 'Insured Provider'].map((skill, i) => (
                  <span key={i} className="text-xs font-bold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-white/5">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Profile Navigation List */}
            <div className="bg-white dark:bg-oja-surface-dark rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5">
              <Link href="/profile/edit" className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-oja-teal/10 text-oja-teal dark:text-oja-seafoam flex items-center justify-center font-bold">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-oja-teal transition-colors">Personal & Contact Info</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Name, phone, bio, and credentials</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/profile/services" className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-oja-orange/10 text-oja-orange flex items-center justify-center font-bold">
                    <Sliders size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-oja-orange transition-colors">Services & Hourly Rates</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage categories and service prices</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/profile/area" className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">Service Area & Zip Codes</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Travel radius: 15 miles active</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/portfolio" className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                    <ImageIcon size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">Work Portfolio Showcase</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Upload before & after job photos</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Account & Settings */}
          <div className="lg:col-span-5 space-y-6">

            {/* Payout & Banking Section */}
            <div className="bg-white dark:bg-oja-surface-dark rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5">
              <div className="p-5 bg-slate-50/50 dark:bg-oja-bg-dark/30">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Financial & Support</h3>
              </div>

              <Link href="/payouts" className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Bank Account & Payouts</span>
                    <p className="text-xs text-slate-500">PNC Direct Deposit • Active</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/help" className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Worker Help & Support</span>
                    <p className="text-xs text-slate-500">24/7 Priority Provider Hotline</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Logout Action Card */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 p-4 rounded-3xl text-rose-600 dark:text-rose-400 font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <LogOut size={18} /> Sign Out of Worker Portal
            </motion.button>

          </div>

        </div>
      </div>
    </div>
  );
}
