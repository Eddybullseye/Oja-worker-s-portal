"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function CalendarPage() {
  const [view, setView] = useState<'Weekly' | 'Monthly'>('Weekly');
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [20, 21, 22, 23, 24, 25, 26];

  const schedule = [
    { id: 1, title: 'Deep Cleaning', customer: 'Sarah J.', time: '09:00 AM - 12:00 PM', status: 'confirmed', location: '123 Main St' },
    { id: 2, title: 'Plumbing Fix', customer: 'Marcus C.', time: '14:30 PM - 16:00 PM', status: 'pending', location: '456 Oak Ave' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Calendar</h1>
          <button className="h-8 w-8 rounded-full bg-oja-teal/10 dark:bg-oja-seafoam/10 text-oja-teal dark:text-oja-seafoam flex items-center justify-center">
            <Plus size={20} />
          </button>
        </div>
        
        <div className="flex items-center bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
          {['Weekly', 'Monthly'].map(v => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                view === v 
                  ? 'bg-white dark:bg-oja-surface-dark text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-lg dark:text-white">October 2024</h2>
          </div>
          <div className="flex space-x-2">
            <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Week View */}
      <div className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 py-4">
        <div className="flex justify-between px-4">
          {dates.map((date, i) => (
            <div key={i} className={`flex flex-col items-center p-2 rounded-xl w-11 ${date === 24 ? 'bg-oja-teal text-white' : 'text-slate-600 dark:text-slate-400'}`}>
              <span className="text-[10px] font-medium mb-1 uppercase opacity-80">{days[i]}</span>
              <span className={`text-sm font-bold ${date === 24 ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">Thursday, Oct 24</h3>
        <div className="space-y-4">
          {schedule.map((item, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={item.id}
              className={`rounded-2xl p-4 border-l-4 shadow-sm relative overflow-hidden ${
                item.status === 'confirmed' 
                  ? 'bg-white dark:bg-oja-surface-dark border-l-oja-teal dark:border-l-oja-seafoam' 
                  : 'bg-white dark:bg-oja-surface-dark border-l-oja-orange'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-900 dark:text-white text-base">{item.title}</h4>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
                  item.status === 'confirmed'
                    ? 'bg-oja-teal/10 text-oja-teal dark:bg-oja-seafoam/10 dark:text-oja-seafoam'
                    : 'bg-oja-orange/10 text-oja-orange'
                }`}>
                  {item.status}
                </span>
              </div>
              
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-medium mr-2">{item.customer}</span>
                </div>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <Clock size={12} className="mr-1.5" />
                  {item.time}
                </div>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <MapPin size={12} className="mr-1.5" />
                  {item.location}
                </div>
              </div>

              <div className="flex space-x-2 mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                <button className="text-xs font-medium text-oja-teal dark:text-oja-seafoam bg-oja-teal/10 dark:bg-oja-seafoam/10 px-3 py-1.5 rounded-lg hover:bg-oja-teal/20 transition-colors">
                  View Details
                </button>
                <button className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                  Message
                </button>
              </div>
            </motion.div>
          ))}
          
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center mb-3">
              <Plus size={20} className="text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Block Time Off</p>
          </div>
        </div>
      </div>
    </div>
  );
}
