"use client";

import { ChevronLeft, MapPin, Check, Navigation, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function WorkAreaPage() {
  const router = useRouter();
  const [radius, setRadius] = useState(15);
  const [zipCode, setZipCode] = useState('10001');
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => {
      setActiveToast(null);
      router.push('/profile');
    }, 1500);
  };

  const handleSave = () => {
    showToast(`📍 Service area updated: ${radius} miles around ZIP ${zipCode}!`);
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
              <h1 className="text-xl font-black text-slate-900 dark:text-white">Service Area & Travel Radius</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Specify base location and job search perimeter</p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="text-xs font-bold px-4 py-2.5 bg-oja-teal text-white rounded-xl shadow-sm hover:bg-oja-teal/90 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Check size={16} /> Save Area
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Settings Card */}
        <div className="bg-white dark:bg-oja-surface-dark p-6 rounded-3xl shadow-sm border border-slate-200/60 dark:border-white/10 space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Base Location (ZIP Code or City)</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-oja-orange" />
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
              />
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Max Travel Radius</label>
              <span className="text-xs font-black text-oja-teal dark:text-oja-seafoam bg-oja-teal/10 px-3 py-1 rounded-full">
                {radius} Miles Radius
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-oja-teal cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
              <span>5 mi</span>
              <span>25 mi</span>
              <span>50 mi</span>
            </div>
          </div>
        </div>

        {/* Map Perimeter Visualization */}
        <div className="bg-slate-900 rounded-3xl h-72 relative overflow-hidden flex flex-col items-center justify-center text-center p-6 border border-slate-800 shadow-lg">
          {/* Animated Perimeter Circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-2 border-oja-teal/40 rounded-full animate-ping opacity-25" />
            <div className="w-48 h-48 border-2 border-oja-orange/40 rounded-full animate-pulse" />
            <div className="w-32 h-32 bg-oja-teal/20 rounded-full blur-xl" />
          </div>

          <div className="relative z-10 space-y-2">
            <div className="h-12 w-12 rounded-2xl bg-oja-teal text-white flex items-center justify-center mx-auto shadow-xl">
              <Navigation size={24} />
            </div>
            <h3 className="font-extrabold text-white text-base">Coverage Active: {radius} Miles around {zipCode}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You will automatically receive high-priority job request notifications within this geographical zone.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
