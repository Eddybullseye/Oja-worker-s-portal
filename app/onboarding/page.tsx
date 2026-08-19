"use client";

import { useState } from 'react';
import { ChevronLeft, Camera, Check, Upload, User, Briefcase, FileText, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const totalSteps = 5;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-oja-teal/10 dark:bg-oja-seafoam/10 text-oja-teal dark:text-oja-seafoam flex items-center justify-center">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold dark:text-white">Basic Info</h2>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Full Legal Name" className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white transition-shadow" />
              <input type="email" placeholder="Email Address" className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white transition-shadow" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white transition-shadow" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-oja-teal/10 dark:bg-oja-seafoam/10 text-oja-teal dark:text-oja-seafoam flex items-center justify-center">
                <Briefcase size={20} />
              </div>
              <h2 className="text-xl font-bold dark:text-white">Your Skills</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">Select the services you offer. You can change these later.</p>
            <div className="grid grid-cols-2 gap-3">
              {['Cleaning', 'Plumbing', 'Electrical', 'Moving', 'Assembly', 'Painting'].map(skill => (
                <button key={skill} className="flex items-center p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-oja-teal dark:hover:border-oja-seafoam transition-colors group">
                  <div className="w-5 h-5 rounded border border-slate-300 dark:border-white/20 mr-3 group-hover:border-oja-teal dark:group-hover:border-oja-seafoam flex items-center justify-center">
                    {skill === 'Cleaning' && <Check size={14} className="text-oja-teal dark:text-oja-seafoam" />}
                  </div>
                  <span className="text-sm font-medium dark:text-slate-200">{skill}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-oja-teal/10 dark:bg-oja-seafoam/10 text-oja-teal dark:text-oja-seafoam flex items-center justify-center">
                <FileText size={20} />
              </div>
              <h2 className="text-xl font-bold dark:text-white">ID Verification</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">Please upload a clear photo of your government-issued ID.</p>
            
            <div className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-oja-teal dark:hover:border-oja-seafoam transition-colors bg-slate-50 dark:bg-oja-surface-dark/50">
              <div className="w-14 h-14 bg-oja-teal/10 dark:bg-oja-seafoam/10 rounded-full flex items-center justify-center mb-4 text-oja-teal dark:text-oja-seafoam">
                <Camera size={24} />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Take a Photo</h3>
              <p className="text-xs text-slate-500">Or choose from gallery</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-oja-teal/10 dark:bg-oja-seafoam/10 text-oja-teal dark:text-oja-seafoam flex items-center justify-center">
                <CreditCard size={20} />
              </div>
              <h2 className="text-xl font-bold dark:text-white">Payout Details</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">Where should we send your earnings?</p>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Routing Number" 
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white transition-shadow" 
              />
              <input 
                type="text" 
                placeholder="Account Number" 
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                className="w-full bg-slate-50 dark:bg-oja-surface-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white transition-shadow" 
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 text-center py-8">
            <div className="w-20 h-20 bg-oja-teal/10 dark:bg-oja-seafoam/10 rounded-full flex items-center justify-center mx-auto mb-6 text-oja-teal dark:text-oja-seafoam">
              <Check size={40} />
            </div>
            <h2 className="text-2xl font-bold dark:text-white mb-2">Application Submitted!</h2>
            <p className="text-slate-500 text-sm max-w-[250px] mx-auto mb-8">
              Your profile is currently under review. This usually takes 1-2 business days.
            </p>
            <Link href="/" className="inline-block bg-oja-teal text-white px-8 py-3.5 rounded-xl font-medium shadow-sm hover:bg-oja-teal/90 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-oja-bg-dark">
      {/* Header */}
      <header className="px-4 py-4 flex items-center border-b border-slate-100 dark:border-white/5 sticky top-0 bg-white dark:bg-oja-bg-dark z-40">
        {step > 1 && step < 5 ? (
          <button onClick={prevStep} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10">
            <ChevronLeft size={24} className="dark:text-white" />
          </button>
        ) : (
          <Link href="/login" className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10">
            <ChevronLeft size={24} className="dark:text-white" />
          </Link>
        )}
        <div className="flex-1 px-4">
          <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-oja-teal dark:bg-oja-seafoam transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="w-8"></div>
      </header>

      {/* Content */}
      <div className="flex-1 p-6">
        {renderStep()}
      </div>

      {/* Footer Nav */}
      {step < 5 && (
        <div className="p-4 border-t border-slate-100 dark:border-white/5 pb-safe sticky bottom-0 bg-white dark:bg-oja-bg-dark">
          <button 
            onClick={nextStep}
            className="w-full bg-oja-teal hover:bg-oja-teal/90 text-white py-4 rounded-xl font-medium shadow-sm transition-colors text-sm"
          >
            {step === 4 ? 'Submit Application' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}
