"use client";

import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, DollarSign, Download, Filter, TrendingUp, ShieldCheck, Wallet, ChevronRight } from 'lucide-react';
import { WithdrawalModal } from '@/components/WithdrawalModal';
import { motion } from 'motion/react';

const mockTransactions = [
  { id: 'tx_1', date: 'Oct 24, 2026', buyer: 'Sarah Jenkins', type: 'earning', amount: 162.00, status: 'Cleared' },
  { id: 'tx_2', date: 'Oct 22, 2026', buyer: 'Instant Bank Transfer', type: 'withdrawal', amount: -450.00, status: 'Completed' },
  { id: 'tx_3', date: 'Oct 20, 2026', buyer: 'Marcus Cole', type: 'earning', amount: 85.50, status: 'Cleared' },
  { id: 'tx_4', date: 'Oct 18, 2026', buyer: 'Elena Rodriguez', type: 'earning', amount: 108.00, status: 'Cleared' },
];

export default function EarningsPage() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(842.50);
  const [transactions, setTransactions] = useState(mockTransactions);

  const handleWithdrawSuccess = (amount: number) => {
    setAvailableBalance(prev => prev - amount);

    const newTx = {
      id: `tx_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      buyer: 'Instant Bank Transfer',
      type: 'withdrawal',
      amount: -amount,
      status: 'Pending'
    };

    setTransactions([newTx, ...transactions]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-200/60 dark:border-white/10 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Earnings & Payouts</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Track payouts, pending balances, and transaction history</p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Balance & Overview Section (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Balance Card (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-oja-teal via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-amber-300" />
                  <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Available Balance</span>
                </div>
                <span className="bg-emerald-400/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300/30 flex items-center gap-1">
                  <TrendingUp size={12} /> Live Payout Ready
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black tracking-tight my-3">${availableBalance.toFixed(2)}</h2>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/15">
                <div>
                  <p className="text-white/70 text-xs font-medium">Pending Clearing Escrow</p>
                  <p className="font-extrabold text-base sm:text-lg text-white">$162.00</p>
                </div>

                <button
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="bg-white text-oja-teal hover:bg-amber-50 px-6 py-3 rounded-2xl font-black text-xs shadow-lg transition-all active:scale-95 text-center"
                >
                  Request Instant Withdrawal
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-oja-surface-dark rounded-3xl p-5 shadow-sm border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Total Lifetime</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">$4,850.00</p>
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-4 flex items-center gap-1">
                <TrendingUp size={14} /> +22.4% vs last month
              </p>
            </div>

            <div className="bg-white dark:bg-oja-surface-dark rounded-3xl p-5 shadow-sm border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Avg Job Value</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">$142.50</p>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-4">Based on 34 jobs</p>
            </div>

            <div className="col-span-2 bg-white dark:bg-oja-surface-dark rounded-3xl p-5 shadow-sm border border-slate-200/60 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Direct Bank Deposit Verified</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">PNC Bank ****4821</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </div>
          </div>

        </div>

        {/* Weekly Performance Bar Graph */}
        <section className="bg-white dark:bg-oja-surface-dark rounded-3xl p-6 shadow-sm border border-slate-200/60 dark:border-white/10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white">Earnings Breakdown</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Daily breakdown for this week</p>
            </div>
            <select className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl px-3 py-1.5 outline-none border border-slate-200 dark:border-white/10">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="h-48 flex items-end justify-between px-2 pb-2 space-x-3">
            {[
              { day: 'Mon', height: 45, amount: '$120' },
              { day: 'Tue', height: 65, amount: '$180' },
              { day: 'Wed', height: 35, amount: '$95' },
              { day: 'Thu', height: 85, amount: '$240' },
              { day: 'Fri', height: 50, amount: '$150' },
              { day: 'Sat', height: 95, amount: '$280' },
              { day: 'Sun', height: 60, amount: '$165' }
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center w-full group cursor-pointer">
                <span className="text-[10px] font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.amount}
                </span>
                <div
                  className="w-full bg-oja-teal/20 dark:bg-oja-seafoam/20 rounded-t-xl relative overflow-hidden group-hover:bg-oja-teal/30 transition-colors"
                  style={{ height: `${bar.height}%` }}
                >
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-oja-teal to-teal-400 rounded-t-xl h-full" />
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">{bar.day}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Transaction History Table */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">Recent Transactions</h2>
            <button className="text-xs font-bold text-oja-teal dark:text-oja-seafoam flex items-center gap-1 hover:underline">
              <Download size={14} /> Export CSV Statement
            </button>
          </div>

          <div className="bg-white dark:bg-oja-surface-dark rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 dark:border-white/10">
            {transactions.map((tx, i) => (
              <div key={tx.id} className={`p-4 sm:p-5 flex items-center justify-between ${i !== transactions.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''}`}>
                <div className="flex items-center space-x-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${tx.type === 'earning'
                      ? 'bg-oja-teal/10 text-oja-teal dark:bg-oja-seafoam/10 dark:text-oja-seafoam'
                      : 'bg-oja-orange/10 text-oja-orange'
                    }`}>
                    {tx.type === 'earning' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{tx.buyer}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tx.date} • <span className="font-medium text-emerald-600 dark:text-emerald-400">{tx.status}</span></p>
                  </div>
                </div>
                <div className={`font-black text-base sm:text-lg ${tx.type === 'earning' ? 'text-oja-teal dark:text-oja-seafoam' : 'text-slate-900 dark:text-white'}`}>
                  {tx.type === 'earning' ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <WithdrawalModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        availableBalance={availableBalance}
        onWithdrawSuccess={handleWithdrawSuccess}
      />
    </div>
  );
}
