"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, Bell, Lock, Smartphone, Globe, Moon, CreditCard, ChevronDown, LogOut, User, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 flex items-center">
        <Link href="/profile" className="mr-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
        </Link>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Settings</h1>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">

        {/* Account Info */}
        <section>
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider px-2">Account</h2>
          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
            <button onClick={() => toggleSection('account')} className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <User size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Account Information</span>
              </div>
              <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedSection === 'account' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'account' && (
              <div className="p-4 bg-slate-50 dark:bg-oja-bg-dark/50 space-y-4 border-b border-slate-100 dark:border-white/5">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Full Name</label>
                  <input type="text" defaultValue="Sarah Jenkins" className="w-full bg-white dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm dark:text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Email</label>
                  <input type="email" defaultValue="sarah.j@example.com" className="w-full bg-white dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm dark:text-white" />
                </div>
              </div>
            )}

            <button onClick={() => toggleSection('security')} className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Lock size={18} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Password & Security</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">2FA Enabled</span>
                </div>
              </div>
              <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedSection === 'security' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'security' && (
              <div className="p-4 bg-slate-50 dark:bg-oja-bg-dark/50 space-y-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-sm dark:text-white">Two-Factor Authentication</span>
                  <div className="w-10 h-6 bg-oja-teal rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>
                <button className="text-sm text-oja-teal font-medium">Change Password</button>
              </div>
            )}

            <button onClick={() => toggleSection('payouts')} className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <CreditCard size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Payout Details</span>
              </div>
              <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedSection === 'payouts' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'payouts' && (
              <div className="p-4 bg-slate-50 dark:bg-oja-bg-dark/50 space-y-4">
                <div className="flex items-center justify-between bg-white dark:bg-oja-surface-dark p-3 rounded-xl border border-slate-200 dark:border-white/10">
                  <div className="flex items-center">
                    <div className="w-8 h-6 bg-slate-200 rounded flex items-center justify-center mr-3 text-[10px] font-bold">CHASE</div>
                    <span className="text-sm dark:text-white">**** 4291</span>
                  </div>
                  <CheckCircle2 size={16} className="text-oja-teal" />
                </div>
                {isAddingBank ? (
                  <div className="space-y-3 bg-white dark:bg-oja-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/10 mt-2">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Add New Account</h3>
                    <input
                      type="text"
                      placeholder="Routing Number"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white transition-shadow"
                    />
                    <input
                      type="text"
                      placeholder="Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      className="w-full bg-slate-50 dark:bg-oja-bg-dark border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white transition-shadow"
                    />
                    <div className="flex space-x-2 pt-2">
                      <button
                        onClick={() => setIsAddingBank(false)}
                        className="flex-1 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingBank(false);
                          setRoutingNumber('');
                          setAccountNumber('');
                        }}
                        className="flex-1 py-2 rounded-xl text-sm font-medium text-white bg-oja-teal hover:bg-oja-teal/90 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setIsAddingBank(true)} className="w-full py-2 border border-dashed border-slate-300 dark:border-white/20 rounded-xl text-sm text-slate-500 hover:border-oja-teal transition-colors">
                    + Add New Account
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider px-2">Preferences</h2>
          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
            <button onClick={() => toggleSection('notifications')} className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Bell size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Notifications</span>
              </div>
              <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedSection === 'notifications' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'notifications' && (
              <div className="p-4 bg-slate-50 dark:bg-oja-bg-dark/50 space-y-4 border-b border-slate-100 dark:border-white/5">
                {[
                  { label: 'Push Notifications', active: true },
                  { label: 'Email Summaries', active: false },
                  { label: 'SMS Alerts', active: true }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm dark:text-white">{item.label}</span>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${item.active ? 'bg-oja-teal' : 'bg-slate-300 dark:bg-slate-600'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => toggleSection('language')} className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Globe size={18} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Language & Region</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">English (US)</span>
                </div>
              </div>
              <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedSection === 'language' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'language' && (
              <div className="p-4 bg-slate-50 dark:bg-oja-bg-dark/50 border-b border-slate-100 dark:border-white/5">
                <select className="w-full bg-white dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm dark:text-white outline-none">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Moon size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Theme</span>
              </div>
              <div className="flex items-center bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                {mounted && (
                  <>
                    <button
                      onClick={() => setTheme('light')}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${theme === 'light' ? 'bg-white dark:bg-oja-surface-dark shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${theme === 'dark' ? 'bg-white dark:bg-oja-surface-dark shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${theme === 'system' ? 'bg-white dark:bg-oja-surface-dark shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                      Auto
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section>
          <div className="bg-white dark:bg-oja-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-white/5">
            <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-white/5 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Smartphone size={18} />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">Help & Support</span>
              </div>
              <ChevronDown size={20} className="-rotate-90 text-slate-400" />
            </button>
          </div>
        </section>

        <button
          onClick={() => {
            localStorage.removeItem('oja_worker_auth');
            window.location.href = '/signup';
          }}
          className="w-full bg-white dark:bg-oja-surface-dark py-4 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 text-rose-500 font-medium active:bg-slate-50 dark:active:bg-white/5 transition-colors flex items-center justify-center mt-6"
        >
          <LogOut size={18} className="mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
}
