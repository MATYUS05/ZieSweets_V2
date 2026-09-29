import { sortOptions } from '../../lib/catalog'

export default function CatalogFilters({ filters, categories, onChange }) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search treats</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 fill-none stroke-cocoa"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m20 20-4.5-4.5" />
          </svg>
          <input
            type="search"
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Search treats…"
            className="field pr-5 pl-12"
          />
        </label>
        <label className="relative sm:w-56">
          <span className="sr-only">Sort by</span>
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value })}
            className="field select-pill cursor-pointer appearance-none pr-11 pl-5"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-sm transition-[rotate]">
            ▼
          </span>
        </label>
      </div>

      <div
        role="group"
        aria-label="Filter by category"
        className="scrollbar-brand -mx-5 flex gap-2 overflow-x-auto px-5 pt-1 pb-4 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {categories.map(({ name, count }) => {
          const active = name === filters.category
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => onChange({ category: name })}
              className={`flex shrink-0 items-center gap-2 rounded-full border-2 border-cocoa px-4 py-2 font-bold shadow-hard transition-colors ${active ? 'bg-cocoa text-cream' : 'bg-white hover:bg-gold'}`}
            >
              {name}
              <span className="text-xs tabular-nums opacity-70">{count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
