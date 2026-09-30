import { useRef, useState } from 'react'
import logoMark from '../../assets/img/logo-mark.webp'
import { eventOrderHref, orderHref, products, snackBoxHref, snackBoxPresets } from '../../data/site'
import { baseProducts, filterProducts, getCategories } from '../../lib/catalog'
import { boxItems } from '../../lib/order'
import useHashDialog from '../../lib/useHashDialog'
import CatalogFilters from '../ui/CatalogFilters'
import CatalogItem from '../ui/CatalogItem'
import Choice from '../ui/Choice'
import HandNote from '../ui/HandNote'
import Logo from '../ui/Logo'
import OrderBox from '../ui/OrderBox'
import Pagination from '../ui/Pagination'
import SectionHeading from '../ui/SectionHeading'
import SnackBoxBuilder from '../ui/SnackBoxBuilder'
import SnackPickItem from '../ui/SnackPickItem'

const perPage = 8
const initialFilters = { query: '', category: 'All', sort: 'all' }
const tabs = ['By the piece', 'Snack box']
const initialDraft = { size: 3, picks: [], qty: snackBoxPresets[0] }
const orderRoutes = {
  [orderHref]: {},
  [eventOrderHref]: { tab: tabs[0] },
  [snackBoxHref]: { tab: tabs[1] },
}

export default function Catalog({ box, setBox, snackBoxes, setSnackBoxes }) {
  const dialogRef = useRef(null)
  const resultsRef = useRef(null)
  const [filters, setFilters] = useState(initialFilters)
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState(tabs[0])
  const [draft, setDraft] = useState(initialDraft)
  const snackMode = tab === tabs[1]

  const clearHash = useHashDialog(dialogRef, orderRoutes, (route) => route.tab && setTab(route.tab))

  const updateFilters = (patch) => {
    setFilters((current) => ({ ...current, ...patch }))
    setPage(1)
  }

  const goToPage = (next) => {
    setPage(next)
    resultsRef.current.scrollIntoView({ block: 'start' })
  }

  const togglePick = (name) =>
    setDraft((current) => ({
      ...current,
      picks: current.picks.includes(name) ? current.picks.filter((n) => n !== name) : [...current.picks, name],
    }))

  const addSnackBox = () => {
    setSnackBoxes((current) => [...current, { size: draft.size, items: draft.picks, qty: draft.qty }])
    setDraft((current) => ({ ...current, picks: [] }))
  }

  const clearOrder = () => {
    setBox({})
    setSnackBoxes([])
  }

  const base = baseProducts(products, filters.sort)
  const categories = getCategories(base)
  const category = categories.some((c) => c.name === filters.category) ? filters.category : 'All'
  const results = filterProducts(base, { ...filters, category })
  const pageCount = Math.ceil(results.length / perPage)
  const start = (page - 1) * perPage
  const visible = results.slice(start, start + perPage)
  const items = boxItems(products, box)

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="catalog-title"
      onClose={clearHash}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto scroll-smooth border-0 bg-cream p-0 text-cocoa motion-reduce:scroll-auto"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 flex animate-lid-open flex-col items-center justify-center gap-5 border-b-2 border-cocoa bg-gold motion-reduce:hidden"
      >
        <img src={logoMark} alt="" className="size-24 -rotate-6 rounded-full border-2 border-cocoa shadow-hard-lg" />
        <p className="font-display text-3xl font-black italic">opening your box ✦</p>
      </div>

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
          <SectionHeading
            id="catalog-title"
            eyebrow="Order menu"
            title={snackMode ? 'Build a snack box.' : 'Fill your box.'}
          />
          <HandNote flip className="hidden md:flex">
            we’ll confirm on WhatsApp ✦
          </HandNote>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-start">
          <div className="grid gap-8 lg:col-span-8">
            <Choice
              name="catalog-view"
              legend="How would you like to order?"
              options={tabs}
              value={tab}
              onChange={setTab}
            />

            {snackMode && (
              <SnackBoxBuilder
                draft={draft}
                onChange={(patch) => setDraft((current) => ({ ...current, ...patch }))}
                onRemove={togglePick}
                onAdd={addSnackBox}
              />
            )}

            <div ref={resultsRef} className="scroll-mt-24">
              <CatalogFilters filters={{ ...filters, category }} categories={categories} onChange={updateFilters} />

              <p aria-live="polite" className="mt-4 text-sm font-semibold text-cocoa-muted">
                {results.length > 0
                  ? `Showing ${start + 1}–${start + visible.length} of ${results.length} treats`
                  : 'No treats found'}
              </p>

              {results.length > 0 ? (
                <ul
                  className={`mt-6 grid ${snackMode ? 'grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4' : 'gap-6 sm:grid-cols-2 sm:gap-8'}`}
                >
                  {visible.map((product) => (
                    <li key={product.name}>
                      {snackMode ? (
                        <SnackPickItem
                          product={product}
                          picked={draft.picks.includes(product.name)}
                          full={draft.picks.length >= draft.size}
                          onToggle={togglePick}
                        />
                      ) : (
                        <CatalogItem
                          product={product}
                          box={box}
                          onChange={(key, qty) => setBox((current) => ({ ...current, [key]: qty }))}
                        />
                      )}
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
          </div>

          <OrderBox
            items={items}
            snackBoxes={snackBoxes}
            onRemoveItem={(key) => setBox((current) => ({ ...current, [key]: 0 }))}
            onRemoveSnackBox={(index) => setSnackBoxes((current) => current.filter((_, i) => i !== index))}
            onClear={clearOrder}
            hideMobileBar={snackMode && draft.picks.length > 0}
            className="lg:sticky lg:top-26 lg:col-span-4"
          />
        </div>
      </div>
    </dialog>
  )
}
