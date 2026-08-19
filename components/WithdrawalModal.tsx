import React, { useState, useEffect } from 'react';
import { X, Building, User, Hash, AlertCircle, CheckCircle } from 'lucide-react';

export function WithdrawalModal({ 
  isOpen, 
  onClose, 
  availableBalance,
  onWithdrawSuccess
}: { 
  isOpen: boolean; 
  onClose: () => void;
  availableBalance: number;
  onWithdrawSuccess: (amount: number) => void;
}) {
  const [bankDetails, setBankDetails] = useState<{
    bankName: string;
    accountName: string;
    accountNumber: string;
  } | null>(null);

  const [isAddingBank, setIsAddingBank] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(availableBalance.toString());
  const [step, setStep] = useState<'details' | 'confirm' | 'success'>('details');

  const [formBankName, setFormBankName] = useState('');
  const [formAccountName, setFormAccountName] = useState('');
  const [formAccountNumber, setFormAccountNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('oja_bank_details');
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBankDetails(JSON.parse(stored));
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAddingBank(true);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep('details');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWithdrawAmount(availableBalance.toString());
      if (bankDetails) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAddingBank(false);
      }
    }
  }, [isOpen, availableBalance, bankDetails]);

  if (!isOpen) return null;

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    const details = {
      bankName: formBankName,
      accountName: formAccountName,
      accountNumber: formAccountNumber,
    };
    localStorage.setItem('oja_bank_details', JSON.stringify(details));
    setBankDetails(details);
    setIsAddingBank(false);
  };

  const handleWithdraw = () => {
    setStep('confirm');
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      onWithdrawSuccess(Number(withdrawAmount));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-oja-surface-dark rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-white/5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {step === 'success' ? 'Withdrawal Successful' : 'Withdraw Funds'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-oja-teal/10 dark:bg-oja-seafoam/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-oja-teal dark:text-oja-seafoam" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Funds on the way!</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Your withdrawal of ${Number(withdrawAmount).toFixed(2)} has been initiated to {bankDetails?.bankName}. It should arrive in 2-3 business days.
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          ) : step === 'confirm' ? (
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} className="text-amber-600 dark:text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Confirm Withdrawal</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-2">
                  You are about to withdraw <span className="font-bold text-slate-900 dark:text-white">${Number(withdrawAmount).toFixed(2)}</span> to:
                </p>
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl text-left border border-slate-100 dark:border-white/10 mb-4 inline-block mx-auto min-w-[200px]">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{bankDetails?.bankName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Account: **** {bankDetails?.accountNumber.slice(-4) || '0000'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setStep('details')}
                  className="flex-1 px-4 py-3.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="flex-1 bg-oja-teal hover:bg-oja-teal/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    'Confirm'
                  )}
                </button>
              </div>
            </div>
          ) : isAddingBank ? (
            <form onSubmit={handleSaveBank} className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-3 rounded-xl flex items-start space-x-3 text-sm mb-6">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p>Please add your bank details to withdraw your earnings.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bank Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={formBankName}
                    onChange={(e) => setFormBankName(e.target.value)}
                    placeholder="e.g. Chase Bank"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Account Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={formAccountName}
                    onChange={(e) => setFormAccountName(e.target.value)}
                    placeholder="Exact name on account"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Account Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={formAccountNumber}
                    onChange={(e) => setFormAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    placeholder="Account number"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                {bankDetails && (
                  <button 
                    type="button"
                    onClick={() => setIsAddingBank(false)}
                    className="flex-1 px-4 py-3 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 bg-oja-teal hover:bg-oja-teal/90 text-white rounded-xl font-bold transition-colors"
                >
                  Save Bank Details
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Available to withdraw</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${availableBalance.toFixed(2)}</span>
                </div>
                
                <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Withdraw Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 font-medium">$</span>
                    </div>
                    <input 
                      type="number" 
                      max={availableBalance}
                      min={1}
                      step="0.01"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-white dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-oja-teal/50 font-bold text-lg dark:text-white"
                    />
                    <button 
                      onClick={() => setWithdrawAmount(availableBalance.toString())}
                      className="absolute inset-y-0 right-2 flex items-center px-2 text-xs font-bold text-oja-teal dark:text-oja-seafoam"
                    >
                      MAX
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Withdraw to</h3>
                  <button 
                    onClick={() => setIsAddingBank(true)}
                    className="text-xs font-semibold text-oja-teal hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white dark:bg-oja-surface-dark rounded-full flex items-center justify-center border border-slate-200 dark:border-white/10">
                    <Building size={18} className="text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{bankDetails?.bankName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      **** {bankDetails?.accountNumber.slice(-4) || '0000'}
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleWithdraw}
                disabled={isSubmitting || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > availableBalance}
                className="w-full bg-oja-teal hover:bg-oja-teal/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex justify-center items-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  `Withdraw $${Number(withdrawAmount).toFixed(2)}`
                )}
              </button>
              <p className="text-center text-xs text-slate-500">
                Withdrawals typically take 2-3 business days to clear.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
