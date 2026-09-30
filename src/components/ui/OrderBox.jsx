import { useRef, useState } from 'react'
import {
  formatDate,
  formatPrice,
  fulfilmentOptions,
  isoDate,
  leadTimeDays,
  orderMessage,
  snackBoxLabel,
  summarizeOrder,
} from '../../lib/order'
import Button from './Button'
import Choice, { fieldLabel } from './Choice'
import DateField from './DateField'
import OrderPreview from './OrderPreview'

function RemoveButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-cocoa text-xs font-bold transition-colors hover:bg-gold"
    >
      ✕
    </button>
  )
}

export default function OrderBox({
  items,
  snackBoxes,
  onRemoveSnackBox,
  onRemoveItem,
  onClear,
  hideMobileBar = false,
  className = '',
}) {
  const receiptRef = useRef(null)
  const dateRef = useRef(null)
  const [fulfilment, setFulfilment] = useState(fulfilmentOptions[0])
  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState(false)
  const [preview, setPreview] = useState(null)
  const [dates] = useState(() => ({ today: isoDate(), earliest: isoDate(leadTimeDays) }))
  const needsLeadTime = snackBoxes.length > 0
  const minDate = needsLeadTime ? dates.earliest : dates.today
  const empty = items.length === 0 && snackBoxes.length === 0
  const { count, total } = summarizeOrder(items)
  const boxCount = snackBoxes.reduce((sum, box) => sum + box.qty, 0)
  const countLabel =
    [
      boxCount > 0 && `${boxCount} ${boxCount === 1 ? 'box' : 'boxes'}`,
      count > 0 && `${count} ${count === 1 ? 'item' : 'items'}`,
    ]
      .filter(Boolean)
      .join(' · ') || '0 items'

  const checkout = (event) => {
    event.preventDefault()
    if (!date || date < minDate) {
      setDateError(true)
      dateRef.current.focus()
      return
    }
    const details = Object.fromEntries(new FormData(event.currentTarget))
    setPreview(orderMessage(items, snackBoxes, details))
  }

  return (
    <aside aria-labelledby="order-box-title" className={className}>
      <div ref={receiptRef} className="scrollbar-brand scroll-mt-24 border-2 border-cocoa bg-white p-6 shadow-hard-lg lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id="order-box-title" className="text-3xl font-black whitespace-nowrap uppercase">
            Your box
          </h3>
          <span key={countLabel} data-fly-target className="tag inline-block animate-bump">
            {countLabel}
          </span>
        </div>

        {empty ? (
          <p className="mt-6 border-2 border-dashed border-cocoa/40 p-6 text-center text-cocoa-muted">
            Your box is empty. Add a treat or two, or build a snack box.
          </p>
        ) : (
          <form onSubmit={checkout}>
            <ul className="mt-6 divide-y-2 divide-dashed divide-cocoa/30 border-y-2 border-dashed border-cocoa/30">
              {snackBoxes.map((box, i) => (
                <li key={i} className="flex items-start gap-3 py-3">
                  <span className="min-w-0 flex-1">
                    <span className="font-bold tabular-nums">{box.qty}×</span> {snackBoxLabel(box)}
                    <span className="block text-sm text-cocoa-muted">{box.items.join(', ')}</span>
                  </span>
                  <RemoveButton
                    label={`Remove ${snackBoxLabel(box)}: ${box.items.join(', ')}`}
                    onClick={() => onRemoveSnackBox(i)}
                  />
                </li>
              ))}
              {items.map((item) => (
                <li key={item.name} className="flex items-center gap-3 py-3">
                  <span className="min-w-0 flex-1">
                    <span className="font-bold tabular-nums">{item.qty}×</span> {item.name}
                  </span>
                  <span className="tabular-nums">{formatPrice(item.qty * item.price)}</span>
                  <RemoveButton label={`Remove ${item.name}`} onClick={() => onRemoveItem(item.name)} />
                </li>
              ))}
            </ul>
            {items.length > 0 && (
              <p className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-sm font-bold tracking-[0.15em] uppercase">
                  Total{snackBoxes.length > 0 && ' by the piece'}
                </span>
                <span className="font-display text-3xl font-black">{formatPrice(total)}</span>
              </p>
            )}
            {snackBoxes.length > 0 && (
              <p className="mt-4 text-sm font-semibold text-cocoa-muted">
                {items.length > 0 && '+ '}Snack box price is confirmed by our admin on WhatsApp.
              </p>
            )}

            <fieldset className="mt-6 grid gap-4 border-t-2 border-dashed border-cocoa/30 pt-6">
              <legend className="sr-only">Order details</legend>
              <label>
                <span className={fieldLabel}>Your name</span>
                <input name="name" required autoComplete="name" className="field bg-cream px-5" />
              </label>
              <div>
                <span id="date-label" className={fieldLabel}>
                  Needed on
                </span>
                <DateField
                  ref={dateRef}
                  name="date"
                  value={date}
                  onChange={(value) => {
                    setDate(value)
                    setDateError(false)
                  }}
                  min={minDate}
                  today={dates.today}
                  labelledBy="date-label"
                  describedBy={
                    [dateError && 'date-error', needsLeadTime && 'lead-time-note'].filter(Boolean).join(' ') ||
                    undefined
                  }
                  invalid={dateError}
                />
                {dateError && (
                  <p id="date-error" role="alert" className="mt-2 text-sm font-bold">
                    Please pick a date from {formatDate(minDate)} onwards.
                  </p>
                )}
              </div>
              {needsLeadTime && (
                <p id="lead-time-note" className="-mt-2 text-sm text-cocoa-muted">
                  Snack box orders need {leadTimeDays} days’ notice, with a 50% deposit paid {leadTimeDays} days before.
                </p>
              )}
              <Choice
                name="fulfilment"
                legend="Pickup or delivery"
                options={fulfilmentOptions}
                value={fulfilment}
                onChange={setFulfilment}
              />
              {fulfilment === 'Delivery' && (
                <>
                  <p className="-mt-2 text-sm text-cocoa-muted">Delivery fee follows the ride-hailing app rate.</p>
                  <label>
                    <span className={fieldLabel}>Delivery address</span>
                    <textarea
                      name="address"
                      rows="2"
                      required
                      autoComplete="street-address"
                      className="field resize-none rounded-3xl bg-cream px-5 py-3"
                    />
                  </label>
                </>
              )}
              <label>
                <span className={fieldLabel}>Notes (optional)</span>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Special requests, allergies…"
                  className="field resize-none rounded-3xl bg-cream px-5 py-3"
                />
              </label>
            </fieldset>

            <Button type="submit" className="mt-6 w-full">
              Checkout on WhatsApp →
            </Button>
            <button
              type="button"
              onClick={onClear}
              className="mt-4 w-full text-sm font-semibold underline underline-offset-4 hover:text-cocoa-muted"
            >
              Empty the box
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-cocoa-muted">We’ll confirm your order on WhatsApp.</p>
      </div>

      {!empty && !hideMobileBar && (
        <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t-2 border-cocoa bg-gold px-5 py-3 lg:hidden">
          <p data-fly-target>
            <span
              key={countLabel}
              className="block origin-left animate-bump text-xs font-bold tracking-[0.15em] uppercase"
            >
              {countLabel} in your box
            </span>
            <span className="font-display text-2xl font-black">
              {items.length > 0 ? formatPrice(total) : 'Price via WhatsApp'}
            </span>
          </p>
          <Button type="button" onClick={() => receiptRef.current.scrollIntoView({ block: 'start' })}>
            Review order ↓
          </Button>
        </div>
      )}

      <OrderPreview message={preview} onClose={() => setPreview(null)} />
    </aside>
  )
}
