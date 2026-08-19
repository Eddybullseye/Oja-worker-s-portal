"use client";

import { ChevronLeft, Plus, Trash2, Sliders, CheckCircle2, DollarSign, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  rate: number;
  active: boolean;
}

const initialServices: ServiceItem[] = [
  { id: '1', title: 'Electrical Panel Maintenance & Wiring', category: 'Electrical', rate: 65, active: true },
  { id: '2', title: 'Emergency Plumbing Repair & Leak Fix', category: 'Plumbing', rate: 75, active: true },
  { id: '3', title: 'Smart Home Thermostat Setup', category: 'Electrical', rate: 50, active: true }
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [newTitle, setNewTitle] = useState('');
  const [newRate, setNewRate] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newRate) return;

    setServices([
      ...services,
      {
        id: Date.now().toString(),
        title: newTitle,
        category: 'General',
        rate: Number(newRate),
        active: true
      }
    ]);
    setNewTitle('');
    setNewRate('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-200/60 dark:border-white/10 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 transition-colors">
              <ChevronLeft size={20} className="text-slate-900 dark:text-white" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white">Service Offerings & Pricing</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configure your active skills and hourly rates</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Services List */}
        <div className="space-y-4">
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white px-1">Your Listed Services ({services.length})</h2>

          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="bg-white dark:bg-oja-surface-dark p-5 rounded-3xl shadow-sm border border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-oja-teal/10 text-oja-teal dark:text-oja-seafoam rounded-2xl flex items-center justify-center font-black shrink-0">
                    <Sliders size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-oja-teal dark:text-oja-seafoam bg-oja-teal/10 px-2 py-0.5 rounded-md">
                      {service.category}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{service.title}</h3>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">${service.rate}/hr • Active on Marketplace</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-500 hover:bg-rose-100 transition-colors"
                  aria-label="Delete service"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Service Form / Trigger */}
        {isAdding ? (
          <form onSubmit={handleAddService} className="bg-white dark:bg-oja-surface-dark p-6 rounded-3xl shadow-sm border border-oja-teal space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Add New Service Category</h3>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Service Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Solar Panel Inspection"
                className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Hourly Rate ($/hr)</label>
              <input
                type="number"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                placeholder="60"
                className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-oja-teal text-white py-3 rounded-2xl font-bold text-xs shadow-sm hover:bg-oja-teal/90"
              >
                Add Service
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 py-3 rounded-2xl font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full bg-white dark:bg-oja-surface-dark border-2 border-dashed border-slate-300 dark:border-white/20 p-5 rounded-3xl shadow-sm flex items-center justify-center text-oja-teal hover:border-oja-teal transition-all active:scale-95 font-bold text-xs gap-2"
          >
            <Plus size={18} /> Add New Service & Custom Hourly Rate
          </button>
        )}

      </div>
    </div>
  );
}
