"use client";

import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Bell,
  Lock,
  Smartphone,
  Globe,
  Moon,
  CreditCard,
  ChevronDown,
  LogOut,
  User,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Sliders,
  DollarSign,
  Sun,
  Laptop
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>('account');
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('PNC Bank');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Toggles state
  const [twoFactor, setTwoFactor] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [smsNotifs, setSmsNotifs] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 3000);
  };

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oja_worker_auth');
    }
    showToast('Logged out of Worker Portal.');
    setTimeout(() => {
      router.push('/signup');
    }, 800);
  };

  const handleSaveBank = () => {
    if (!routingNumber || !accountNumber) {
      showToast('⚠️ Please enter valid routing and account numbers.');
      return;
    }
    setIsAddingBank(false);
    setRoutingNumber('');
    setAccountNumber('');
    showToast('✅ New payout bank account verified and linked successfully!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-32">
      {/* Toast Notification */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 left-4 right-4 z-50 max-w-md mx-auto bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700/40 text-xs font-semibold"
          >
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="flex-1">{activeToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-200/60 dark:border-white/10 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 transition-colors">
              <ChevronLeft size={20} className="text-slate-900 dark:text-white" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white">Portal & Account Settings</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage security, payout accounts, and app preferences</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Responsive Body Container */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ACCOUNT SECTION */}
        <section className="space-y-3">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-2">Account & Security</h2>

          <div className="bg-white dark:bg-oja-surface-dark rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5">

            {/* Account Info Accordion */}
            <div>
              <button
                onClick={() => toggleSection('account')}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-oja-teal/10 text-oja-teal dark:text-oja-seafoam flex items-center justify-center font-bold">
                    <User size={20} />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Account Information</span>
                    <p className="text-xs text-slate-500">Alex Walker • alex.walker@provider.com</p>
                  </div>
                </div>
                <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedSection === 'account' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {expandedSection === 'account' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-5 bg-slate-50/60 dark:bg-oja-bg-dark/40 border-t border-slate-100 dark:border-white/5 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Provider Name</label>
                        <input
                          type="text"
                          defaultValue="Alex Walker"
                          className="w-full bg-white dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Account Email</label>
                        <input
                          type="email"
                          defaultValue="alex.walker@provider.com"
                          className="w-full bg-white dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('✅ Account details updated!')}
                      className="px-4 py-2 bg-oja-teal text-white rounded-xl text-xs font-bold shadow-sm hover:bg-oja-teal/90"
                    >
                      Save Account Changes
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Password & Security Accordion */}
            <div>
              <button
                onClick={() => toggleSection('security')}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                    <Lock size={20} />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Password & Security</span>
                    <p className="text-xs text-slate-500">{twoFactor ? 'Two-Factor Auth Active' : '2FA Disabled'}</p>
                  </div>
                </div>
                <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedSection === 'security' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {expandedSection === 'security' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-5 bg-slate-50/60 dark:bg-oja-bg-dark/40 border-t border-slate-100 dark:border-white/5 space-y-4"
                  >
                    <div className="flex items-center justify-between bg-white dark:bg-oja-surface-dark p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                      <div>
                        <p className="font-bold text-xs text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                        <p className="text-[11px] text-slate-500">Require an OTP code upon worker login</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={twoFactor}
                          onChange={() => {
                            setTwoFactor(!twoFactor);
                            showToast(!twoFactor ? '🔒 2FA Enabled' : '🔓 2FA Disabled');
                          }}
                        />
                        <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-oja-teal" />
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Payout Details Accordion */}
            <div>
              <button
                onClick={() => toggleSection('payouts')}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                    <CreditCard size={20} />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Bank Account & Payout Method</span>
                    <p className="text-xs text-slate-500">PNC Direct Deposit **** 4821</p>
                  </div>
                </div>
                <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedSection === 'payouts' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {expandedSection === 'payouts' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-5 bg-slate-50/60 dark:bg-oja-bg-dark/40 border-t border-slate-100 dark:border-white/5 space-y-4"
                  >
                    <div className="flex items-center justify-between bg-white dark:bg-oja-surface-dark p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black tracking-wider">
                          PNC BANK
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-900 dark:text-white">Direct Deposit **** 4821</p>
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Verified for instant payouts</p>
                        </div>
                      </div>
                      <CheckCircle2 size={18} className="text-oja-teal" />
                    </div>

                    {isAddingBank ? (
                      <div className="space-y-3 bg-white dark:bg-oja-surface-dark p-5 rounded-2xl border border-oja-teal shadow-sm">
                        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">Add New Direct Deposit Account</h3>

                        <div>
                          <label className="text-[11px] font-bold text-slate-500 block mb-1">Bank Name</label>
                          <input
                            type="text"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            placeholder="Bank Name"
                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-500 block mb-1">9-Digit Routing Number</label>
                          <input
                            type="text"
                            placeholder="123456789"
                            value={routingNumber}
                            onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-500 block mb-1">Account Number</label>
                          <input
                            type="text"
                            placeholder="000123456789"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                            className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-medium dark:text-white outline-none focus:ring-2 focus:ring-oja-teal"
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => setIsAddingBank(false)}
                            className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveBank}
                            className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-oja-teal shadow-sm hover:bg-oja-teal/90"
                          >
                            Verify & Link Bank
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAddingBank(true)}
                        className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl text-xs font-bold text-oja-teal hover:border-oja-teal transition-all active:scale-95 text-center"
                      >
                        + Link New Bank Account
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* PREFERENCES SECTION */}
        <section className="space-y-3">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-2">App Preferences</h2>

          <div className="bg-white dark:bg-oja-surface-dark rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5">

            {/* Notifications Accordion */}
            <div>
              <button
                onClick={() => toggleSection('notifications')}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                    <Bell size={20} />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Push & Alert Notifications</span>
                    <p className="text-xs text-slate-500">Configure job offer and message alerts</p>
                  </div>
                </div>
                <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedSection === 'notifications' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {expandedSection === 'notifications' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-5 bg-slate-50/60 dark:bg-oja-bg-dark/40 border-t border-slate-100 dark:border-white/5 space-y-3"
                  >
                    {[
                      { label: 'Instant Job Request Push Alerts', desc: 'Notify immediately when customer offers arrive', state: pushNotifs, setter: setPushNotifs },
                      { label: 'SMS Order Updates', desc: 'Receive emergency job alerts via text message', state: smsNotifs, setter: setSmsNotifs },
                      { label: 'Weekly Earnings Digest via Email', desc: 'Get weekly performance summary reports', state: emailNotifs, setter: setEmailNotifs }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-white dark:bg-oja-surface-dark p-3.5 rounded-2xl border border-slate-200 dark:border-white/10">
                        <div>
                          <p className="font-bold text-xs text-slate-900 dark:text-white">{item.label}</p>
                          <p className="text-[10px] text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={item.state}
                            onChange={() => {
                              item.setter(!item.state);
                              showToast(`Notification setting updated.`);
                            }}
                          />
                          <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-oja-teal" />
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Appearance & Theme Row */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
                  <Moon size={20} />
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Appearance & Theme</span>
                  <p className="text-xs text-slate-500">Switch between Light, Dark, or System mode</p>
                </div>
              </div>

              <div className="flex items-center bg-slate-100 dark:bg-white/10 p-1 rounded-2xl self-start sm:self-auto border border-slate-200 dark:border-white/10">
                {mounted && (
                  <>
                    <button
                      onClick={() => setTheme('light')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 ${theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 dark:text-slate-400'
                        }`}
                    >
                      <Sun size={14} /> Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 ${theme === 'dark' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
                        }`}
                    >
                      <Moon size={14} /> Dark
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 ${theme === 'system' ? 'bg-oja-teal text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
                        }`}
                    >
                      <Laptop size={14} /> Auto
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* LOGOUT BUTTON CARD */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 p-4 rounded-3xl text-rose-600 dark:text-rose-400 font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <LogOut size={18} /> Sign Out of Worker Account
        </motion.button>

      </div>
    </div>
  );
}
