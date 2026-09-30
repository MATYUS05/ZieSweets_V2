const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })

export const formatPrice = (value) => rupiah.format(value)

export function summarizeOrder(items) {
  return {
    count: items.reduce((sum, item) => sum + item.qty * (item.pack ?? 1), 0),
    total: items.reduce((sum, item) => sum + item.qty * item.price, 0),
  }
}

export const leadTimeDays = 2
export const minPieces = 3

export const minQty = (product) => (product.packs || product.category === 'Cake' ? 1 : minPieces)

export const packName = (product, size) => `${product.name} (box of ${size})`

export function boxItems(products, box) {
  return products
    .flatMap((p) =>
      p.packs ? p.packs.map((size) => ({ ...p, name: packName(p, size), price: p.price * size, pack: size })) : [p],
    )
    .filter((item) => box[item.name] > 0)
    .map((item) => ({ ...item, qty: box[item.name] }))
}

export function isoDate(daysFromNow = 0) {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toLocaleDateString('en-CA')
}

export function formatDate(value, length = 'long') {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    weekday: length,
    day: 'numeric',
    month: length,
    year: 'numeric',
  })
}

export const fulfilmentOptions = ['Pickup', 'Delivery']

export const snackBoxLabel = (snackBox) => `Snack box of ${snackBox.size}`

export function orderMessage(
  items,
  snackBoxes,
  { name = '', date = '', fulfilment = '', address = '', notes = '' } = {},
) {
  const lines = [
    ...snackBoxes.map((box) => `• ${box.qty}x ${snackBoxLabel(box)}: ${box.items.join(', ')}`),
    ...items.map((item) => `• ${item.qty}x ${item.name} — ${formatPrice(item.qty * item.price)}`),
  ]
  const totals = [
    items.length > 0 &&
      `Total${snackBoxes.length ? ' (by the piece)' : ''}: ${formatPrice(summarizeOrder(items).total)}`,
    snackBoxes.length > 0 && 'Snack box price: please confirm',
  ].filter(Boolean)
  const details = [
    name.trim() && `Name: ${name.trim()}`,
    date && `Needed on: ${formatDate(date)}`,
    fulfilment && `Pickup / delivery: ${fulfilment}`,
    address.trim() && `Address: ${address.trim()}`,
    notes.trim() && `Notes: ${notes.trim()}`,
  ].filter(Boolean)

  return [
    'Hi ZieSweets, I would like to order:',
    '',
    ...lines,
    '',
    ...totals,
    ...(details.length ? ['', ...details] : []),
  ].join('\n')
}
