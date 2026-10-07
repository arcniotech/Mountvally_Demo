import React from 'react';

export function PageHeader({
  title,
  subtitle,
  children,
  action,
  showAccent = true,
  className = ""
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ${className}`}>
      <div>
        <div className="relative inline-block">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h1>
          {showAccent && (
            <div className="h-1 w-8 bg-amber-500 rounded-full mt-1.5" />
          )}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {(action || children) && (
        <div className="flex items-center gap-3 flex-wrap">
          {children}
          {action}
        </div>
      )}
    </div>
  );
}
