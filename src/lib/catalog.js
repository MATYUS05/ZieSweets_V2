export const sortOptions = [
  { value: 'all', label: 'All products' },
  { value: 'best-seller', label: 'Best seller' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A–Z' },
]

const comparators = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
}

export function baseProducts(products, sort) {
  return sort === 'best-seller' ? products.filter((p) => p.bestSeller) : products
}

export function getCategories(products) {
  return ['All', ...new Set(products.map((p) => p.category))].map((name) => ({
    name,
    count: products.filter((p) => name === 'All' || p.category === name).length,
  }))
}

export function filterProducts(products, { query, category, sort }) {
  const search = query.trim().toLowerCase()
  const result = products.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      [p.name, p.category, p.description].some((text) => text.toLowerCase().includes(search)),
  )
  return comparators[sort] ? [...result].sort(comparators[sort]) : result
}
