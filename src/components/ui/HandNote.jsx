export default function HandNote({ children, flip = false, className = '' }) {
  return (
    <p className={`font-display flex items-end gap-1 text-xl leading-tight italic ${className}`}>
      <span className="-rotate-6">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 60 50"
        className={`w-12 shrink-0 fill-none stroke-cocoa ${flip ? '-scale-x-100' : ''}`}
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M4 6c18 2 36 10 42 32" />
        <path d="M36 32l10 8 4-12" />
      </svg>
    </p>
  )
}
