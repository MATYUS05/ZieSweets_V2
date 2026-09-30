import { useState } from 'react'

export const maxQty = 999

export default function QtyInput({ value, onChange, label, min = 1, emptyValue = min, className = '' }) {
  const [draft, setDraft] = useState(null)

  const type = (event) => {
    setDraft(event.target.value)
    const next = Math.floor(event.target.valueAsNumber)
    if (next >= min) onChange(Math.min(next, maxQty))
  }

  const commit = () => {
    const typed = Number(draft)
    if (draft !== null && !(typed >= 1)) onChange(emptyValue)
    else if (draft !== null && typed < min) onChange(min)
    setDraft(null)
  }

  return (
    <input
      type="number"
      inputMode="numeric"
      min={min}
      max={maxQty}
      value={draft ?? value}
      onChange={type}
      onBlur={commit}
      aria-label={label}
      className={`w-12 [appearance:textfield] bg-transparent text-center text-base font-bold tabular-nums [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${className}`}
    />
  )
}
