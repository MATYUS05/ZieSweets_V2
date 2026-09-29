const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })

export const formatPrice = (value) => rupiah.format(value)

export function summarizeOrder(items) {
  return {
    count: items.reduce((sum, item) => sum + item.qty, 0),
    total: items.reduce((sum, item) => sum + item.qty * item.price, 0),
  }
}

export function formatDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function orderMessage(items, { name = '', date = '', notes = '' } = {}) {
  const lines = items.map((item) => `• ${item.qty}x ${item.name} — ${formatPrice(item.qty * item.price)}`)
  const details = [
    name.trim() && `Name: ${name.trim()}`,
    date && `Needed on: ${formatDate(date)}`,
    notes.trim() && `Notes: ${notes.trim()}`,
  ].filter(Boolean)

  return [
    'Hi ZieSweets, I would like to order:',
    '',
    ...lines,
    '',
    `Total: ${formatPrice(summarizeOrder(items).total)}`,
    ...(details.length ? ['', ...details] : []),
  ].join('\n')
}
