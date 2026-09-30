import logoMark from '../../assets/img/logo-mark.webp'

export default function ProductPhoto({
  ref,
  product,
  sizes,
  note = true,
  className = '',
  logoClassName = 'size-10 sm:size-14',
}) {
  if (product.image) {
    return (
      <img
        ref={ref}
        src={product.image}
        srcSet={product.srcSet}
        sizes={sizes}
        alt={product.alt}
        loading="lazy"
        style={{ objectPosition: product.imagePosition }}
        className={`object-cover ${className}`}
      />
    )
  }

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(-45deg,var(--color-cream)_0_12px,var(--color-gold-soft)_12px_24px)] ${className}`}
    >
      <img src={logoMark} alt="" loading="lazy" className={`rounded-full border-2 border-cocoa ${logoClassName}`} />
      {note && <span className="font-display text-sm italic max-sm:hidden">photo coming soon</span>}
    </div>
  )
}
