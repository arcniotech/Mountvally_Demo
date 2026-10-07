import React from 'react';
import { CloudOff, RotateCw, AlertTriangle, FileQuestion } from 'lucide-react';

export function ErrorState({
  title = "Connection trouble",
  subtitle = "Could not load data from the network",
  onRetry,
  retryLabel = "Retry",
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft my-4 ${className}`}>
      {/* Soft rounded reddish squircle */}
      <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center mb-4 text-rose-500 shadow-xs">
        <CloudOff className="w-8 h-8 stroke-[1.75]" />
      </div>
      <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">
        {subtitle}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs md:text-sm transition-all touch-press"
        >
          <RotateCw className="w-4 h-4" />
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  icon: Icon = FileQuestion,
  title = "No records found",
  subtitle = "There are no items matching your current view or filter.",
  actionLabel,
  onAction,
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft my-4 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500 shadow-xs">
        <Icon className="w-8 h-8 stroke-[1.75]" />
      </div>
      <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">
        {subtitle}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs md:text-sm shadow-sm transition-all touch-press"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
