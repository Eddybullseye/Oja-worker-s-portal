"use client";

import { useState, useEffect } from 'react';
import { Bell, MapPin, Star, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Job = {
  id: string;
  title: string;
  customer: string;
  price: number;
  time: string;
  distance: string;
};

const initialJobs: Job[] = [
  { id: '1', title: 'Plumbing Fix - Leak', customer: 'Sarah M.', price: 85, time: 'Today, 2:00 PM', distance: '1.2 miles away' },
  { id: '2', title: 'Electrical Installation', customer: 'David K.', price: 120, time: 'Tomorrow, 10:00 AM', distance: '3.5 miles away' }
];

export default function DashboardPage() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(true);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isOffline, setIsOffline] = useState(() => typeof window !== 'undefined' ? !navigator.onLine : false);
  const [syncQueue, setSyncQueue] = useState<any[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (syncQueue.length > 0) {
        console.log("Syncing offline actions...", syncQueue);
        alert(`Synced ${syncQueue.length} offline actions.`);
        setSyncQueue([]);
      }
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncQueue]);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return;
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('Oja Worker', {
        body: 'You will now receive job alerts!',
        icon: '/icon-192x192.png'
      });
    }
  };

  const handleJobAction = (jobId: string, action: 'accept' | 'decline') => {
    setJobs(jobs.filter(j => j.id !== jobId));

    if (isOffline) {
      setSyncQueue([...syncQueue, { jobId, action }]);
      // In a real app, this would use Workbox Background Sync
      console.log(`Action '${action}' queued for job ${jobId}`);
    } else {
      console.log(`Action '${action}' processed for job ${jobId}`);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-oja-teal text-white p-4 pt-10 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center overflow-hidden">
              <span className="font-bold">AW</span>
            </div>
            <div>
              <h1 className="font-semibold text-lg leading-tight">Hi, Alex</h1>
              <p className="text-white/80 text-xs">Ready for work</p>
            </div>
          </div>
          <button
            onClick={requestNotificationPermission}
            className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-oja-orange rounded-full border-2 border-oja-teal"></span>
          </button>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div>
            <p className="font-medium">Availability</p>
            <p className="text-xs text-white/80">{isAvailable ? 'Taking new jobs' : 'Not taking jobs'}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
            />
            <div className="w-11 h-6 bg-white/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-oja-orange"></div>
          </label>
        </div>
      </header>

      <div className="p-4 space-y-6 -mt-4 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-white/5">
            <div className="flex items-center space-x-2 text-oja-teal dark:text-oja-seafoam mb-2">
              <TrendingUp size={16} />
              <h2 className="text-sm font-medium">This Week</h2>
            </div>
            <p className="text-2xl font-bold">$420.50</p>
            <p className="text-xs text-slate-500 mt-1">+12% from last week</p>
          </div>

          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-white/5">
            <div className="flex items-center space-x-2 text-oja-orange mb-2">
              <Star size={16} fill="currentColor" />
              <h2 className="text-sm font-medium">Rating</h2>
            </div>
            <p className="text-2xl font-bold">4.9</p>
            <p className="text-xs text-slate-500 mt-1">Based on 24 reviews</p>
          </div>
        </div>

        {/* Job Requests */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold dark:text-white">New Requests ({jobs.length})</h2>
            <button
              onClick={() => router.push('/jobs')}
              className="text-oja-teal dark:text-oja-seafoam text-sm font-medium hover:underline"
            >View all</button>
          </div>

          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="text-center py-8 bg-white dark:bg-oja-surface-dark rounded-2xl border border-slate-100 dark:border-white/5">
                <p className="text-slate-500">No new requests</p>
              </div>
            ) : (
              jobs.map(job => (
                <div key={job.id} className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-base">{job.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{job.customer}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-oja-teal dark:text-oja-seafoam">${job.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{job.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{job.distance}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleJobAction(job.id, 'accept')}
                      className="flex-1 bg-oja-teal text-white py-2 rounded-xl text-sm font-medium hover:bg-oja-teal/90 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleJobAction(job.id, 'decline')}
                      className="flex-1 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 py-2 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Up Next */}
        <section>
          <h2 className="text-lg font-semibold dark:text-white mb-4">Up Next</h2>
          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border-l-4 border-l-oja-orange border-y border-r border-y-slate-100 border-r-slate-100 dark:border-y-white/5 dark:border-r-white/5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm">HVAC Maintenance</h3>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1 space-x-2">
                  <Clock size={12} />
                  <span>In 45 mins</span>
                  <span>•</span>
                  <span>John D.</span>
                </div>
              </div>
              <button
                onClick={() => router.push('/calendar')}
                className="h-8 w-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-oja-teal dark:text-oja-seafoam hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                aria-label="Navigate to calendar"
              >
                <MapPin size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
