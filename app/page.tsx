"use client";

import { useState } from 'react';
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
  ArrowUpRight,
  Search,
  Filter,
  Check,
  Calendar as CalendarIcon,
  SlidersHorizontal,
  ThumbsUp,
  ExternalLink,
  Sliders
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
  },
  {
    id: '4',
    title: 'Custom Wooden Bookshelf Assembly',
    customer: 'Marcus Thorne',
    category: 'Carpentry',
    price: 175,
    time: 'Sat, 1:00 PM',
    distance: '4.0 miles away',
    urgent: true,
    location: '88 Oakridge Lane',
    customerRating: 4.95
  }
];

const mockReviews = [
  { id: 1, author: "Sarah M.", rating: 5, text: "Alex arrived on time and fixed our pipe leak in under 30 minutes! Super clean work.", date: "Yesterday" },
  { id: 2, author: "Robert G.", rating: 5, text: "Extremely professional electrician. Explained everything clearly before starting.", date: "3 days ago" }
];

export default function DashboardPage() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(true);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [jobCategoryFilter, setJobCategoryFilter] = useState<'All' | 'Urgent' | 'High Payout'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 3500);
  };

  const handleJobAction = (jobId: string, action: 'accept' | 'decline', jobTitle: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    if (action === 'accept') {
      showToast(`🎉 Job Accepted: "${jobTitle}"! Added to your active schedule.`);
    } else {
      showToast(`Job request declined.`);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.customer.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (jobCategoryFilter === 'Urgent') return j.urgent;
    if (jobCategoryFilter === 'High Payout') return j.price >= 150;
    return true;
  });

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-32">
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

      {/* Dynamic Responsive Hero Header */}
      <header className="relative bg-gradient-to-br from-oja-teal via-teal-800 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 rounded-b-[2.5rem] shadow-xl overflow-hidden">
        {/* Ambient Lighting & Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-oja-orange/20 rounded-full blur-3xl pointer-events-none -mb-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* User Details */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-black text-xl sm:text-2xl backdrop-blur-md shadow-inner">
                  AW
                </div>
                <span className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-400 border-2 border-oja-teal rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-extrabold text-2xl sm:text-3xl leading-tight">Welcome back, Alex</h1>
                  <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-300/30 flex items-center gap-1">
                    <Star size={12} className="fill-amber-300" /> Platinum Provider
                  </span>
                </div>
                <p className="text-white/80 text-xs sm:text-sm font-medium mt-1">
                  Licensed Electrical & Plumbing Specialist • NYC Metro Region
                </p>
              </div>
            </div>

            {/* Top Right Action & Live Availability Bar */}
            <div className="flex items-center gap-3.5 self-start md:self-auto w-full md:w-auto justify-between md:justify-end">
              {/* Availability Toggle */}
              <div className="bg-white/15 backdrop-blur-xl rounded-2xl px-4 py-2.5 border border-white/20 shadow-lg flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${isAvailable ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`} />
                  <span className="font-bold text-xs sm:text-sm">{isAvailable ? 'Online & Available' : 'Offline'}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isAvailable}
                    onChange={() => {
                      setIsAvailable(!isAvailable);
                      showToast(!isAvailable ? '🟢 Online: You will now receive new job alerts!' : '⚪ Offline: Requests paused');
                    }}
                  />
                  <div className="w-11 h-6 bg-white/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-oja-orange shadow-inner" />
                </label>
              </div>

              {/* Notification Button */}
              <button
                onClick={() => router.push('/notifications')}
                className="relative p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md active:scale-95 text-white"
                aria-label="Notifications"
              >
                <Bell size={22} />
                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-oja-orange rounded-full ring-2 ring-oja-teal" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Responsive Grid Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

          {/* LEFT & CENTER COLUMN (Main Content) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">

            {/* 4 Stats Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
              <motion.div
                whileHover={{ y: -3 }}
                onClick={() => router.push('/earnings')}
                className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-200/60 dark:border-white/10 cursor-pointer relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-oja-teal/10 text-oja-teal dark:text-oja-seafoam">
                    <DollarSign size={18} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp size={12} /> +14.2%
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">$842.50</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Weekly Earnings</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                onClick={() => router.push('/profile')}
                className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-200/60 dark:border-white/10 cursor-pointer relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <Star size={18} className="fill-amber-500" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                    38 Reviews
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">4.95 ⭐</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Rating Score</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                onClick={() => router.push('/jobs')}
                className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-200/60 dark:border-white/10 cursor-pointer relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                    <Briefcase size={18} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">42 Jobs</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Total Services</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                onClick={() => router.push('/settings')}
                className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-200/60 dark:border-white/10 cursor-pointer relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                    Top Tier
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">98.5%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Acceptance Rate</p>
              </motion.div>
            </div>

            {/* Platinum Provider Reward Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
            >
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Award size={18} className="text-amber-200" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-100">Platinum Tier Bonus Active</span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg leading-snug">0% Platform Commission Fee Unlocked!</h3>
                <p className="text-xs text-amber-100 mt-1 max-w-xl">
                  Congratulations! Because your rating is above 4.8, you retain 100% of your earnings on all jobs completed this week.
                </p>
              </div>
              <button
                onClick={() => router.push('/profile')}
                className="relative z-10 px-4 py-2.5 bg-white text-orange-600 rounded-2xl text-xs font-bold shadow-md hover:bg-amber-50 transition-all shrink-0 flex items-center gap-1.5 active:scale-95"
              >
                View Tier Perks <ArrowUpRight size={14} />
              </button>
            </motion.div>

            {/* Incoming Job Requests Section */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Incoming Job Requests</span>
                    <span className="bg-oja-teal/10 text-oja-teal dark:bg-oja-teal/20 dark:text-oja-seafoam text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                      {filteredJobs.length} Live
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Available requests near your service radius</p>
                </div>

                {/* Filter Switcher Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-200/60 dark:bg-white/5 p-1 rounded-2xl self-start sm:self-auto text-xs font-bold">
                  {(['All', 'Urgent', 'High Payout'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setJobCategoryFilter(tab)}
                      className={`px-3 py-1.5 rounded-xl transition-all ${jobCategoryFilter === tab
                          ? 'bg-white dark:bg-oja-surface-dark text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search job title, customer name, or category..."
                  className="w-full bg-white dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-oja-teal shadow-sm placeholder-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Responsive Job Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {filteredJobs.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="md:col-span-2 text-center py-12 bg-white dark:bg-oja-surface-dark rounded-3xl border border-slate-200/60 dark:border-white/10 px-4"
                    >
                      <CheckCircle2 size={44} className="mx-auto text-emerald-500 mb-3" />
                      <p className="font-bold text-slate-800 dark:text-white text-base">No Matching Requests</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                        No pending job requests found for this filter. Try clearing filters or stay online for new alerts.
                      </p>
                    </motion.div>
                  ) : (
                    filteredJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: -50 }}
                        transition={{ duration: 0.25 }}
                        className={`bg-white dark:bg-oja-surface-dark rounded-3xl p-5 shadow-sm border ${job.urgent
                            ? 'border-amber-400/80 dark:border-amber-500/50 ring-2 ring-amber-400/20'
                            : 'border-slate-200/60 dark:border-white/10'
                          } relative flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow`}
                      >
                        {job.urgent && (
                          <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-2xl flex items-center gap-1">
                            <Zap size={11} className="fill-white" /> High Urgency
                          </div>
                        )}

                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-oja-teal dark:text-oja-seafoam bg-oja-teal/10 px-2.5 py-0.5 rounded-md">
                                {job.category}
                              </span>
                              <h3 className="font-bold text-slate-900 dark:text-white text-base mt-2 leading-snug">
                                {job.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                                <span className="font-medium text-slate-700 dark:text-slate-300">{job.customer}</span>
                                <span>•</span>
                                <span className="flex items-center text-amber-500 font-semibold">
                                  <Star size={12} className="fill-amber-500 mr-0.5" /> {job.customerRating}
                                </span>
                              </p>
                            </div>
                            <div className="text-right shrink-0 ml-2">
                              <span className="text-xl font-black text-oja-teal dark:text-oja-seafoam">${job.price}</span>
                              <p className="text-[10px] text-slate-400 font-medium">Payout</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 py-2.5 px-3 bg-slate-50 dark:bg-oja-bg-dark/60 rounded-2xl text-xs text-slate-600 dark:text-slate-300 mb-4">
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} className="text-oja-teal shrink-0" />
                              <span className="truncate">{job.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin size={14} className="text-oja-orange shrink-0" />
                              <span className="truncate">{job.distance}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                          <button
                            onClick={() => handleJobAction(job.id, 'accept', job.title)}
                            className="flex-1 bg-oja-teal hover:bg-oja-teal/90 text-white py-2.5 rounded-2xl font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 size={16} /> Accept Job
                          </button>
                          <button
                            onClick={() => handleJobAction(job.id, 'decline', job.title)}
                            className="px-3.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 py-2.5 rounded-2xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
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
          </div>

          {/* RIGHT COLUMN (Sidebar / Upcoming Schedule / Quick Tools) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Active Schedule Card */}
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
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">HVAC Maintenance & Service</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Client: John Doe • 482 West End Ave</p>
                </div>
                <span className="font-extrabold text-lg text-slate-900 dark:text-white">$160</span>
              </div>

              <div className="flex items-center gap-2.5 mt-5 pt-3 border-t border-slate-100 dark:border-white/5">
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

            {/* Provider Quick Actions Card */}
            <div className="bg-white dark:bg-oja-surface-dark rounded-3xl p-5 shadow-sm border border-slate-200/60 dark:border-white/10 space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2">Quick Provider Actions</h3>

              <button
                onClick={() => router.push('/earnings')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-oja-bg-dark hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-200/50 dark:border-white/5 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign size={16} className="text-oja-teal" />
                  <span>Request Instant Payout</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              <button
                onClick={() => router.push('/profile/services')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-oja-bg-dark hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-200/50 dark:border-white/5 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Sliders size={16} className="text-oja-orange" />
                  <span>Manage Service Offerings</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              <button
                onClick={() => router.push('/portfolio')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-oja-bg-dark hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-200/50 dark:border-white/5 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} className="text-amber-500" />
                  <span>Upload Portfolio Photos</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>

            {/* Recent Reviews Feed */}
            <div className="bg-white dark:bg-oja-surface-dark rounded-3xl p-5 shadow-sm border border-slate-200/60 dark:border-white/10 space-y-3">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Recent Customer Feedback</h3>
                <span className="text-xs font-bold text-oja-teal dark:text-oja-seafoam">4.95 Avg</span>
              </div>

              <div className="space-y-3">
                {mockReviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-slate-50 dark:bg-oja-bg-dark/50 rounded-2xl border border-slate-100 dark:border-white/5 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">{rev.author}</span>
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star size={12} className="fill-amber-500 mr-0.5" /> {rev.rating}.0
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 italic">&ldquo;{rev.text}&rdquo;</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
