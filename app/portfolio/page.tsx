"use client";

import { ChevronLeft, Plus, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 flex items-center">
        <Link href="/profile" className="mr-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
        </Link>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Portfolio</h1>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-oja-surface-dark rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm border border-slate-100 dark:border-white/5 border-dashed">
          <div className="w-16 h-16 bg-oja-teal/10 dark:bg-oja-seafoam/10 rounded-full flex items-center justify-center mb-4 text-oja-teal dark:text-oja-seafoam">
            <ImageIcon size={32} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Showcase Your Work</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xs">
            Upload photos of your completed jobs to build trust and win more clients.
          </p>
          <button className="bg-oja-teal text-white px-6 py-3 rounded-xl font-medium shadow-sm flex items-center transition-colors hover:bg-oja-teal/90">
            <Plus size={20} className="mr-2" />
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
}
