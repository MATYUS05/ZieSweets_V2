import logoMark from '../../assets/img/logo-mark.webp'
import { orderHref, snackBoxHref, snackBoxSizes } from '../../data/site'
import { formatPrice, leadTimeDays } from '../../lib/order'
import Button from './Button'
import HandNote from './HandNote'

const leader = (
  <span aria-hidden="true" className="min-w-4 flex-1 -translate-y-1 border-b-2 border-dotted border-cocoa/40" />
)
const eyebrow = 'text-xs font-bold tracking-[0.2em] uppercase'
const title = 'mt-2 font-display leading-[0.9] font-black uppercase'

function Cover() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 border-2 border-cocoa bg-gold p-8 text-center text-cocoa">
      <img src={logoMark} alt="" className="size-24 -rotate-6 rounded-full border-2 border-cocoa shadow-hard-lg" />
      <p className="font-display text-6xl leading-[0.85] font-black uppercase">
        The
        <br />
        menu
      </p>
      <p className={eyebrow}>Zie Sweets · since 2016</p>
    </div>
  )
}

function Intro({ contents, onJump }) {
  return (
    <>
      <p className={eyebrow}>Zie Sweets · since 2016</p>
      <h2 className={`${title} text-5xl`}>The menu</h2>
      <p className="mt-2 font-display text-lg italic">freshly baked everyday ✦</p>
      <ol className="mt-5 border-t-2 border-dashed border-cocoa/30 pt-2">
        {contents.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={() => onJump(item.page)}
              className="flex w-full items-baseline gap-2 py-1 text-left font-semibold hover:text-cocoa-muted"
            >
              {item.label}
              {leader}
              <span className="tabular-nums">{item.page + 1}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-auto pt-4 text-xs text-cocoa-muted">
        All prices in Rupiah. Most treats are ordered in a minimum of 3 pieces.
      </p>
    </>
  )
}

function Section({ section, continued }) {
  const photo = !continued && section.photo

  return (
    <>
      <header className={`relative ${photo ? 'min-h-24 pr-24 @sm:min-h-28 @sm:pr-28' : ''}`}>
        <p className={eyebrow}>{continued ? 'Continued' : 'On the menu'}</p>
        <h2 className={`${title} ${continued ? 'text-3xl @sm:text-4xl' : 'text-3xl @xs:text-4xl @sm:text-5xl'}`}>
          {section.title}
        </h2>
        {photo && (
          <img
            src={photo.image}
            srcSet={photo.srcSet}
            sizes="96px"
            alt={photo.alt}
            loading="lazy"
            style={{ objectPosition: photo.imagePosition }}
            className="absolute -top-1 right-0 aspect-square w-20 rotate-6 border-2 border-cocoa bg-white object-cover p-1 shadow-hard @sm:w-24"
          />
        )}
      </header>
      <ul data-menu-list className="mt-6">
        {section.items.map((item) => (
          <li key={item.name} className="mb-5 last:mb-0">
            <div className="flex items-baseline gap-2">
              <h3 className="font-display text-lg leading-tight font-black uppercase">{item.name}</h3>
              {item.rows.length === 1 && (
                <>
                  {leader}
                  <span className="font-bold tabular-nums">{formatPrice(item.rows[0].price)}</span>
                </>
              )}
            </div>
            {item.rows.length > 1 &&
              item.rows.map((row) => (
                <div key={row.label} className="flex items-baseline gap-2 pl-4 text-sm">
                  {row.label}
                  {leader}
                  <span className="font-bold tabular-nums">{formatPrice(row.price)}</span>
                </div>
              ))}
            <p className="mt-0.5 text-sm text-cocoa-muted">
              <span className="italic">{item.description}</span>
              {item.note && <span className="tag ml-2 inline-block text-cocoa">{item.note}</span>}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

function SnackBox() {
  return (
    <>
      <p className={eyebrow}>For your events</p>
      <h2 className={`${title} text-5xl`}>Snack box</h2>
      <p className="mt-4 text-cocoa-muted">
        Pick {snackBoxSizes[0]} to {snackBoxSizes.at(-1)} different treats from this menu for every box.
      </p>
      <ul className="mt-6 grid gap-3">
        {snackBoxSizes.map((size) => (
          <li key={size} className="flex items-baseline gap-2">
            <span className="font-display text-lg font-black uppercase">Box of {size}</span>
            {leader}
            <span className="font-bold">price on request</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-cocoa-muted">Order at least {leadTimeDays} days ahead, with a 50% deposit.</p>
      <Button href={snackBoxHref} className="mt-auto">
        Build a snack box →
      </Button>
    </>
  )
}

function Outro({ onShare }) {
  return (
    <>
      <p className={eyebrow}>That’s the whole book</p>
      <h2 className={`${title} text-5xl`}>Ready to order?</h2>
      <p className="mt-4 text-cocoa-muted">Fill your box online and we’ll confirm everything on WhatsApp.</p>
      <div className="mt-8 grid gap-3">
        <Button href={orderHref}>Order now →</Button>
        <Button type="button" variant="gold" onClick={onShare}>
          Share this menu
        </Button>
      </div>
      <HandNote className="mt-auto pt-6">see you soon ✦</HandNote>
    </>
  )
}

export default function MenuPage({ page, number, side = 'right', contents, onJump, onShare }) {
  if (page === 'cover') return <Cover />
  if (page === 'empty') return <div />

  return (
    <article
      className={`@container relative flex h-full flex-col overflow-hidden border-2 border-cocoa p-6 text-cocoa md:p-8 [&_:focus-visible]:outline-cocoa ${side === 'left' ? 'page-left' : 'page-right'}`}
    >
      <div className="flex flex-1 flex-col">
        {page?.kind === 'intro' && <Intro contents={contents} onJump={onJump} />}
        {page?.kind === 'section' && <Section section={page.section} continued={page.continued} />}
        {page?.kind === 'snack' && <SnackBox />}
        {page?.kind === 'outro' && <Outro onShare={onShare} />}
      </div>
      {page && (
        <p data-page-number aria-hidden="true" className="mt-6 text-center font-display text-sm italic">
          — {number} —
        </p>
      )}
    </article>
  )
}
