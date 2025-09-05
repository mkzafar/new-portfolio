export function Textarea({ className = '', ...props }) {
  return <textarea className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400 ${className}`} {...props} />
}