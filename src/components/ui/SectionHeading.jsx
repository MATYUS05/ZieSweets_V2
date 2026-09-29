import Pill from './Pill'

export default function SectionHeading({ eyebrow, title, id, className = '' }) {
  return (
    <div className={className}>
      <Pill>✦ {eyebrow}</Pill>
      <h2 id={id} className="mt-6 text-5xl leading-[0.95] font-black tracking-tight text-balance uppercase md:text-7xl">
        {title}
      </h2>
    </div>
  )
}
