"use client";

import { ChevronLeft, Search, MessageCircle, FileText, Phone } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const faqs = [
    "How do I get paid?",
    "What happens if I need to cancel a job?",
    "How do I update my service area?",
    "How is my rating calculated?"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 flex items-center">
        <Link href="/profile" className="mr-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
        </Link>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Help & Support</h1>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="w-full bg-white dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white transition-shadow"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-oja-surface-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center active:bg-slate-50 dark:active:bg-white/5 transition-colors cursor-pointer">
            <MessageCircle size={24} className="text-oja-teal mb-2" />
            <h3 className="font-medium text-sm text-slate-900 dark:text-white">Chat Support</h3>
          </div>
          <div className="bg-white dark:bg-oja-surface-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center active:bg-slate-50 dark:active:bg-white/5 transition-colors cursor-pointer">
            <Phone size={24} className="text-oja-teal mb-2" />
            <h3 className="font-medium text-sm text-slate-900 dark:text-white">Call Us</h3>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider px-2">Frequently Asked Questions</h2>
          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-200">
                  <FileText size={16} className="text-slate-400 mr-3" />
                  {faq}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
