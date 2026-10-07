import React from 'react';

export function ChipSelector({ label, options, value, onChange, className = '', activeColor = 'teal' }) {
  const getActiveClass = () => {
    switch (activeColor) {
      case 'purple':
        return 'bg-indigo-600 text-white shadow-sm';
      case 'green':
        return 'bg-emerald-600 text-white shadow-sm';
      case 'brand':
        return 'bg-brand-500 text-white shadow-sm';
      case 'teal':
      default:
        return 'bg-teal-600 text-white shadow-sm';
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <span className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
          {label}
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option.value || value === option;
          const optValue = option.value !== undefined ? option.value : option;
          const optLabel = option.label !== undefined ? option.label : option;

          return (
            <button
              type="button"
              key={optValue}
              onClick={() => onChange(optValue)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all touch-press ${
                isSelected
                  ? getActiveClass()
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60'
              }`}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
