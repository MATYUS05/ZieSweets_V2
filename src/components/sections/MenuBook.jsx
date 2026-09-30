import { useLayoutEffect, useRef, useState } from 'react'
import { menuHref, products, snackBoxSizes } from '../../data/site'
import { menuSections, menuText } from '../../lib/menu'
import useHashDialog from '../../lib/useHashDialog'
import useMediaQuery from '../../lib/useMediaQuery'
import Logo from '../ui/Logo'
import MenuPage from '../ui/MenuPage'

const wideQuery = '(min-width: 1024px)'
const sections = menuSections(products)
const wholeSections = sections.map((section) => [section.items])
const measurePages = [
  ...sections.map((section) => ({ kind: 'section', section })),
  { kind: 'section', section: sections[0], continued: true },
]
const routes = { [menuHref]: true }
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const shape = (chunks) => chunks.map((section) => section.map((items) => items.length).join()).join('|')
const tabTones = ['bg-cream', 'bg-gold-soft', 'bg-white']
const tabLabels = { Contents: 'Index', 'Snack box': 'Snack' }
const roundButton =
  'grid size-12 shrink-0 place-items-center rounded-full border-2 border-cream bg-gold text-xl font-bold text-cocoa transition-opacity disabled:opacity-30'

function buildPages(chunks) {
  return [
    { kind: 'intro', label: 'Contents' },
    ...sections.flatMap((section, s) =>
      chunks[s].map((items, i) => ({
        kind: 'section',
        label: section.title,
        section: { ...section, items },
        continued: i > 0,
      })),
    ),
    { kind: 'snack', label: 'Snack box' },
    { kind: 'outro', label: 'Order' },
  ]
}

function paginate(root) {
  const articles = [...root.querySelectorAll('article')]
  const px = (element, property) => parseFloat(getComputedStyle(element)[property])
  const listTop = (article) => article.querySelector('[data-menu-list]').offsetTop - px(article, 'paddingTop')
  const continuedTop = listTop(articles.at(-1))

  return sections.map((section, s) => {
    const article = articles[s]
    const pageNumber = article.querySelector('[data-page-number]')
    const room =
      article.clientHeight -
      px(article, 'paddingTop') -
      px(article, 'paddingBottom') -
      pageNumber.offsetHeight -
      px(pageNumber, 'marginTop')
    const chunks = [[]]
    let used = listTop(article)
    ;[...article.querySelectorAll('[data-menu-list] > li')].forEach((li, i) => {
      if (chunks.at(-1).length && used + li.offsetHeight > room) {
        chunks.push([])
        used = continuedTop
      }
      chunks.at(-1).push(section.items[i])
      used += li.offsetHeight + px(li, 'marginBottom')
    })
    return chunks
  })
}

