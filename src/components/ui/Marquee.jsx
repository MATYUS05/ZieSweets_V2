export default function Marquee({ items }) {
  const row = items.flatMap((item) => [item, '✦'])

  return (
    <div aria-hidden="true" className="overflow-hidden border-y-2 border-cocoa bg-gold py-4">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...row, ...row].map((item, i) => (
          <span key={i} className="font-display px-4 text-2xl font-black whitespace-nowrap uppercase md:text-4xl">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
