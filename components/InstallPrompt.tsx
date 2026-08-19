"use client";

import { useEffect, useState } from 'react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Wait for a 'meaningful engagement' to show the prompt.
      // For this demo, we'll wait a few seconds, but in a real app
      // this could be after accepting a job or finishing onboarding.
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferred prompt variable, since it can only be used once.
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white dark:bg-oja-teal-dark p-4 rounded-2xl shadow-xl z-40 border border-slate-100 dark:border-oja-teal border-t-4 border-t-oja-orange animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">Install Oja Worker App</h3>
          <p className="text-sm text-slate-600 dark:text-slate-200">
            Add to your home screen for quick access, offline jobs, and push notifications.
          </p>
        </div>
        <button 
          onClick={() => setShowPrompt(false)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
        >
          &times;
        </button>
      </div>
      <div className="mt-4 flex space-x-3">
        <button 
          onClick={handleInstallClick}
          className="flex-1 bg-oja-teal hover:bg-oja-teal-dark text-white py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Add to Home Screen
        </button>
        <button 
          onClick={() => setShowPrompt(false)}
          className="flex-1 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-slate-700 dark:text-white py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
}
