"use client";

import { ChevronLeft, Camera } from 'lucide-react';
import Link from 'next/link';

export default function EditProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/profile" className="mr-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Edit Profile</h1>
        </div>
        <button className="text-oja-teal font-medium text-sm px-3 py-1 bg-oja-teal/10 rounded-lg">Save</button>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-tr from-oja-teal to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
              SJ
            </div>
            <button className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              <Camera size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-oja-surface-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 space-y-4">
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">First Name</label>
              <input type="text" defaultValue="Sarah" className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white outline-none focus:border-oja-teal transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Last Name</label>
              <input type="text" defaultValue="Jenkins" className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white outline-none focus:border-oja-teal transition-colors" />
            </div>
          </div>

          <div className="bg-white dark:bg-oja-surface-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 space-y-4">
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Bio</label>
              <textarea rows={4} defaultValue="Professional cleaner with 5 years of experience. I take pride in leaving spaces spotless and organized." className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white outline-none focus:border-oja-teal transition-colors resize-none"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
