"use client";

import { ChevronLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function WorkAreaPage() {
  const [radius, setRadius] = useState(15);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/profile" className="mr-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Work Area</h1>
        </div>
        <button className="text-oja-teal font-medium text-sm px-3 py-1 bg-oja-teal/10 rounded-lg">Save</button>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-oja-surface-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 space-y-4">
          <div>
            <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Base Location (Zip Code)</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" defaultValue="94110" className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm dark:text-white outline-none focus:border-oja-teal transition-colors" />
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-500 dark:text-slate-400">Travel Radius</label>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{radius} miles</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="50" 
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-oja-teal"
            />
          </div>
        </div>

        <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-64 flex items-center justify-center border border-slate-100 dark:border-white/5">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Map visualization here</p>
        </div>
      </div>
    </div>
  );
}
