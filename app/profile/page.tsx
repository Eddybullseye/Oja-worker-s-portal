"use client";

import { User, Settings, Star, TrendingUp, ShieldCheck, CreditCard, HelpCircle, ChevronRight, MapPin, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Profile Header */}
      <div className="bg-white dark:bg-oja-surface-dark pb-6 rounded-b-3xl shadow-sm border-b border-slate-100 dark:border-white/5">
        <div className="h-32 bg-gradient-to-r from-oja-teal to-oja-seafoam relative">
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link href="/settings" className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors">
              <Settings size={20} />
            </Link>
          </div>
        </div>
        
        <div className="px-4 -mt-12 flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-oja-surface-dark overflow-hidden bg-slate-200">
              <Image 
                src="https://picsum.photos/seed/workerprofile/200/200" 
                alt="Profile" 
                width={96} 
                height={96}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-oja-teal text-white p-1 rounded-full border-2 border-white dark:border-oja-surface-dark">
              <ShieldCheck size={14} />
            </div>
          </div>
          
          <h1 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">Alex Wong</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Verified Professional</p>
          
          <div className="flex items-center space-x-1 mt-2 text-oja-orange font-medium text-sm bg-oja-orange/10 px-3 py-1 rounded-full">
            <Star size={14} fill="currentColor" />
            <span>4.9 (24 Reviews)</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/earnings" className="bg-white dark:bg-oja-surface-dark p-4 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-slate-100 dark:border-white/5 active:scale-95 transition-transform">
            <div className="w-10 h-10 rounded-full bg-oja-teal/10 dark:bg-oja-seafoam/10 text-oja-teal dark:text-oja-seafoam flex items-center justify-center mb-2">
              <TrendingUp size={20} />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Earnings</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">$1,240 this mo</span>
          </Link>
          
          <Link href="/portfolio" className="bg-white dark:bg-oja-surface-dark p-4 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-slate-100 dark:border-white/5 active:scale-95 transition-transform">
            <div className="w-10 h-10 rounded-full bg-oja-orange/10 text-oja-orange flex items-center justify-center mb-2">
              <ImageIcon size={20} />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Portfolio</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">12 Items</span>
          </Link>
        </div>

        {/* Menu Sections */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
            <Link href="/profile/edit" className="flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <User size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Personal Info</span>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </Link>
            
            <Link href="/profile/services" className="flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Settings size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Services & Pricing</span>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </Link>

            <Link href="/profile/area" className="flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <MapPin size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Service Area</span>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </Link>
          </div>

          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
            <Link href="/payouts" className="flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <CreditCard size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Bank & Payouts</span>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </Link>
            
            <Link href="/help" className="flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <HelpCircle size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Help Center</span>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </Link>
          </div>
          
          <button className="w-full bg-white dark:bg-oja-surface-dark py-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 text-rose-500 font-medium active:bg-slate-50 dark:active:bg-white/5 transition-colors">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
