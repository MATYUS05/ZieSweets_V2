const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })

export const formatPrice = (value) => rupiah.format(value)

export function summarizeOrder(items) {
  return {
    count: items.reduce((sum, item) => sum + item.qty, 0),
    total: items.reduce((sum, item) => sum + item.qty * item.price, 0),
  }
}

export function orderMessage(items) {
  const lines = items.map((item) => `• ${item.qty}x ${item.name} — ${formatPrice(item.qty * item.price)}`)
  return ['Hi ZieSweets, I would like to order:', '', ...lines, '', `Total: ${formatPrice(summarizeOrder(items).total)}`].join('\n')
}
