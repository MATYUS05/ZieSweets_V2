import { contact, photos } from '../../data/site'
import Button from '../ui/Button'
import PhotoCard from '../ui/PhotoCard'
import Pill from '../ui/Pill'
import Reveal from '../ui/Reveal'

export default function ClosingCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-gold py-20 md:py-32">
      <div className="shell grid gap-16 md:grid-cols-12 md:items-center">
        <Reveal className="order-2 mx-auto w-full max-w-sm md:order-1 md:col-span-5 md:max-w-none">
          <PhotoCard
            src={photos.booth}
            alt="The ZieSweets stall at a bazaar, its table filled with boxed pastries and breads"
            tilt={-4}
            loading="lazy"
            imgClassName="aspect-[4/5] object-top"
            caption="spotted at the bazaar ✦"
          />
        </Reveal>

        <Reveal delay={100} className="order-1 md:order-2 md:col-span-7">
          <Pill>● Now taking orders</Pill>
          <h2
            id="contact-title"
            className="mt-8 text-6xl leading-[0.88] font-black tracking-tight uppercase md:text-8xl"
          >
            Make today a little <span className="font-semibold normal-case italic">sweeter.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed">
            Slide into our DMs or drop us a WhatsApp to order your cakes and breads.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={contact.whatsappUrl} external>
              WhatsApp {contact.whatsappDisplay}
            </Button>
            <Button href={contact.instagramUrl} variant="light" external>
              Instagram {contact.instagramHandle}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
