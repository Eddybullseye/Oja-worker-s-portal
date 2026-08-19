"use client";

import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, DollarSign, Download, Filter } from 'lucide-react';
import { WithdrawalModal } from '@/components/WithdrawalModal';

const mockTransactions = [
  { id: 'tx_1', date: 'Oct 24', buyer: 'Sarah Jenkins', type: 'earning', amount: 162.00, status: 'cleared' },
  { id: 'tx_2', date: 'Oct 22', buyer: 'Bank Transfer', type: 'withdrawal', amount: -450.00, status: 'completed' },
  { id: 'tx_3', date: 'Oct 20', buyer: 'Marcus Cole', type: 'earning', amount: 85.50, status: 'cleared' },
  { id: 'tx_4', date: 'Oct 18', buyer: 'Elena Rodriguez', type: 'earning', amount: 108.00, status: 'cleared' },
];

export default function EarningsPage() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(542.50);
  const [transactions, setTransactions] = useState(mockTransactions);

  const handleWithdrawSuccess = (amount: number) => {
    setAvailableBalance(prev => prev - amount);
    
    // Add withdrawal to transactions
    const newTx = {
      id: `tx_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      buyer: 'Bank Transfer',
      type: 'withdrawal',
      amount: -amount,
      status: 'pending'
    };
    
    setTransactions([newTx, ...transactions]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 pt-6 pb-4">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Earnings</h1>
        
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-oja-teal to-oja-seafoam rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8 blur-lg"></div>
          
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium mb-1">Available Balance</p>
            <h2 className="text-4xl font-bold mb-4">${availableBalance.toFixed(2)}</h2>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/70 text-xs">Pending Clearing</p>
                <p className="font-medium">$162.00</p>
              </div>
              <button 
                onClick={() => setIsWithdrawModalOpen(true)}
                className="bg-white text-oja-teal px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        
        {/* Chart Area */}
        <section className="bg-white dark:bg-oja-surface-dark rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-slate-900 dark:text-white">Earnings Overview</h2>
            <select className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg px-2 py-1 outline-none border-none">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-40 flex items-end justify-between px-2 pb-2 space-x-2">
            {[30, 50, 20, 80, 40, 90, 60].map((height, i) => (
              <div key={i} className="flex flex-col items-center w-full">
                <div 
                  className="w-full bg-oja-teal/20 dark:bg-oja-seafoam/20 rounded-t-sm relative group cursor-pointer"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute bottom-0 w-full bg-oja-teal dark:bg-oja-seafoam rounded-t-sm transition-all duration-500 ease-out" style={{ height: '0%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-2">{'SMTWTFS'[i]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Transaction History */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-slate-900 dark:text-white">Transactions</h2>
            <div className="flex space-x-2">
              <button className="p-1.5 bg-white dark:bg-oja-surface-dark rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 transition-colors">
                <Download size={16} />
              </button>
              <button className="p-1.5 bg-white dark:bg-oja-surface-dark rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 transition-colors">
                <Filter size={16} />
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
            {transactions.map((tx, i) => (
              <div key={tx.id} className={`p-4 flex items-center justify-between ${i !== transactions.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'earning' 
                      ? 'bg-oja-teal/10 text-oja-teal dark:bg-oja-seafoam/10 dark:text-oja-seafoam' 
                      : 'bg-oja-orange/10 text-oja-orange'
                  }`}>
                    {tx.type === 'earning' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{tx.buyer}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tx.date} • {tx.status}</p>
                  </div>
                </div>
                <div className={`font-bold text-sm ${tx.type === 'earning' ? 'text-oja-teal dark:text-oja-seafoam' : 'text-slate-900 dark:text-white'}`}>
                  {tx.type === 'earning' ? '+' : ''}{tx.amount.toFixed(2)}
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
