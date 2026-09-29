import { useEffect, useState } from 'react'
import { contact, navLinks } from '../../data/site'
import Button from '../ui/Button'
import Logo from '../ui/Logo'

export default function Header() {
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

          <div className="hidden md:block">
            <Button href={contact.whatsappUrl} variant="gold" external>
              Order now
            </Button>
          </div>

          <button
            type="button"
            className="flex size-12 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-cocoa bg-gold shadow-hard md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <span className={`h-0.5 w-5 bg-cocoa transition-transform ${open ? 'translate-y-1 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-cocoa transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`} />
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
          <Button href={contact.whatsappUrl} external>
            WhatsApp {contact.whatsappDisplay}
          </Button>
          <Button href={contact.instagramUrl} variant="light" external>
            Instagram {contact.instagramHandle}
          </Button>
        </div>
      </div>
    </>
  )
}