export default function MenuBook() {
  const dialogRef = useRef(null)
  const measureRef = useRef(null)
  const swipeRef = useRef(null)
  const [chunks, setChunks] = useState(wholeSections)
  const [page, setPage] = useState(0)
  const [turn, setTurn] = useState(null)
  const wide = useMediaQuery(wideQuery)
  const pages = buildPages(chunks)
  const current = Math.min(page, pages.length - 1)
  const step = wide ? 2 : 1
  const start = wide ? current - (current % 2) : current
  const contents = pages.flatMap((item, i) =>
    i > 0 && pages[i - 1].label !== item.label ? [{ label: item.label, page: i }] : [],
  )
  const chapters = [{ label: pages[0].label, page: 0 }, ...contents]

  useLayoutEffect(() => {
    const root = measureRef.current
    const update = () => {
      if (!root.clientHeight) return
      const next = paginate(root)
      setChunks((previous) => (shape(previous) === shape(next) ? previous : next))
    }
    update()
    document.fonts.ready.then(update)
    const observer = new ResizeObserver(update)
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const open = () => {
    setPage(0)
    if (reducedMotion()) return setTurn(null)
    setTurn(
      matchMedia(wideQuery).matches
        ? { dir: 'next', under: ['empty', 1], front: 'cover', back: 0 }
        : { dir: 'next', under: [0], front: 'cover', back: null },
    )
  }

  const clearHash = useHashDialog(dialogRef, routes, open)

  const go = (target) => {
    if (turn) return
    const isWide = matchMedia(wideQuery).matches
    const from = isWide ? current - (current % 2) : current
    const clamped = Math.min(Math.max(target, 0), pages.length - 1)
    const to = isWide ? clamped - (clamped % 2) : clamped
    if (to === from) return
    setPage(to)
    if (reducedMotion()) return
    const next = to > from
    if (isWide) {
      setTurn(
        next
          ? { dir: 'next', under: [from, to + 1], front: from + 1, back: to }
          : { dir: 'prev', under: [to, from + 1], front: from, back: to + 1 },
      )
    } else {
      setTurn(
        next
          ? { dir: 'next', under: [to], front: from, back: null }
          : { dir: 'prev', under: [from], front: to, back: null },
      )
    }
  }

  const share = async () => {
    const text = menuText(sections, snackBoxSizes, `${location.origin}${location.pathname}${menuHref}`)
    if (!navigator.share) return window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    try {
      await navigator.share({ title: 'ZieSweets menu', text })
    } catch {
      return
    }
  }

  const renderPage = (index, side) => (
    <MenuPage
      page={typeof index === 'number' ? pages[index] : index}
      number={typeof index === 'number' ? index + 1 : null}
      side={side}
      contents={contents}
      onJump={go}
      onShare={share}
    />
  )

  const visible = turn ? turn.under : wide ? [start, start + 1] : [start]
  const inView = pages.slice(start, start + step).map((item) => item.label)
  const last = Math.min(start + step, pages.length)
  const arrow = (dir, className) => (
    <button
      type="button"
      onClick={() => go(dir === 'prev' ? start - step : start + step)}
      disabled={dir === 'prev' ? start === 0 : start + step >= pages.length}
      aria-label={dir === 'prev' ? 'Previous page' : 'Next page'}
      className={`${roundButton} ${className}`}
    >
      {dir === 'prev' ? '←' : '→'}
    </button>
  )
  const prevTurn = turn?.dir === 'prev'
  const leafClass = wide
    ? prevTurn
      ? 'left-0 w-1/2 origin-right animate-flip-prev'
      : 'right-0 w-1/2 origin-left animate-flip-next'
    : `inset-x-0 origin-left animate-page-away ${prevTurn ? '[animation-direction:reverse]' : ''}`

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="menu-book-title"
      onClose={clearHash}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(start + step)
        if (event.key === 'ArrowLeft') go(start - step)
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-cocoa p-0 text-cream [&_:focus-visible]:outline-gold"
    >
      <div className="shell flex h-18 items-center justify-between gap-6">
        <Logo />
        <h2 id="menu-book-title" className="sr-only">
          ZieSweets menu
        </h2>
        <button
          type="button"
          onClick={() => dialogRef.current.close()}
          aria-label="Close menu"
          className="flex size-12 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-cream bg-gold"
        >
          <span className="h-0.5 w-5 translate-y-1 rotate-45 bg-cocoa" />
          <span className="h-0.5 w-5 -translate-y-1 -rotate-45 bg-cocoa" />
        </button>
      </div>

      <div className="shell pt-4 pb-10">
        <div className={`relative mx-auto ${wide ? 'max-w-6xl pr-28 pl-16' : 'max-w-md pr-10'}`}>
          {arrow('prev', 'absolute top-1/2 left-0 -translate-y-1/2 max-lg:hidden')}
          <div
            onPointerDown={(event) => (swipeRef.current = event.clientX)}
            onPointerUp={(event) => {
              const distance = event.clientX - swipeRef.current
              if (Math.abs(distance) > 50) go(distance < 0 ? start + step : start - step)
            }}
            className={`relative grid h-[clamp(34rem,calc(100dvh-11rem),46rem)] touch-pan-y [perspective:2500px] ${wide ? 'grid-cols-2' : 'grid-cols-1'} ${turn?.under.includes('empty') ? '' : 'shadow-[10px_10px_0_0_var(--color-gold)]'}`}
          >
            <div
              ref={measureRef}
              aria-hidden="true"
              inert
              className={`pointer-events-none invisible absolute inset-y-0 left-0 ${wide ? 'w-1/2' : 'w-full'}`}
            >
              {measurePages.map((item, i) => (
                <div key={i} className="absolute inset-0">
                  <MenuPage page={item} number={0} />
                </div>
              ))}
            </div>
            {visible.map((index, i) => (
              <div key={i} className="min-h-0">
                {renderPage(index, wide && i === 0 ? 'left' : 'right')}
              </div>
            ))}
            {turn && (
              <div
                onAnimationEnd={(event) => event.target === event.currentTarget && setTurn(null)}
                className={`absolute inset-y-0 [transform-style:preserve-3d] ${leafClass}`}
              >
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  {renderPage(turn.front, wide && prevTurn ? 'left' : 'right')}
                </div>
                <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  {renderPage(turn.back, wide && prevTurn ? 'right' : 'left')}
                </div>
              </div>
            )}

            <nav aria-label="Menu chapters" className="absolute top-3 bottom-3 left-full flex flex-col gap-1">
              {chapters.map((chapter, i) => {
                const active = inView.includes(chapter.label)
                return (
                  <button
                    key={chapter.label}
                    aria-label={chapter.label}
                    type="button"
                    onClick={() => go(chapter.page)}
                    aria-current={active ? 'page' : undefined}
                    className={`min-h-0 flex-1 overflow-hidden rounded-r-xl border-2 border-l-0 border-cocoa px-1.5 text-[0.62rem] font-bold tracking-wide whitespace-nowrap text-cocoa uppercase transition-[width,background-color] [writing-mode:vertical-rl] ${active ? 'w-10 bg-gold' : `w-8 hover:w-10 ${tabTones[i % tabTones.length]}`}`}
                  >
                    {tabLabels[chapter.label] ?? chapter.label}
                  </button>
                )
              })}
            </nav>
          </div>
          {arrow('next', 'absolute top-1/2 right-0 -translate-y-1/2 max-lg:hidden')}
        </div>

        <div className="mx-auto mt-6 flex max-w-md items-center justify-between gap-4 lg:justify-center">
          {arrow('prev', 'lg:hidden')}
          <p aria-live="polite" className="text-center text-sm font-bold tracking-[0.15em] uppercase">
            {[...new Set(inView)].join(' · ')}
            <span className="font-normal text-cream/70">
              {' '}
              — {start + 1}
              {last > start + 1 && `–${last}`} / {pages.length}
            </span>
          </p>
          {arrow('next', 'lg:hidden')}
        </div>
      </div>
    </dialog>
  )
}
