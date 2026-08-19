"use client";

import { useState } from 'react';
import { ChevronLeft, DollarSign, Download, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { WithdrawalModal } from '@/components/WithdrawalModal';

export default function PayoutsPage() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(125.00);
  const [payouts, setPayouts] = useState([
    { id: 1, date: 'Oct 24, 2023', amount: 350.00, status: 'Completed', method: 'Bank ****4291' },
    { id: 2, date: 'Oct 17, 2023', amount: 420.50, status: 'Completed', method: 'Bank ****4291' },
    { id: 3, date: 'Oct 10, 2023', amount: 210.00, status: 'Completed', method: 'Bank ****4291' },
    { id: 4, date: 'Oct 03, 2023', amount: 560.25, status: 'Completed', method: 'Bank ****4291' },
  ]);

  const handleWithdrawSuccess = (amount: number) => {
    setAvailableBalance(prev => prev - amount);
    
    // Attempt to get bank account details to show in history
    let bankMethod = 'Bank Transfer';
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('oja_bank_details');
      if (stored) {
        try {
          const details = JSON.parse(stored);
          bankMethod = `${details.bankName} ****${details.accountNumber.slice(-4)}`;
        } catch(e) {}
      }
    }

    const newPayout = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: amount,
      status: 'Pending',
      method: bankMethod
    };
    
    setPayouts([newPayout, ...payouts]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/profile" className="mr-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Payout History</h1>
        </div>
        <button className="text-slate-500 hover:text-oja-teal transition-colors">
          <Download size={20} />
        </button>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-oja-teal to-oja-seafoam rounded-3xl p-6 text-white shadow-md">
          <p className="text-white/80 text-sm font-medium mb-1">Available for Payout</p>
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-bold">${availableBalance.toFixed(2)}</h2>
            <button 
              onClick={() => setIsWithdrawModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors backdrop-blur-sm"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider px-2">Recent Payouts</h3>
          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
            {payouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5 last:border-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-oja-bg-dark rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 mr-3">
                    <ArrowUpRight size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-slate-900 dark:text-white">{payout.date}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{payout.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-white">${payout.amount.toFixed(2)}</p>
                  <p className={`text-xs font-medium ${payout.status === 'Pending' ? 'text-orange-500' : 'text-green-500'}`}>{payout.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
