const variants = {
  primary: 'bg-cocoa text-cream',
  gold: 'bg-gold text-cocoa',
  light: 'bg-white text-cocoa',
}

export default function Button({ href, variant = 'primary', external = false, className = '', children }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-cocoa px-6 font-bold shadow-hard transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-cocoa)] active:translate-x-1 active:translate-y-1 active:shadow-none ${variants[variant]} ${className}`}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  )
}
