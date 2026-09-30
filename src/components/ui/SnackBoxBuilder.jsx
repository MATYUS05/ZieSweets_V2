import { useRef, useState } from 'react'
import logoMark from '../../assets/img/logo-mark.webp'
import { products, snackBoxPresets, snackBoxSizes } from '../../data/site'
import flyToBox from '../../lib/flyToBox'
import BoxSlots from './BoxSlots'
import Button from './Button'
import { fieldLabel } from './Choice'
import QtyInput, { maxQty } from './QtyInput'

export default function SnackBoxBuilder({ draft, onChange, onRemove, onAdd }) {
  const panelRef = useRef(null)
  const slotsRef = useRef(null)
  const [added, setAdded] = useState(false)
  const picked = draft.picks.map((name) => products.find((p) => p.name === name))
  const left = draft.size - draft.picks.length
  const full = left === 0
  const boxes = `${draft.qty} ${draft.qty === 1 ? 'box' : 'boxes'}`

  const add = () => {
    flyToBox(slotsRef.current)
    onAdd()
    setAdded(true)
  }

  const status = full
    ? 'Box full — ready to add.'
    : added && draft.picks.length === 0
      ? 'Added to your order ✓ Build another box or check out.'
      : `Pick ${left} more ${left === 1 ? 'treat' : 'treats'}, each one different.`

  return (
    <section
      ref={panelRef}
      aria-labelledby="snack-builder-title"
      className="scroll-mt-24 border-2 border-cocoa bg-white p-5 shadow-hard-lg md:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id="snack-builder-title" className="text-3xl font-black uppercase">
          Your snack box
        </h3>
        <span className="tag tabular-nums">
          {draft.picks.length}/{draft.size} filled
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-start md:gap-8">
        <fieldset>
          <legend className={fieldLabel}>Box size</legend>
          <div className="grid grid-cols-4 gap-2">
            {snackBoxSizes.map((size) => (
              <label key={size} className="block h-full">
                <input
                  type="radio"
                  name="snack-size"
                  value={size}
                  checked={draft.size === size}
                  onChange={() => onChange({ size, picks: draft.picks.slice(0, size) })}
                  className="peer sr-only"
                />
                <span className="flex h-full cursor-pointer flex-col justify-between gap-2 border-2 border-cocoa p-2 shadow-hard transition-colors peer-checked:bg-cocoa peer-checked:text-cream peer-focus-visible:outline-3 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-cocoa peer-[:not(:checked)]:bg-white peer-[:not(:checked)]:hover:bg-gold">
                  <BoxSlots size={size} mini />
                  <span className="text-center text-xs font-bold whitespace-nowrap sm:text-sm">{size} treats</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="relative overflow-hidden pr-1 pb-1">
            <BoxSlots ref={slotsRef} size={draft.size} items={picked} onRemove={onRemove} />
            {full && (
              <span
                key={draft.picks.join()}
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-1 bottom-1 left-0 flex animate-lid-close items-center justify-center gap-3 border-2 border-cocoa bg-gold motion-reduce:hidden"
              >
                <img
                  src={logoMark}
                  alt=""
                  className="size-12 -rotate-12 rounded-full border-2 border-cocoa shadow-hard"
                />
                <span className="font-display text-2xl font-black italic">packed!</span>
              </span>
            )}
          </div>
          <p aria-live="polite" className="mt-3 text-sm font-semibold text-cocoa-muted">
            {status}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6 border-t-2 border-dashed border-cocoa/30 pt-6 md:flex-row md:items-end md:justify-between">
        <div role="group" aria-labelledby="snack-qty-label">
          <p id="snack-qty-label" className={fieldLabel}>
            How many boxes?
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-full border-2 border-cocoa bg-white shadow-hard">
              <button
                type="button"
                onClick={() => onChange({ qty: Math.max(1, draft.qty - 1) })}
                aria-label="One box less"
                className="grid size-11 place-items-center rounded-full text-xl font-bold hover:bg-gold"
              >
                −
              </button>
              <QtyInput value={draft.qty} onChange={(qty) => onChange({ qty })} label="Number of snack boxes" />
              <button
                type="button"
                onClick={() => onChange({ qty: Math.min(maxQty, draft.qty + 1) })}
                aria-label="One box more"
                className="grid size-11 place-items-center rounded-full text-xl font-bold hover:bg-gold"
              >
                +
              </button>
            </div>
            {snackBoxPresets.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={draft.qty === n}
                onClick={() => onChange({ qty: n })}
                className={`min-h-11 min-w-11 rounded-full border-2 border-cocoa px-3 font-bold tabular-nums transition-colors ${draft.qty === n ? 'bg-cocoa text-cream' : 'bg-white hover:bg-gold'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="button"
          disabled={!full}
          onClick={add}
          className="shrink-0 disabled:pointer-events-none disabled:opacity-40"
        >
          Add {boxes} to order →
        </Button>
      </div>

      {draft.picks.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t-2 border-cocoa bg-cocoa px-5 py-3 text-cream lg:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <BoxSlots size={draft.size} mini className="w-12 shrink-0" />
            <p className="text-xs font-bold tracking-[0.15em] uppercase">
              {draft.picks.length}/{draft.size} in your snack box
            </p>
          </div>
          {full ? (
            <Button type="button" variant="gold" onClick={add} className="shrink-0 whitespace-nowrap">
              Add {boxes} →
            </Button>
          ) : (
            <Button
              type="button"
              variant="gold"
              onClick={() => panelRef.current.scrollIntoView({ block: 'start' })}
              className="shrink-0 whitespace-nowrap"
            >
              View box ↑
            </Button>
          )}
        </div>
      )}
    </section>
  )
}
