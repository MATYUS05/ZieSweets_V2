import { formatPrice, minQty } from './order'

export function menuSections(products) {
  return [...new Set(products.map((p) => p.category))].map((category) => {
    const items = products.filter((p) => p.category === category)
    return {
      title: category,
      photo: items.find((p) => p.image),
      items: items.map((p) => ({
        name: p.name,
        description: p.description,
        rows: p.packs
          ? p.packs.map((size) => ({ label: `box of ${size}`, price: p.price * size }))
          : [{ price: p.price }],
        note: p.packs ? `${formatPrice(p.price)}/pc` : (p.size ?? (minQty(p) > 1 ? `min. ${minQty(p)} pcs` : null)),
      })),
    }
  })
}

export function menuText(sections, snackBoxSizes, url) {
  const itemLines = (item) =>
    item.rows.length > 1
      ? [`• ${item.name}`, ...item.rows.map((row) => `   ${row.label}: ${formatPrice(row.price)}`)]
      : [`• ${item.name}: ${formatPrice(item.rows[0].price)}${item.note ? ` (${item.note})` : ''}`]

  return [
    'ZieSweets menu ✦',
    ...sections.flatMap((section) => ['', section.title.toUpperCase(), ...section.items.flatMap(itemLines)]),
    '',
    `SNACK BOX`,
    `• ${snackBoxSizes[0]}–${snackBoxSizes.at(-1)} different treats per box, price on request`,
    '',
    `Order online: ${url}`,
  ].join('\n')
}
