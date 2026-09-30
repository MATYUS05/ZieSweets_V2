import ProductPhoto from './ProductPhoto'

const layouts = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2',
  5: 'grid-cols-6 *:nth-[-n+3]:col-span-2 *:nth-[n+4]:col-span-3',
}

export default function BoxSlots({ ref, size, items = [], onRemove, mini = false, className = '' }) {
  const slots = Array.from({ length: size }, (_, i) => items[i])

  return (
    <div
      ref={ref}
      className={`grid border-2 border-cocoa bg-gold-soft ${mini ? 'gap-0.5 p-0.5' : 'gap-1.5 p-1.5 shadow-hard'} ${layouts[size]} ${className}`}
    >
      {slots.map((product, i) =>
        mini ? (
          <span key={i} className="h-3 border border-dashed border-cocoa/50 bg-cream" />
        ) : product ? (
          <button
            key={product.name}
            type="button"
            onClick={() => onRemove(product.name)}
            aria-label={`Take ${product.name} out of the box`}
            className="group relative aspect-[4/3] animate-drop overflow-hidden border-2 border-cocoa bg-white"
          >
            <ProductPhoto product={product} sizes="160px" note={false} logoClassName="size-8" className="size-full" />
            <span className="absolute inset-x-0 bottom-0 truncate border-t-2 border-cocoa bg-white px-1.5 py-0.5 text-left text-[0.7rem] font-bold uppercase">
              {product.name}
            </span>
            <span
              aria-hidden="true"
              className="absolute top-1 right-1 grid size-6 place-items-center rounded-full border-2 border-cocoa bg-white text-xs font-bold transition-colors group-hover:bg-gold"
            >
              ✕
            </span>
          </button>
        ) : (
          <span
            key={i}
            className="grid aspect-[4/3] place-items-center border-2 border-dashed border-cocoa/40 bg-cream font-display text-2xl text-cocoa/40"
          >
            {i + 1}
          </span>
        ),
      )}
    </div>
  )
}
