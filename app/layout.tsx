import React from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthGuard } from '@/components/AuthGuard';
import { BottomNav } from '@/components/BottomNav';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister';

export const metadata = {
  title: 'Oja Worker Portal',
  description: 'Manage your jobs and earnings on Oja',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthGuard>
            {children}
            <BottomNav />
          </AuthGuard>
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}

