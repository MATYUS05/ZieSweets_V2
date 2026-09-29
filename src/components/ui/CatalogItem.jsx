import { useRef } from 'react'
import logoMark from '../../assets/img/logo-mark.png'
import { formatPrice } from '../../lib/order'

const media = 'aspect-square w-28 shrink-0 self-start border-2 border-cocoa sm:aspect-[4/3] sm:w-full'

export default function CatalogItem({ product, qty, onChange }) {
  const addRef = useRef(null)
  const inBox = qty > 0

  const decrease = () => {
    if (qty === 1) addRef.current.focus()
    onChange(qty - 1)
  }

  return (
    <article
      className={`relative flex h-full gap-4 border-2 border-cocoa p-3 shadow-hard transition-colors sm:flex-col ${inBox ? 'bg-gold-soft' : 'bg-white'}`}
    >
      {product.featured && (
        <span className="absolute -top-4 -right-3 rotate-12 rounded-full border-2 border-cocoa bg-gold px-3 py-1 text-xs font-bold tracking-widest uppercase shadow-hard">
          Signature
        </span>
      )}
      {product.image ? (
        <img
          src={product.image}
          srcSet={product.srcSet}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 112px"
          alt={product.alt}
          loading="lazy"
          style={{ objectPosition: product.imagePosition }}
          className={`${media} object-cover`}
        />
      ) : (
        <div
          className={`${media} flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(-45deg,var(--color-cream)_0_12px,var(--color-gold-soft)_12px_24px)]`}
        >
          <img src={logoMark} alt="" loading="lazy" className="size-10 rounded-full border-2 border-cocoa sm:size-14" />
          <span className="font-display text-sm italic max-sm:hidden">photo coming soon</span>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl leading-tight font-black uppercase sm:text-2xl">{product.name}</h3>
          <span className="tag max-sm:hidden">{product.category}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-cocoa-muted sm:mt-2">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <p className="font-display text-xl font-black sm:text-2xl">
            {formatPrice(product.price)}
            {product.size && <span className="block font-sans text-xs font-semibold text-cocoa-muted">{product.size}</span>}
          </p>
          <div
            className={`flex items-center rounded-full border-2 border-cocoa shadow-hard ${inBox ? 'bg-white' : 'bg-gold'}`}
          >
            {inBox && (
              <>
                <button
                  type="button"
                  onClick={decrease}
                  aria-label={`Remove one ${product.name}`}
                  className="grid size-11 place-items-center rounded-full text-xl font-bold hover:bg-gold"
                >
                  −
                </button>
                <span aria-live="polite" className="min-w-6 text-center font-bold tabular-nums">
                  {qty}
                </span>
              </>
            )}
            <button
              ref={addRef}
              type="button"
              onClick={() => onChange(qty + 1)}
              aria-label={inBox ? `Add one more ${product.name}` : `Add ${product.name} to your box`}
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
