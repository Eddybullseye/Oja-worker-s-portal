"use client";

import { useState } from 'react';
import { Search, MoreVertical, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const mockMessages = [
  {
    id: 'm1',
    name: 'Sarah Jenkins',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    lastMessage: 'Great, see you tomorrow at 9 AM!',
    time: '2m ago',
    unread: 1,
    booking: 'Deep Cleaning'
  },
  {
    id: 'm2',
    name: 'Marcus Cole',
    avatar: 'https://picsum.photos/seed/marcus/100/100',
    lastMessage: 'Can you bring extra pipes just in case?',
    time: '1h ago',
    unread: 2,
    booking: 'Plumbing Fix'
  },
  {
    id: 'm3',
    name: 'Elena Rodriguez',
    avatar: 'https://picsum.photos/seed/elena/100/100',
    lastMessage: 'Thanks for the excellent work today.',
    time: 'Yesterday',
    unread: 0,
    booking: 'Furniture Assembly'
  },
  {
    id: 'm4',
    name: 'Support Team',
    avatar: 'https://picsum.photos/seed/support/100/100',
    lastMessage: 'Your payout has been processed successfully.',
    time: 'Oct 22',
    unread: 0,
    booking: 'Oja System'
  }
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-oja-bg-dark pb-28">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Messages</h1>
          <button className="h-8 w-8 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 flex items-center justify-center">
            <Edit size={16} />
          </button>
        </div>
        
        <div className="relative mb-2">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-oja-teal/50 dark:text-white placeholder:text-slate-500 transition-shadow"
          />
        </div>
      </header>

      {/* Message List */}
      <div className="bg-white dark:bg-oja-surface-dark min-h-screen">
        {mockMessages.map((chat) => (
          <Link href={`/messages/${chat.id}`} key={chat.id} className="flex items-start p-4 border-b border-slate-100 dark:border-white/5 active:bg-slate-50 dark:active:bg-white/5 transition-colors relative">
            <div className="relative mr-3 flex-shrink-0">
              <Image 
                src={chat.avatar} 
                alt={chat.name} 
                width={52} 
                height={52} 
                className="rounded-full bg-slate-200"
                referrerPolicy="no-referrer"
              />
              {chat.id === 'm4' && (
                <div className="absolute -bottom-1 -right-1 bg-oja-teal rounded-full p-1 border-2 border-white dark:border-oja-surface-dark">
                  <Image src="https://picsum.photos/seed/ojalogo/20/20" alt="oja" width={10} height={10} className="rounded-full opacity-50" unoptimized/>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`font-semibold truncate ${chat.unread > 0 ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                  {chat.name}
                </h3>
                <span className={`text-xs whitespace-nowrap ml-2 ${chat.unread > 0 ? 'text-oja-teal dark:text-oja-seafoam font-semibold' : 'text-slate-500'}`}>
                  {chat.time}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-[10px] bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded font-medium whitespace-nowrap">
                  {chat.booking}
                </span>
              </div>
              
              <p className={`text-sm mt-1 truncate ${chat.unread > 0 ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                {chat.lastMessage}
              </p>
            </div>

            {chat.unread > 0 && (
              <div className="flex-shrink-0 self-center ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-oja-orange text-[10px] font-bold text-white shadow-sm">
                {chat.unread}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
