import { menuHref } from '../../data/site'
import Button from '../ui/Button'
import HandNote from '../ui/HandNote'
import MenuPage from '../ui/MenuPage'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function MenuCover() {
  return (
    <section id="menu-cover" aria-labelledby="menu-cover-title" className="shell py-20 md:py-32">
      <div className="grid gap-16 md:grid-cols-12 md:items-center md:gap-8">
        <Reveal className="md:col-span-6">
          <SectionHeading id="menu-cover-title" eyebrow="The menu" title="Every treat, every price." />
          <p className="mt-6 max-w-md text-lg leading-relaxed">
            All our cakes, breads and snacks in one little book. Flip through, then share it with your group chat.
          </p>
          <Button href={menuHref} className="mt-10">
            Open the menu →
          </Button>
        </Reveal>

        <Reveal delay={100} className="relative mx-auto w-full max-w-xs md:col-span-5 md:col-start-8 md:max-w-sm">
          <HandNote flip className="absolute -top-14 right-0 hidden lg:flex">
            peek inside ✦
          </HandNote>
          <a
            href={menuHref}
            aria-label="Open the ZieSweets menu book"
            className="group relative block aspect-[3/4] -rotate-3 [perspective:1500px]"
          >
            <span aria-hidden="true" className="absolute inset-0 translate-3 border-2 border-cocoa bg-white" />
            <span aria-hidden="true" className="absolute inset-0 translate-1.5 border-2 border-cocoa bg-cream" />
            <span className="absolute inset-0 origin-left shadow-hard-lg transition-transform duration-500 motion-safe:group-hover:[transform:rotateY(-22deg)]">
              <MenuPage page="cover" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
