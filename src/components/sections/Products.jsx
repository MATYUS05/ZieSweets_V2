import { contact, products } from '../../data/site'
import Button from '../ui/Button'
import HandNote from '../ui/HandNote'
import ProductItem from '../ui/ProductItem'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const tilts = [-1.5, 2, -2, 1.5, -1]

export default function Products() {
  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="border-y-2 border-cocoa bg-gold-soft py-20 md:py-32"
    >
      <div className="shell flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="products-title" eyebrow="The goodies" title="Pick your favourite." />
        <HandNote flip className="hidden md:flex">
          all baked fresh ✦
        </HandNote>
      </div>

      <ul className="shell mt-14 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto py-6 md:mt-16 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible">
        {products.map((product, i) => (
          <li
            key={product.name}
            className={`w-[78%] shrink-0 snap-start md:w-auto ${product.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
          >
            <Reveal delay={i * 80} className="h-full">
              <ProductItem product={product} tilt={tilts[i % tilts.length]} />
            </Reveal>
          </li>
        ))}
        <li className="w-[78%] shrink-0 snap-start md:w-auto">
          <Reveal delay={products.length * 80} className="h-full">
            <div className="flex h-full min-h-72 rotate-1 flex-col justify-between gap-6 border-2 border-cocoa bg-cocoa p-6 text-cream shadow-hard-lg">
              <p className="font-display text-4xl leading-none font-black uppercase">Can’t pick just one?</p>
              <div>
                <p className="mb-5 text-cream/80">Mix and match your favourites — just tell us what you’re craving.</p>
                <Button href={contact.whatsappUrl} variant="gold" external>
                  Chat to order →
                </Button>
              </div>
            </div>
          </Reveal>
        </li>
      </ul>
    </section>
  )
}
