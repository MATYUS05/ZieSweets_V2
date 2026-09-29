import { orderHref, photos } from '../../data/site'
import Button from '../ui/Button'
import HandNote from '../ui/HandNote'
import PhotoCard from '../ui/PhotoCard'
import Pill from '../ui/Pill'
import SinceBadge from '../ui/SinceBadge'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="shell grid gap-16 pt-10 pb-20 md:grid-cols-12 md:items-center md:gap-8 md:pt-16 md:pb-28"
    >
      <div className="md:col-span-7">
        <Pill>✦ Bakery since 2016</Pill>
        <h1
          id="hero-title"
          className="mt-8 text-[3.6rem] leading-[0.88] font-black tracking-tight uppercase sm:text-8xl lg:text-[7.25rem]"
        >
          Sweet moments,
          <span className="mt-3 block text-[0.62em] leading-none font-semibold normal-case italic">
            made with <span className="highlight">love.</span>
          </span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed">
          Cakes and breads baked with quality ingredients and a whole lot of care — for your big days and your every
          days.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="#products">See the goodies →</Button>
          <Button href={orderHref} variant="light">
            Order now
          </Button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md md:col-span-5 md:max-w-none">
        <PhotoCard
          src={photos.soes}
          alt="A kraft box of ZieSweets soes beside a plate of soes cut open to show the rum fla filling"
          tilt={3}
          width="1067"
          height="1600"
          fetchPriority="high"
          imgClassName="aspect-[4/5] object-[50%_60%]"
        />
        <PhotoCard
          src={photos.fruitPieSmall}
          alt="Fruit pies topped with strawberry, orange and kiwi"
          tilt={-8}
          className="absolute -bottom-10 -left-4 w-32 sm:w-40 md:-left-12"
          imgClassName="aspect-square object-[50%_80%]"
        />
        <SinceBadge className="absolute -top-10 -right-3 size-28 md:-right-8 md:size-36" />
        <HandNote className="absolute -top-14 left-0 hidden lg:flex">freshly baked everyday!</HandNote>
      </div>
    </section>
  )
}
