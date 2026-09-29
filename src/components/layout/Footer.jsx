import { contact, navLinks } from '../../data/site'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t-2 border-cocoa bg-cocoa text-cream">
      <div className="shell flex flex-col gap-8 pt-14 md:flex-row md:items-start md:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 font-semibold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2 font-semibold md:text-right">
          <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-gold">
            WhatsApp {contact.whatsappDisplay}
          </a>
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-gold">
            Instagram {contact.instagramHandle}
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="font-display mt-10 text-center text-[16vw] leading-[0.8] font-black whitespace-nowrap text-gold uppercase"
      >
        Zie Sweets
      </p>

      <div className="shell flex flex-wrap justify-between gap-2 border-t-2 border-cream/20 py-6 text-sm text-cream/70">
        <span>© {year} ZieSweets</span>
        <span>Freshly baked everyday since 2016</span>
      </div>
    </footer>
  )
}
