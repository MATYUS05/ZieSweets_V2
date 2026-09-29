export default function Pill({ className = 'bg-white', children }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 border-cocoa px-4 py-1.5 text-xs font-bold tracking-[0.15em] uppercase shadow-hard ${className}`}
    >
      {children}
    </span>
  )
}
