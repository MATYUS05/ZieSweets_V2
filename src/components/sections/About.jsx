import { values } from '../../data/site'
import Pill from '../ui/Pill'
import Reveal from '../ui/Reveal'

const chipStyles = [
  'bg-gold -rotate-3',
  'bg-white rotate-2',
  'bg-cocoa text-cream -rotate-1',
  'bg-white rotate-3',
  'bg-gold -rotate-2',
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-20 md:py-32">
      <Reveal>
        <Pill>✦ About us</Pill>
        <h2
          id="about-title"
          className="mt-8 text-4xl leading-[1.1] font-bold tracking-tight md:text-7xl md:leading-[1.05]"
        >
          Since 2016, we’ve been baking <span className="highlight">soft</span> cakes and sweet breads with quality
          ingredients and a touch of <em className="font-semibold">love.</em>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
        <Reveal delay={100} className="md:col-span-5">
          <p className="text-lg leading-relaxed">
            With sweet flavours and soft textures, every creation is made to keep you company — on your special days and
            in your everyday.
          </p>
        </Reveal>
        <Reveal delay={200} as="ul" className="flex flex-wrap gap-3 md:col-span-6 md:col-start-7 md:justify-end">
          {values.map((value, i) => (
            <li
              key={value}
              className={`rounded-full border-2 border-cocoa px-5 py-2.5 font-bold shadow-hard ${chipStyles[i % chipStyles.length]}`}
            >
              {value}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
