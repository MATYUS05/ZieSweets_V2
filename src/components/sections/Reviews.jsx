import { reviews, stats } from '../../data/site'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const statStyles = ['bg-gold', 'bg-white', 'bg-cocoa text-cream']
const tilts = [-2, 1.5, -1]

export default function Reviews() {
  const shownStats = stats.filter((stat) => stat.value)

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="shell py-20 md:py-32">
      <SectionHeading id="reviews-title" eyebrow="Sweet stats" title="The numbers taste good too." />

      <ul className="mt-14 grid gap-8 sm:auto-cols-fr sm:grid-flow-col md:mt-16 md:gap-10">
        {shownStats.map((stat, i) => (
          <Reveal as="li" key={stat.label} delay={i * 100}>
            <div
              style={{ '--tilt': `${tilts[i % tilts.length]}deg` }}
              className={`rotate-(--tilt) border-2 border-cocoa p-8 shadow-hard-lg ${statStyles[i % statStyles.length]}`}
            >
              <p className="font-display text-7xl leading-none font-black md:text-8xl">{stat.value}</p>
              <p className="mt-3 text-sm font-bold tracking-[0.15em] uppercase">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      {reviews.length > 0 && (
        <ul className="mt-20 grid gap-8 md:grid-cols-3 md:gap-10">
          {reviews.map((review, i) => (
            <Reveal as="li" key={review.name} delay={i * 100}>
              <figure
                style={{ '--tilt': `${tilts[(i + 1) % tilts.length]}deg` }}
                className="flex h-full rotate-(--tilt) flex-col border-2 border-cocoa bg-white p-6 shadow-hard-lg transition-[rotate] duration-300 hover:rotate-0"
              >
                <span aria-hidden="true" className="font-display text-6xl leading-none font-black text-gold">
                  “
                </span>
                <blockquote className="mt-2 flex-1 text-lg leading-relaxed">{review.quote}</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t-2 border-cocoa pt-4">
                  <span className="font-bold">{review.name}</span>
                  {review.product && (
                    <span className="rounded-full border-2 border-cocoa px-2.5 py-0.5 text-[0.65rem] font-bold tracking-widest uppercase">
                      {review.product}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  )
}
