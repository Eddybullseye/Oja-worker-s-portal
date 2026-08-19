"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Phone, MoreVertical, Paperclip, Send, Mic, Image as ImageIcon, FileText, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const mockChat = [
  { id: 1, sender: 'them', text: 'Hi! Just confirming our appointment for tomorrow.', time: '10:00 AM' },
  { id: 2, sender: 'me', text: 'Yes, I will be there at 9 AM sharp. Do you need me to bring any specific cleaning supplies?', time: '10:05 AM' },
  { id: 3, sender: 'them', text: 'No, we have everything here. See you tomorrow!', time: '10:08 AM' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(mockChat);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleVoiceMail = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Simulate sending voice message
      const voiceMessage = {
        id: Date.now(),
        sender: 'me',
        text: '🎤 Voice message (0:05)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, voiceMessage]);
    }
  };

  const handleFileUpload = (type: string) => {
    setShowAttachMenu(false);
    const fileMessage = {
      id: Date.now(),
      sender: 'me',
      text: type === 'image' ? '🖼️ Image attached' : '📄 Document attached',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, fileMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-oja-bg-dark">
      {/* Header */}
      <header className="bg-white dark:bg-oja-surface-dark border-b border-slate-100 dark:border-white/5 px-4 py-3 flex items-center justify-between shadow-sm z-10 sticky top-0">
        <div className="flex items-center">
          <Link href="/messages" className="mr-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
          </Link>
          <div className="flex items-center">
            <Image src="https://picsum.photos/seed/sarah/100/100" alt="Sarah" width={36} height={36} className="rounded-full mr-3" referrerPolicy="no-referrer" />
            <div>
              <h1 className="font-semibold text-slate-900 dark:text-white leading-tight">Sarah Jenkins</h1>
              <p className="text-[10px] text-green-500 font-medium">Online</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300">
            <Phone size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-safe" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
              msg.sender === 'me' 
                ? 'bg-oja-teal text-white rounded-tr-sm' 
                : 'bg-white dark:bg-oja-surface-dark text-slate-900 dark:text-white rounded-tl-sm shadow-sm border border-slate-100 dark:border-white/5'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-white/70' : 'text-slate-400'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        {isRecording && (
          <div className="flex justify-end">
             <div className="bg-oja-orange text-white rounded-2xl rounded-tr-sm px-4 py-2 text-sm flex items-center animate-pulse">
               <Mic size={16} className="mr-2" /> Recording...
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-oja-surface-dark border-t border-slate-100 dark:border-white/5 p-3 pb-safe-bottom sticky bottom-0 z-10">
        
        {/* Attachment Menu */}
        {showAttachMenu && (
          <div className="absolute bottom-16 left-4 bg-white dark:bg-oja-surface-dark border border-slate-100 dark:border-white/10 shadow-lg rounded-2xl p-2 flex space-x-2 animate-in fade-in slide-in-from-bottom-2">
            <button onClick={() => handleFileUpload('image')} className="flex flex-col items-center justify-center p-3 w-16 h-16 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-oja-teal">
              <ImageIcon size={24} className="mb-1" />
              <span className="text-[10px] font-medium">Image</span>
            </button>
            <button onClick={() => handleFileUpload('document')} className="flex flex-col items-center justify-center p-3 w-16 h-16 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-blue-500">
              <FileText size={24} className="mb-1" />
              <span className="text-[10px] font-medium">File</span>
            </button>
          </div>
        )}

        <div className="flex items-end space-x-2">
          <button 
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className={`p-2.5 rounded-full transition-colors flex-shrink-0 ${showAttachMenu ? 'bg-oja-teal text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-600 dark:hover:text-slate-200'}`}
          >
            {showAttachMenu ? <X size={22} /> : <Paperclip size={22} />}
          </button>
          
          <div className="flex-1 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-end relative border border-transparent focus-within:border-oja-teal/30 focus-within:bg-white dark:focus-within:bg-oja-surface-dark transition-colors">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-transparent max-h-32 outline-none resize-none px-4 py-3 text-sm dark:text-white"
              rows={1}
              style={{ minHeight: '44px' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>

          {inputValue.trim() ? (
            <button 
              onClick={handleSend}
              className="p-3 bg-oja-teal text-white rounded-full hover:bg-oja-teal/90 transition-transform active:scale-95 flex-shrink-0 shadow-sm"
            >
              <Send size={20} />
            </button>
          ) : (
            <button 
              onClick={handleVoiceMail}
              className={`p-3 rounded-full transition-transform active:scale-95 flex-shrink-0 shadow-sm ${
                isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-oja-orange text-white hover:bg-oja-orange/90'
              }`}
            >
              <Mic size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
