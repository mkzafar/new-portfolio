import React from "react";

export function Progress({ value = 0, className = "", ...props }) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={`relative w-full rounded-full bg-slate-200/70 overflow-hidden ${className}`}
      {...props}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
