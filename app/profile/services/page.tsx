"use client";

import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/profile" className="mr-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Services</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-oja-surface-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-3 font-semibold text-sm">
              CL
            </div>
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Deep Cleaning</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">$35/hr • Active</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-rose-500 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>

        <button className="w-full bg-white dark:bg-oja-surface-dark border border-dashed border-slate-300 dark:border-white/20 p-4 rounded-2xl shadow-sm flex items-center justify-center text-oja-teal hover:border-oja-teal transition-colors">
          <Plus size={20} className="mr-2" />
          <span className="font-medium text-sm">Add New Service</span>
        </button>
      </div>
    </div>
  );
}
