"use client";

import { useState } from 'react';
import { MapPin, Clock, Check, X, CheckCircle, HandCoins, Search, Filter, Sparkles, ChevronRight, DollarSign, Calendar } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

type JobStatus = 'pending' | 'accepted' | 'declined';

interface JobRequest {
  id: string;
  customerName: string;
  customerPhoto: string;
  title: string;
  category: string;
  date: string;
  time: string;
  price: number;
  distance: string;
  status: JobStatus;
  urgent?: boolean;
}

const mockJobs: JobRequest[] = [
  {
    id: 'req_1',
    customerName: 'Sarah Jenkins',
    customerPhoto: 'https://picsum.photos/seed/sarah/100/100',
    title: 'Deep Cleaning - 3 Bedroom House',
    category: 'Cleaning',
    date: 'Oct 24, 2026',
    time: '09:00 AM',
    price: 180,
    distance: '2.4 mi away',
    status: 'pending',
    urgent: true
  },
  {
    id: 'req_2',
    customerName: 'Marcus Cole',
    customerPhoto: 'https://picsum.photos/seed/marcus/100/100',
    title: 'Plumbing - Kitchen Sink Leak Repair',
    category: 'Plumbing',
    date: 'Oct 25, 2026',
    time: '14:30 PM',
    price: 95,
    distance: '4.1 mi away',
    status: 'pending',
    urgent: false
  },
  {
    id: 'req_3',
    customerName: 'Elena Rodriguez',
    customerPhoto: 'https://picsum.photos/seed/elena/100/100',
    title: 'Furniture Assembly - Custom Wardrobe',
    category: 'Assembly',
    date: 'Oct 26, 2026',
    time: '11:00 AM',
    price: 120,
    distance: '1.8 mi away',
    status: 'pending',
    urgent: false
  },
  {
    id: 'req_4',
    customerName: 'David K.',
    customerPhoto: 'https://picsum.photos/seed/david/100/100',
    title: 'Electrical Panel Upgrade & Circuit Check',
    category: 'Electrical',
    date: 'Oct 27, 2026',
    time: '10:00 AM',
    price: 240,
    distance: '3.0 mi away',
    status: 'pending',
    urgent: true
  }
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobRequest[]>(mockJobs);
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [sortBy, setSortBy] = useState<'Newest' | 'Highest paying' | 'Closest'>('Newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 3500);
  };

  const handleAction = (id: string, action: JobStatus, title: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: action } : j));
    if (action === 'accepted') {
      showToast(`🎉 Accepted "${title}"! Added to active schedule.`);
    } else {
      showToast(`Declined request.`);
    }
  };

  const filteredJobs = jobs
    .filter(j => j.status === activeTab)
    .filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'Highest paying') return b.price - a.price;
      if (sortBy === 'Closest') return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-32">
      {/* Toast Notification */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 left-4 right-4 z-50 max-w-lg mx-auto bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700/40 text-xs font-semibold"
          >
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="flex-1">{activeToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-200/60 dark:border-white/10 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Job Board & Requests</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage customer job offers, proposals, and schedules</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">Sort by:</span>
            <select
              className="bg-slate-100 dark:bg-white/5 font-bold text-xs text-oja-teal dark:text-oja-seafoam border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="Newest">Newest First</option>
              <option value="Highest paying">Highest Paying ($)</option>
              <option value="Closest">Closest Distance</option>
            </select>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 mt-4 pt-2 border-t border-slate-100 dark:border-white/5">
          {(['pending', 'accepted', 'declined'] as const).map((tab) => {
            const count = jobs.filter(j => j.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-xl text-xs font-extrabold capitalize transition-all flex items-center gap-1.5 ${activeTab === tab
                    ? 'bg-oja-teal text-white shadow-md'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                <span>{tab} Requests</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Search & Filter Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job title or customer name..."
            className="w-full bg-white dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal shadow-sm placeholder-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Responsive Grid Layout for Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-oja-surface-dark rounded-3xl p-5 shadow-sm border border-slate-200/60 dark:border-white/10 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  {/* Top accent border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-oja-teal to-oja-orange" />

                  <div>
                    <div className="flex justify-between items-start mb-4 mt-2">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={job.customerPhoto}
                          alt={job.customerName}
                          width={48}
                          height={48}
                          className="rounded-2xl bg-slate-100 object-cover shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{job.customerName}</p>
                          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5 space-x-1">
                            <MapPin size={12} className="text-oja-orange" />
                            <span>{job.distance}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-black text-oja-teal dark:text-oja-seafoam">${job.price}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Guaranteed Payout</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-oja-teal dark:text-oja-seafoam bg-oja-teal/10 px-2.5 py-0.5 rounded-md">
                        {job.category}
                      </span>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base mt-1.5 leading-snug">{job.title}</h3>

                      <div className="flex items-center text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-oja-bg-dark/60 rounded-xl p-2.5 px-3 mt-3">
                        <Clock size={14} className="mr-2 text-oja-orange shrink-0" />
                        <span>{job.date} • {job.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {activeTab === 'pending' && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                      <button
                        onClick={() => handleAction(job.id, 'accepted', job.title)}
                        className="flex-1 flex items-center justify-center bg-oja-teal hover:bg-oja-teal/90 text-white py-2.5 rounded-2xl font-bold text-xs shadow-sm transition-all active:scale-95 gap-1.5"
                      >
                        <Check size={16} /> Accept
                      </button>
                      <button
                        onClick={() => handleAction(job.id, 'declined', job.title)}
                        className="flex-1 flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 py-2.5 rounded-2xl font-bold text-xs transition-all active:scale-95 gap-1.5"
                      >
                        <X size={16} /> Decline
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-oja-surface-dark rounded-3xl border border-slate-200/60 dark:border-white/10"
              >
                <div className="w-20 h-20 bg-oja-teal/10 dark:bg-oja-seafoam/10 rounded-3xl flex items-center justify-center mb-4">
                  <CheckCircle size={44} className="text-oja-teal dark:text-oja-seafoam" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">No {activeTab} requests</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                  You have zero {activeTab} requests right now. Ensure your availability toggle is ON to receive incoming customer orders.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
