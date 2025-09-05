export function Badge({ className = '', children, ...props }) {
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium border-slate-200 text-slate-700 bg-slate-50 ${className}`} {...props}>{children}</span>
}