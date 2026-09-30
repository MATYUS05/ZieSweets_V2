import { useRef, useState } from 'react'
import flyToBox from '../../lib/flyToBox'
import { formatPrice, minQty, packName } from '../../lib/order'
import ProductPhoto from './ProductPhoto'
import QtyInput, { maxQty } from './QtyInput'

const media = 'aspect-square w-28 shrink-0 self-start border-2 border-cocoa sm:aspect-[4/3] sm:w-full'

export default function CatalogItem({ product, box, onChange }) {
  const addRef = useRef(null)
  const photoRef = useRef(null)
  const [pack, setPack] = useState(product.packs?.[0])
  const key = pack ? packName(product, pack) : product.name
  const qty = box[key] ?? 0
  const min = minQty(product)
  const inBox = qty > 0
  const anyInBox = product.packs ? product.packs.some((size) => box[packName(product, size)] > 0) : inBox
  const note = pack
    ? `box of ${pack} · ${formatPrice(product.price)}/pc`
    : (product.size ?? (min > 1 ? `min. ${min} pcs` : null))

  const set = (next) => onChange(key, next)

  const add = () => {
    if (inBox) return set(Math.min(qty + 1, maxQty))
    set(min)
    flyToBox(photoRef.current)
  }

  const decrease = () => {
    if (qty <= min) {
      addRef.current.focus()
      set(0)
    } else set(qty - 1)
  }

  return (
    <article
      className={`relative flex h-full gap-4 border-2 border-cocoa p-3 shadow-hard transition-colors sm:flex-col ${anyInBox ? 'bg-gold-soft' : 'bg-white'}`}
    >
      {product.featured && (
        <span className="absolute -top-4 -right-3 rotate-12 rounded-full border-2 border-cocoa bg-gold px-3 py-1 text-xs font-bold tracking-widest uppercase shadow-hard">
          Signature
        </span>
      )}
      <ProductPhoto
        ref={photoRef}
        product={product}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 112px"
        className={media}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl leading-tight font-black uppercase sm:text-2xl">{product.name}</h3>
          <span className="tag max-sm:hidden">{product.category}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-cocoa-muted sm:mt-2">{product.description}</p>
        {product.packs && (
          <div role="group" aria-label={`${product.name} box size`} className="mt-3 flex flex-wrap gap-2">
            {product.packs.map((size) => {
              const boxes = box[packName(product, size)] ?? 0
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={pack === size}
                  onClick={() => setPack(size)}
                  className={`min-h-11 rounded-full border-2 border-cocoa px-4 text-sm font-bold transition-colors ${pack === size ? 'bg-cocoa text-cream' : 'bg-white hover:bg-gold'}`}
                >
                  {size} pcs
                  {boxes > 0 && <span className="tabular-nums"> · {boxes}</span>}
                </button>
              )
            })}
          </div>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <p className="font-display text-xl font-black sm:text-2xl">
            {formatPrice(product.price * (pack ?? 1))}
            {note && <span className="block font-sans text-xs font-semibold text-cocoa-muted">{note}</span>}
          </p>
          <div
            className={`flex items-center rounded-full border-2 border-cocoa shadow-hard ${inBox ? 'bg-white' : 'bg-gold'}`}
          >
            {inBox && (
              <>
                <button
                  type="button"
                  onClick={decrease}
                  aria-label={qty <= min ? `Remove ${key}` : `Remove one ${key}`}
                  className="grid size-11 place-items-center rounded-full text-xl font-bold hover:bg-gold"
                >
                  −
                </button>
                <QtyInput value={qty} onChange={set} min={min} emptyValue={0} label={`Quantity of ${key}`} />
              </>
            )}
            <button
              ref={addRef}
              type="button"
              onClick={add}
              aria-label={inBox ? `Add one more ${key}` : `Add ${min > 1 ? `${min} ` : ''}${key} to your box`}
              className={`grid min-h-11 place-items-center rounded-full font-bold hover:bg-gold ${inBox ? 'size-11 text-xl' : 'px-5'}`}
            >
              {inBox ? '+' : 'Add +'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
