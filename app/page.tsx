"use client";

import { useState, useEffect } from 'react';
import {
  Bell,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  Zap,
  DollarSign,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Award,
  Navigation,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

type Job = {
  id: string;
  title: string;
  customer: string;
  category: string;
  price: number;
  time: string;
  distance: string;
  urgent?: boolean;
  location: string;
  customerRating: number;
};

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Emergency Plumbing Repair - Pipe Leak',
    customer: 'Sarah Miller',
    category: 'Plumbing',
    price: 145,
    time: 'Today, 2:30 PM',
    distance: '1.2 miles away',
    urgent: true,
    location: '742 Evergreen Terrace',
    customerRating: 4.9
  },
  {
    id: '2',
    title: 'Smart Home Thermostat Installation',
    customer: 'David K.',
    category: 'Electrical',
    price: 120,
    time: 'Tomorrow, 10:00 AM',
    distance: '3.5 miles away',
    urgent: false,
    location: '120 Ocean Drive',
    customerRating: 4.8
  },
  {
    id: '3',
    title: 'Full House Deep Cleaning & Sanitation',
    customer: 'Elena Rostova',
    category: 'Cleaning',
    price: 210,
    time: 'Fri, 9:00 AM',
    distance: '2.1 miles away',
    urgent: false,
    location: '450 Pine Avenue',
    customerRating: 5.0
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(true);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 3500);
  };

  const handleJobAction = (jobId: string, action: 'accept' | 'decline', jobTitle: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    if (action === 'accept') {
      showToast(`🎉 Job Accepted: ${jobTitle}! Added to your schedule.`);
    } else {
      showToast(`Job declined.`);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-32">
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

      {/* Dynamic Hero Header */}
      <header className="relative bg-gradient-to-br from-oja-teal via-teal-700 to-teal-900 text-white pt-12 pb-16 px-6 rounded-b-[2.5rem] shadow-xl overflow-hidden">
        {/* Decorative Background Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-oja-orange/20 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-md mx-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-black text-lg backdrop-blur-md shadow-inner">
                  AW
                </div>
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-emerald-400 border-2 border-oja-teal rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-bold text-xl leading-tight">Alex Walker</h1>
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300/30 flex items-center gap-1">
                    <Star size={10} className="fill-amber-300" /> Pro
                  </span>
                </div>
                <p className="text-white/80 text-xs font-medium">Licensed Electrical & Plumbing Specialist</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/notifications')}
              className="relative p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md active:scale-95"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-oja-orange rounded-full ring-2 ring-oja-teal" />
            </button>
          </div>

          {/* Availability Card */}
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isAvailable ? 'bg-emerald-400/20 text-emerald-300' : 'bg-slate-400/20 text-slate-300'}`}>
                <Zap size={20} className={isAvailable ? 'animate-bounce' : ''} />
              </div>
              <div>
                <p className="font-bold text-sm">Status: {isAvailable ? 'Taking Job Requests' : 'Offline'}</p>
                <p className="text-xs text-white/70">{isAvailable ? 'Visible to nearby customers' : 'Paused new incoming requests'}</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isAvailable}
                onChange={() => {
                  setIsAvailable(!isAvailable);
                  showToast(!isAvailable ? '🟢 You are now ONLINE & receiving jobs!' : '⚪ You are now OFFLINE');
                }}
              />
              <div className="w-12 h-7 bg-white/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-oja-orange shadow-inner" />
            </label>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 space-y-6 -mt-8 relative z-10 max-w-md mx-auto w-full">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/earnings')}
            className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-200/60 dark:border-white/10 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-oja-teal/5 rounded-full blur-xl group-hover:bg-oja-teal/10 transition-colors" />
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-oja-teal/10 text-oja-teal dark:text-oja-seafoam">
                <DollarSign size={18} />
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp size={12} /> +14.2%
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">$842.50</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">This Week Earnings</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/profile')}
            className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-200/60 dark:border-white/10 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-oja-orange/5 rounded-full blur-xl group-hover:bg-oja-orange/10 transition-colors" />
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-oja-orange/10 text-oja-orange">
                <Star size={18} className="fill-oja-orange" />
              </div>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                99% Score
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">4.95 ⭐</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">38 Customer Reviews</p>
          </motion.div>
        </div>

        {/* Platinum Provider Reward Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between gap-4 relative overflow-hidden"
        >
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Award size={16} className="text-amber-200" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-100">Platinum Status</span>
            </div>
            <h3 className="font-bold text-sm leading-snug">0% Commission Fee Bonus Active!</h3>
            <p className="text-[11px] text-amber-100 mt-0.5">Keep your rating above 4.8 to keep 100% of payout earnings.</p>
          </div>
          <button
            onClick={() => router.push('/profile')}
            className="relative z-10 px-3.5 py-2 bg-white text-orange-600 rounded-xl text-xs font-bold shadow hover:bg-amber-50 transition-colors shrink-0 flex items-center gap-1"
          >
            Details <ArrowUpRight size={14} />
          </button>
        </motion.div>

        {/* Incoming Job Requests */}
        <section className="space-y-3.5">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">New Job Requests</h2>
              <span className="bg-oja-teal/10 text-oja-teal dark:bg-oja-teal/20 dark:text-oja-seafoam text-xs font-bold px-2.5 py-0.5 rounded-full">
                {jobs.length} Available
              </span>
            </div>
            <button
              onClick={() => router.push('/jobs')}
              className="text-oja-teal dark:text-oja-seafoam text-xs font-bold hover:underline flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3.5">
            <AnimatePresence>
              {jobs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white dark:bg-oja-surface-dark rounded-3xl border border-slate-200/60 dark:border-white/10 px-4"
                >
                  <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-3" />
                  <p className="font-bold text-slate-800 dark:text-white">All Caught Up!</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                    No pending job requests right now. Stay online to be first in line when new orders come in.
                  </p>
                </motion.div>
              ) : (
                jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white dark:bg-oja-surface-dark rounded-3xl p-5 shadow-sm border ${job.urgent
                        ? 'border-amber-400/80 dark:border-amber-500/50 ring-2 ring-amber-400/20'
                        : 'border-slate-200/60 dark:border-white/10'
                      } relative overflow-hidden`}
                  >
                    {job.urgent && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-2xl flex items-center gap-1">
                        <Zap size={11} className="fill-white" /> Urgent Demand
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-oja-teal dark:text-oja-seafoam bg-oja-teal/10 px-2 py-0.5 rounded-md">
                          {job.category}
                        </span>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1.5 leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                          <span className="font-medium text-slate-700 dark:text-slate-300">{job.customer}</span>
                          <span>•</span>
                          <span className="flex items-center text-amber-500 font-semibold">
                            <Star size={12} className="fill-amber-500 mr-0.5" /> {job.customerRating}
                          </span>
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="text-xl font-black text-oja-teal dark:text-oja-seafoam">${job.price}</span>
                        <p className="text-[10px] text-slate-400 font-medium">Guaranteed Payout</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-3 px-3.5 bg-slate-50 dark:bg-oja-bg-dark/60 rounded-2xl text-xs text-slate-600 dark:text-slate-300 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-oja-teal shrink-0" />
                        <span className="truncate">{job.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-oja-orange shrink-0" />
                        <span className="truncate">{job.distance}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleJobAction(job.id, 'accept', job.title)}
                        className="flex-1 bg-oja-teal hover:bg-oja-teal/90 text-white py-3 rounded-2xl font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 size={16} /> Accept Job
                      </button>
                      <button
                        onClick={() => handleJobAction(job.id, 'decline', job.title)}
                        className="px-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <XCircle size={16} /> Decline
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Up Next / Active Assignment */}
        <section className="space-y-3">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white px-1">Upcoming Job Schedule</h2>

          <div className="bg-white dark:bg-oja-surface-dark rounded-3xl p-5 shadow-sm border border-slate-200/60 dark:border-white/10 relative">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3.5 mb-3.5">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-oja-orange animate-ping" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Scheduled Today</span>
              </div>
              <span className="text-xs font-bold text-oja-teal dark:text-oja-seafoam bg-oja-teal/10 px-2.5 py-0.5 rounded-full">
                In 45 Mins
              </span>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">HVAC Unit Maintenance & Filter Service</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Client: John Doe • 482 West End Ave</p>
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">$160</span>
            </div>

            <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
              <button
                onClick={() => router.push('/calendar')}
                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <Navigation size={14} /> Start Directions
              </button>
              <button
                onClick={() => router.push('/messages')}
                className="p-2.5 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                aria-label="Message Client"
              >
                <MessageSquare size={16} />
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
