export default function ProductItem({ product, tilt = 0 }) {
  return (
    <article
      style={{ '--tilt': `${tilt}deg` }}
      className="relative flex h-full rotate-(--tilt) flex-col border-2 border-cocoa bg-white p-3 shadow-hard-lg transition-[rotate,translate] duration-300 hover:-translate-y-1 hover:rotate-0"
    >
      {product.featured && (
        <span className="absolute -top-4 -right-3 z-10 rotate-12 rounded-full border-2 border-cocoa bg-gold px-3 py-1 text-xs font-bold tracking-widest uppercase shadow-hard">
          Signature
        </span>
      )}
      <div className="relative flex-1 overflow-hidden border-2 border-cocoa">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          style={{ objectPosition: product.imagePosition }}
          className={`size-full object-cover ${product.featured ? 'aspect-square md:absolute md:inset-0 md:aspect-auto' : 'aspect-square'}`}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className={`font-black uppercase ${product.featured ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>
          {product.name}
        </h3>
        <span className="tag">
          {product.category}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-cocoa-muted">{product.description}</p>
    </article>
  )
}
