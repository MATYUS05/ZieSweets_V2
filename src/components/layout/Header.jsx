import { useEffect, useState } from 'react'
import { contact, menuHref, navLinks, orderHref } from '../../data/site'
import Button from '../ui/Button'
import Logo from '../ui/Logo'

const bookIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="size-5 fill-none stroke-current"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5Z" />
    <path d="M12 6v14" />
  </svg>
)

function CountBadge({ count, className }) {
  if (count === 0) return null
  return (
    <span
      key={count}
      className={`grid h-6 min-w-6 animate-bump place-items-center rounded-full px-1.5 text-xs font-bold tabular-nums ${className}`}
    >
      {count}
      <span className="sr-only"> items in your box</span>
    </span>
  )
}

export default function Header({ orderCount = 0 }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-cocoa bg-cream">
        <div className="shell flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-1 font-semibold">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="rounded-full px-4 py-2 transition-colors hover:bg-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button href={menuHref} variant="light" className="max-lg:hidden">
              {bookIcon}
              The menu
            </Button>
            <Button href={orderHref} variant="gold">
              Order now
              <CountBadge count={orderCount} className="bg-cocoa text-cream" />
            </Button>
          </div>

          <button
            type="button"
            className="relative flex size-12 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-cocoa bg-gold shadow-hard md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <span className={`h-0.5 w-5 bg-cocoa transition-transform ${open ? 'translate-y-1 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-cocoa transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`} />
            {!open && <CountBadge count={orderCount} className="absolute -top-2 -right-2 bg-cocoa text-cream" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-30 flex h-dvh flex-col bg-gold px-5 pt-24 pb-10 transition-opacity duration-300 md:hidden ${open ? 'opacity-100' : 'pointer-events-none invisible opacity-0'}`}
      >
        <nav aria-label="Mobile">
          <ul>
            {navLinks.map((link, i) => (
              <li key={link.href} className="border-b-2 border-cocoa">
                <a
                  href={link.href}
                  onClick={close}
                  className="font-display flex items-center justify-between py-4 text-5xl font-black uppercase"
                >
                  {link.label}
                  <span className="text-base font-bold">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto grid gap-3">
          <Button href={orderHref} onClick={close}>
            Order now
            <CountBadge count={orderCount} className="bg-gold text-cocoa" />
          </Button>
          <Button href={menuHref} onClick={close} variant="light">
            {bookIcon}
            The menu
          </Button>
          <Button href={contact.whatsappUrl} variant="light">
            WhatsApp {contact.whatsappDisplay}
          </Button>
          <Button href={contact.instagramUrl} variant="light">
            Instagram {contact.instagramHandle}
          </Button>
        </div>
      </div>
    </>
  )
}
