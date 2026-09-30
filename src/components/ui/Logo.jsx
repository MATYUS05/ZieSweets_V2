import logoMark from '../../assets/img/logo-mark.webp'

export default function Logo({ className = '' }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="ZieSweets home">
      <img src={logoMark} alt="" width="44" height="44" className="size-11 rounded-full border-2 border-cocoa" />
      <span className="font-display text-2xl leading-none font-black whitespace-nowrap">Zie Sweets</span>
    </a>
  )
}
