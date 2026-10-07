import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Badge } from './Badge';

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  iconColor = 'text-brand-500',
  iconBg = 'bg-brand-50 dark:bg-brand-950/40',
  className = "",
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-soft-md transition-all overflow-hidden ${
        onClick ? 'cursor-pointer hover:border-slate-200 dark:hover:border-slate-700 active:scale-[0.99]' : ''
      } ${className}`}
    >
      <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-3 min-w-0">
        <div className="min-w-0 flex-1 overflow-hidden">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5 sm:mb-1 truncate">
            {title}
          </span>
          <h3
            className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight truncate"
            title={typeof value === 'string' || typeof value === 'number' ? String(value) : undefined}
          >
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 flex-shrink-0 ${iconBg} ${iconColor}`}>
            <Icon className="w-4 h-4 sm:w-6 sm:h-6 stroke-[1.8]" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 min-w-0 overflow-hidden">
          {trend && (
            <span className={`font-bold shrink-0 ${trendPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trendPositive ? '↑' : '↓'} {trend}
            </span>
          )}
          {subtitle && <span className="truncate min-w-0">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}

export function MobileDataCard({
  avatar,
  title,
  subtitle,
  badgeText = "ACTIVE",
  badgeVariant = "active",
  onClick,
  action,
  className = ""
}) {
  return (
    <div
      onClick={onClick}
      className={`p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800/90 shadow-soft flex items-center justify-between gap-3 transition-all hover:border-slate-200 dark:hover:border-slate-700 ${
        onClick ? 'cursor-pointer active:scale-[0.99]' : ''
      } ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {avatar ? (
          avatar
        ) : (
          <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm shrink-0">
            {title ? title.charAt(0).toUpperCase() : '?'}
          </div>
        )}
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {badgeText && (
          <Badge variant={badgeVariant} size="sm">
            {badgeText}
          </Badge>
        )}
        {action}
        {onClick && !action && (
          <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        )}
      </div>
    </div>
  );
}
