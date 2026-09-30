import { eventOrderHref, eventPhoto, snackBoxHref, whatsappLink } from '../../data/site'
import { leadTimeDays } from '../../lib/order'
import Button from '../ui/Button'
import PhotoCard from '../ui/PhotoCard'
import Pill from '../ui/Pill'
import Reveal from '../ui/Reveal'

const steps = [
  'Build a snack box with 2 to 5 different treats, or order any treat by the piece.',
  'Tell us the date, headcount and whether it’s pickup or delivery.',
  `We’ll confirm everything on WhatsApp. Order at least ${leadTimeDays} days ahead, with a 50% deposit.`,
]

export default function Events() {
  return (
    <section
      id="events"
      aria-labelledby="events-title"
      className="bg-cocoa py-20 text-cream md:py-32 [&_:focus-visible]:outline-gold"
    >
      <div className="shell grid gap-16 md:grid-cols-12 md:items-center">
        <Reveal className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-none">
          <PhotoCard
            src={eventPhoto.src}
            srcSet={eventPhoto.srcSet}
            sizes="(min-width: 768px) 40vw, 384px"
            alt={eventPhoto.alt}
            tilt={-3}
            loading="lazy"
            imgClassName="aspect-[4/5] object-[50%_40%]"
            caption="boxed up for a big day ✦"
            className="text-cocoa"
          />
        </Reveal>

        <Reveal delay={100} className="md:col-span-6 md:col-start-7">
          <Pill className="bg-gold text-cocoa">✦ For your events</Pill>
          <h2
            id="events-title"
            className="mt-8 text-5xl leading-[0.95] font-black tracking-tight uppercase md:text-7xl"
          >
            Feeding a <span className="font-semibold normal-case italic">crowd?</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/80">
            Arisan, birthdays, office meetings, family gatherings — snack boxes filled with your favourites, as many as
            you need.
          </p>

          <ol className="mt-10 grid gap-5">
            {steps.map((step, i) => (
              <li key={step} className="flex items-baseline gap-4 border-t-2 border-cream/20 pt-5">
                <span className="font-display text-3xl font-black text-gold">0{i + 1}</span>
                <span className="text-lg">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={snackBoxHref} variant="gold">
              Build a snack box →
            </Button>
            <Button href={eventOrderHref} variant="light">
              Order by the piece
            </Button>
          </div>
          <a
            href={whatsappLink('Hi ZieSweets, I would like to ask about an order for an event.')}
            className="mt-6 inline-block font-semibold underline underline-offset-4 hover:text-gold"
          >
            Rather chat first? WhatsApp us
          </a>
        </Reveal>
      </div>
    </section>
  )
}
