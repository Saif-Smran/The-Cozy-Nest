"use client";
import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';

export interface ToastItem { id: string; type?: 'success' | 'error' | 'info'; title: string; message?: string; timeout?: number }

interface ToastContextValue {
  push: (t: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((t: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = { id, timeout: 2500, ...t };
    setToasts(prev => [...prev, item]);
    if (item.timeout) {
      setTimeout(() => {
        setToasts(prev => prev.filter(x => x.id !== id));
      }, item.timeout);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed top-4 right-4 z-[2000] flex flex-col gap-3">
        {toasts.map(t => (
          <div key={t.id} className={`rounded-md px-4 py-3 min-w-[240px] shadow-xl animate-fade-in-up text-base-content bg-base-100 border border-base-300 dark:bg-base-200/95 dark:border-base-300/40 ring-1 ring-black/5 flex flex-col gap-0.5 ${t.type === 'success' ? 'border-l-4 border-l-green-500' : t.type === 'error' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-sky-500'}`}>
            <p className="font-semibold text-sm leading-tight">{t.title}</p>
            {t.message && <p className="text-xs opacity-90 leading-snug pr-2">{t.message}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Simple animation utilities (Tailwind layer could be used instead)
// Add keyframes via a style tag (since no tailwind config snippet here)
if (typeof document !== 'undefined' && !document.getElementById('toast-anim-style')) {
  const style = document.createElement('style');
  style.id = 'toast-anim-style';
  style.innerHTML = `@keyframes fade-in-up { from { opacity:0; transform: translateY(6px);} to { opacity:1; transform: translateY(0);} } .animate-fade-in-up{animation:fade-in-up .35s ease both;}`;
  document.head.appendChild(style);
}
