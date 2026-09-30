import { useId } from 'react'
import logoMark from '../../assets/img/logo-mark.webp'

export default function SinceBadge({ className = 'relative' }) {
  const pathId = useId()

  return (
    <div aria-hidden="true" className={`group ${className}`}>
      <svg viewBox="0 0 120 120" className="size-full animate-spin-slow group-hover:[animation-play-state:paused]">
        <defs>
          <path id={pathId} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <circle cx="60" cy="60" r="58" className="fill-gold stroke-cocoa" strokeWidth="2.5" />
        <text className="fill-cocoa text-[10.5px] font-bold tracking-[0.2em]">
          <textPath href={`#${pathId}`}>SINCE 2016 ✦ FRESHLY BAKED ✦</textPath>
        </text>
      </svg>
      <img src={logoMark} alt="" className="absolute inset-[27%] size-[46%] rounded-full border-2 border-cocoa" />
    </div>
  )
}
