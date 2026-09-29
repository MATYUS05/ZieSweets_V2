import { useEffect, useRef, useState } from 'react'
import { orderHref, products } from '../../data/site'
import { baseProducts, filterProducts, getCategories } from '../../lib/catalog'
import CatalogFilters from '../ui/CatalogFilters'
import CatalogItem from '../ui/CatalogItem'
import HandNote from '../ui/HandNote'
import Logo from '../ui/Logo'
import OrderBox from '../ui/OrderBox'
import Pagination from '../ui/Pagination'
import SectionHeading from '../ui/SectionHeading'

const perPage = 8
const boxKey = 'ziesweets-box'

function loadBox() {
  try {
    return JSON.parse(localStorage.getItem(boxKey)) ?? {}
  } catch {
    return {}
  }
}
const initialFilters = { query: '', category: 'All', sort: 'all' }

export default function Catalog() {
  const dialogRef = useRef(null)
  const resultsRef = useRef(null)
  const [box, setBox] = useState(loadBox)
  const [filters, setFilters] = useState(initialFilters)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const dialog = dialogRef.current
    const sync = () => {
      const shouldOpen = location.hash === orderHref
      if (shouldOpen && !dialog.open) dialog.showModal()
      if (!shouldOpen && dialog.open) dialog.close()
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(boxKey, JSON.stringify(box))
    } catch {
      return
    }
  }, [box])

  const clearHash = () => {
    if (location.hash === orderHref) history.replaceState(null, '', location.pathname + location.search)
  }

  const updateFilters = (patch) => {
    setFilters((current) => ({ ...current, ...patch }))
    setPage(1)
  }

  const goToPage = (next) => {
    setPage(next)
    resultsRef.current.scrollIntoView({ block: 'start' })
  }

  const base = baseProducts(products, filters.sort)
  const categories = getCategories(base)
  const category = categories.some((c) => c.name === filters.category) ? filters.category : 'All'
  const results = filterProducts(base, { ...filters, category })
  const pageCount = Math.ceil(results.length / perPage)
  const start = (page - 1) * perPage
  const visible = results.slice(start, start + perPage)
  const items = products.filter((p) => box[p.name] > 0).map((p) => ({ ...p, qty: box[p.name] }))

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="catalog-title"
      onClose={clearHash}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto scroll-smooth border-0 bg-cream p-0 text-cocoa open:animate-rise motion-reduce:scroll-auto"
    >
      <div className="sticky top-0 z-20 border-b-2 border-cocoa bg-cream">
        <div className="shell flex h-18 items-center justify-between gap-6">
          <Logo />
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            aria-label="Close order menu"
            className="flex size-12 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-cocoa bg-gold shadow-hard"
          >
            <span className="h-0.5 w-5 translate-y-1 rotate-45 bg-cocoa" />
            <span className="h-0.5 w-5 -translate-y-1 -rotate-45 bg-cocoa" />
          </button>
        </div>
      </div>

      <div className="shell pt-12 pb-32 md:pt-16 lg:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="catalog-title" eyebrow="Order menu" title="Fill your box." />
          <HandNote flip className="hidden md:flex">
            we’ll confirm on WhatsApp ✦
          </HandNote>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-start">
          <div ref={resultsRef} className="scroll-mt-24 lg:col-span-8">
            <CatalogFilters filters={{ ...filters, category }} categories={categories} onChange={updateFilters} />

            <p aria-live="polite" className="mt-4 text-sm font-semibold text-cocoa-muted">
              {results.length > 0
                ? `Showing ${start + 1}–${start + visible.length} of ${results.length} treats`
                : 'No treats found'}
            </p>

            {results.length > 0 ? (
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
                {visible.map((product) => (
                  <li key={product.name}>
                    <CatalogItem
                      product={product}
                      qty={box[product.name] ?? 0}
                      onChange={(qty) => setBox((current) => ({ ...current, [product.name]: qty }))}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 border-2 border-dashed border-cocoa/40 px-6 py-14 text-center">
                <p className="font-display text-3xl font-black uppercase">Nothing here… yet</p>
                <p className="mt-2 text-cocoa-muted">Try another word or pick a different category.</p>
                <button
                  type="button"
                  onClick={() => updateFilters(initialFilters)}
                  className="mt-6 font-semibold underline underline-offset-4 hover:text-cocoa-muted"
                >
                  Clear search & filters
                </button>
              </div>
            )}

            <Pagination page={page} pageCount={pageCount} onChange={goToPage} className="mt-12" />
          </div>

          <OrderBox items={items} onClear={() => setBox({})} className="lg:sticky lg:top-26 lg:col-span-4" />
        </div>
      </div>
    </dialog>
  )
}
