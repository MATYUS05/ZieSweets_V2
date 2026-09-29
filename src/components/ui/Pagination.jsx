const base =
  'grid min-h-11 min-w-11 place-items-center rounded-full border-2 border-cocoa font-bold transition-colors disabled:opacity-40'

export default function Pagination({ page, pageCount, onChange, className = '' }) {
  if (pageCount < 2) return null

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav aria-label="Pagination" className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
        className={`${base} bg-white px-4 shadow-hard enabled:hover:bg-gold`}
      >
        ← Prev
      </button>
      {pages.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`Page ${n}`}
          aria-current={n === page ? 'page' : undefined}
          className={`${base} tabular-nums ${n === page ? 'bg-cocoa text-cream' : 'bg-white hover:bg-gold'}`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
        className={`${base} bg-white px-4 shadow-hard enabled:hover:bg-gold`}
      >
        Next →
      </button>
    </nav>
  )
}
