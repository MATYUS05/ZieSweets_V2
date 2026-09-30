import { useId, useRef, useState } from 'react'
import { formatDate } from '../../lib/order'

const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const pad = (n) => String(n).padStart(2, '0')
const toIso = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`

function monthOf(iso) {
  const [year, month] = iso.split('-').map(Number)
  return { year, month: month - 1 }
}

export default function DateField({ ref, name, value, onChange, min, today, labelledBy, describedBy, invalid }) {
  const id = useId()
  const popoverRef = useRef(null)
  const [view, setView] = useState(() => monthOf(value || min))

  const first = new Date(view.year, view.month, 1)
  const offset = (first.getDay() + 6) % 7
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => toIso(view.year, view.month, i + 1))
  const minMonth = monthOf(min)
  const atFirstMonth = view.year * 12 + view.month <= minMonth.year * 12 + minMonth.month

  const shift = (step) => {
    const next = new Date(view.year, view.month + step, 1)
    setView({ year: next.getFullYear(), month: next.getMonth() })
  }

  const pick = (iso) => {
    onChange(iso)
    popoverRef.current.hidePopover()
  }

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <button
        ref={ref}
        type="button"
        popoverTarget={`${id}-calendar`}
        aria-labelledby={`${labelledBy} ${id}-value`}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className="date-trigger field flex items-center justify-between gap-3 bg-cream px-5 text-left"
      >
        <span id={`${id}-value`} className={`truncate ${value ? '' : 'text-cocoa-muted/70'}`}>
          {value ? formatDate(value, 'short') : 'Pick a date'}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-5 shrink-0 fill-none stroke-cocoa"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
      </button>

      <div
        ref={popoverRef}
        id={`${id}-calendar`}
        popover="auto"
        aria-label="Choose a date"
        onToggle={(event) => event.newState === 'open' && setView(monthOf(value || min))}
        className="date-popover w-80 max-w-[calc(100vw-2rem)] rounded-3xl border-2 border-cocoa bg-white p-4 text-cocoa shadow-hard-lg"
      >
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => shift(-1)}
            disabled={atFirstMonth}
            aria-label="Previous month"
            className="grid size-10 place-items-center rounded-full border-2 border-cocoa font-bold transition-colors enabled:hover:bg-gold disabled:opacity-25"
          >
            ←
          </button>
          <p aria-live="polite" className="font-display text-xl font-black uppercase">
            {first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </p>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="grid size-10 place-items-center rounded-full border-2 border-cocoa font-bold transition-colors hover:bg-gold"
          >
            →
          </button>
        </div>

        <div
          aria-hidden="true"
          className="mt-4 grid grid-cols-7 border-y-2 border-dashed border-cocoa/30 py-2 text-center text-xs font-bold tracking-widest uppercase"
        >
          {weekdays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {days.map((iso, i) => {
            const selected = iso === value
            const disabled = iso < min
            return (
              <button
                key={iso}
                type="button"
                disabled={disabled}
                onClick={() => pick(iso)}
                aria-label={formatDate(iso)}
                aria-pressed={selected}
                aria-current={iso === today ? 'date' : undefined}
                style={i === 0 ? { gridColumnStart: offset + 1 } : undefined}
                className={`grid aspect-square place-items-center rounded-full text-sm font-semibold tabular-nums transition-colors ${
                  selected
                    ? 'bg-cocoa font-bold text-cream'
                    : disabled
                      ? 'cursor-not-allowed text-cocoa/25'
                      : 'hover:bg-gold'
                } ${iso === today && !selected ? 'border-2 border-dashed border-cocoa/50' : ''}`}
              >
                {Number(iso.slice(-2))}
              </button>
            )
          })}
        </div>

        <p className="mt-3 border-t-2 border-dashed border-cocoa/30 pt-3 text-center font-display text-sm italic">
          earliest: {formatDate(min)} ✦
        </p>
      </div>
    </>
  )
}
