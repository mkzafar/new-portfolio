export function Button({ className = '', children, ...props }) {
  return <button className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50 ${className}`} {...props}>{children}</button>
}