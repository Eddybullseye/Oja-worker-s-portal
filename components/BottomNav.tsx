"use client";

import Link from 'next/link';
import { Home, Briefcase, Calendar, MessageSquare, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const PUBLIC_PATHS = ['/signup', '/login', '/forgot-password', '/onboarding'];

export function BottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (isPublicPath) return null;

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Jobs', href: '/jobs', icon: Briefcase, badge: 2 },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Messages', href: '/messages', icon: MessageSquare, badge: 3 },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe pt-2 pointer-events-none"
    >
      <div className="max-w-md mx-auto bg-white/80 dark:bg-oja-surface-dark/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-full shadow-lg pointer-events-auto flex justify-between items-center px-2 py-2 mb-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-14 h-12 outline-none"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`relative flex items-center justify-center w-full h-full rounded-full transition-colors ${isActive ? 'text-oja-teal dark:text-oja-seafoam bg-oja-teal/10 dark:bg-oja-teal/20' : 'text-slate-500 dark:text-slate-400 hover:text-oja-teal dark:hover:text-oja-seafoam'
                  }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge && (
                  <span className="absolute top-1 right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-oja-orange text-[9px] font-bold text-white ring-2 ring-white dark:ring-oja-surface-dark">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}

