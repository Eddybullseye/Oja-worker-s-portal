"use client";

import { useState } from 'react';
import { MapPin, Clock, MoreHorizontal, Check, X, CheckCircle, RefreshCcw, HandCoins } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

type JobStatus = 'pending' | 'accepted' | 'declined';

interface JobRequest {
  id: string;
  customerName: string;
  customerPhoto: string;
  title: string;
  date: string;
  time: string;
  price: number;
  distance: string;
  status: JobStatus;
}

const mockJobs: JobRequest[] = [
  {
    id: 'req_1',
    customerName: 'Sarah Jenkins',
    customerPhoto: 'https://picsum.photos/seed/sarah/100/100',
    title: 'Deep Cleaning - 3 Bedroom House',
    date: 'Oct 24, 2024',
    time: '09:00 AM',
    price: 180,
    distance: '2.4 mi',
    status: 'pending',
  },
  {
    id: 'req_2',
    customerName: 'Marcus Cole',
    customerPhoto: 'https://picsum.photos/seed/marcus/100/100',
    title: 'Plumbing - Kitchen Sink Leak',
    date: 'Oct 25, 2024',
    time: '14:30 PM',
    price: 95,
    distance: '4.1 mi',
    status: 'pending',
  },
  {
    id: 'req_3',
    customerName: 'Elena Rodriguez',
    customerPhoto: 'https://picsum.photos/seed/elena/100/100',
    title: 'Furniture Assembly - Wardrobe',
    date: 'Oct 26, 2024',
    time: '11:00 AM',
    price: 120,
    distance: '1.8 mi',
    status: 'pending',
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobRequest[]>(mockJobs);
  const [filter, setFilter] = useState<'Newest' | 'Highest paying' | 'Closest'>('Newest');

  const handleAction = (id: string, action: JobStatus) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: action } : j));
  };

  const pendingJobs = jobs.filter(j => j.status === 'pending');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Job Requests</h1>
        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <span>Sort by:</span>
          <select 
            className="bg-transparent font-medium text-oja-teal dark:text-oja-seafoam outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option>Newest</option>
            <option>Highest paying</option>
            <option>Closest</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        <AnimatePresence>
          {pendingJobs.length > 0 ? (
            pendingJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden relative"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-oja-teal dark:bg-oja-seafoam" />
                
                <div className="flex justify-between items-start mb-4 mt-2">
                  <div className="flex items-center space-x-3">
                    <Image 
                      src={job.customerPhoto}
                      alt={job.customerName}
                      width={48}
                      height={48}
                      className="rounded-full bg-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{job.customerName}</p>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5 space-x-1">
                        <MapPin size={12} />
                        <span>{job.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-oja-teal dark:text-oja-seafoam">${job.price}</p>
                    <p className="text-xs text-slate-500">Est. total</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-1">{job.title}</h3>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-lg p-2 px-3">
                    <Clock size={14} className="mr-2 text-oja-orange" />
                    <span>{job.date} • {job.time}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button 
                    onClick={() => handleAction(job.id, 'accepted')}
                    className="flex-1 flex items-center justify-center bg-oja-teal text-white py-2.5 rounded-xl font-medium text-sm hover:bg-oja-teal/90 transition-colors"
                  >
                    <Check size={16} className="mr-1.5" /> Accept
                  </button>
                  <button 
                    onClick={() => handleAction(job.id, 'declined')}
                    className="flex-1 flex items-center justify-center bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <X size={16} className="mr-1.5" /> Decline
                  </button>
                  <button className="flex items-center justify-center px-4 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <HandCoins size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center py-16 px-4 text-center"
            >
              <div className="w-24 h-24 bg-oja-teal/10 dark:bg-oja-seafoam/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-oja-teal dark:text-oja-seafoam" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">You&apos;re all caught up!</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[250px]">
                No new job requests at the moment. Keep your availability on to receive more requests.
              </p>
              <button className="bg-oja-orange hover:bg-[#E09015] text-white px-6 py-3 rounded-xl font-medium shadow-sm transition-colors">
                Boost Your Profile
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
