import React from "react";

export function InstitutionLogo({
  className = "w-10 h-10",
  showText = false,
  textClassName = "",
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`relative shrink-0 ${className}`}>
        <img
          src="/mountvally-logo.png"
          alt="Mount Valley Public School"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {showText && (
        <div className={textClassName}>
          <span className="font-extrabold text-lg sm:text-xl tracking-tight block text-slate-900 dark:text-white leading-tight">
            mount
            <span className="text-emerald-600 dark:text-emerald-400">vally</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium tracking-wide block">
            Mount Valley.com
          </span>
        </div>
      )}
    </div>
  );
}
