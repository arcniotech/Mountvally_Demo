import React from 'react';

export function Badge({ children, variant = 'primary', className = '', size = 'md' }) {
  const base = 'inline-flex items-center justify-center font-semibold uppercase tracking-wider rounded-full transition-colors';
  
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const variants = {
    primary: 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 border border-brand-200 dark:border-brand-800',
    teal: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border border-teal-200 dark:border-teal-800',
    pro: 'bg-[#FEF3C7] text-[#D97706] font-bold text-[11px] px-2 py-0.5 rounded-md border border-[#FDE68A] shadow-xs',
    active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
    pending: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
    danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-800',
  };

  return (
    <span className={`${base} ${sizeClasses[size] || sizeClasses.md} ${variants[variant] || variants.primary} ${className}`}>
      {children}
    </span>
  );
}
