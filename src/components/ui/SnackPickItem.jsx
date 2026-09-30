import ProductPhoto from './ProductPhoto'

export default function SnackPickItem({ product, picked, full, onToggle }) {
  const locked = full && !picked

  return (
    <button
      type="button"
      aria-label={locked ? `${product.name} (box is full)` : product.name}
      aria-pressed={picked}
      aria-disabled={locked}
      onClick={() => !locked && onToggle(product.name)}
      className={`group flex h-full w-full flex-col border-2 border-cocoa p-2 text-left shadow-hard transition-colors ${picked ? 'bg-gold-soft' : 'bg-white'} ${locked ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span className="relative block">
        <ProductPhoto
          product={product}
          sizes="(min-width: 1024px) 200px, 45vw"
          note={false}
          className="aspect-square w-full border-2 border-cocoa"
        />
        {picked && (
          <span className="absolute top-2 right-2 rounded-full border-2 border-cocoa bg-gold px-2.5 py-0.5 text-xs font-bold uppercase shadow-hard">
            ✓ In box
          </span>
        )}
      </span>
      <span className="mt-3 block px-1 text-lg leading-tight font-black uppercase font-display">{product.name}</span>
      <span className="mt-auto flex items-center justify-between gap-2 px-1 pt-3 pb-1">
        <span className="tag">{product.category}</span>
        <span
          aria-hidden="true"
          className={`grid size-9 shrink-0 place-items-center rounded-full border-2 border-cocoa font-bold transition-colors ${picked ? 'bg-white' : 'bg-gold'} ${locked ? '' : 'group-hover:bg-cocoa group-hover:text-cream'}`}
        >
          {picked ? '−' : '+'}
        </span>
      </span>
    </button>
  )
}
