import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import About from './components/sections/About'
import ClosingCta from './components/sections/ClosingCta'
import Hero from './components/sections/Hero'
import Products from './components/sections/Products'
import Reviews from './components/sections/Reviews'
import Marquee from './components/ui/Marquee'
import { marqueeItems } from './data/site'

export default function App() {
  return (
    <div id="top" className="overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <Products />
        <Reviews />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  )
}
