import { lazy, Suspense } from 'react'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import About from './components/sections/About'
import ClosingCta from './components/sections/ClosingCta'
import Events from './components/sections/Events'
import Hero from './components/sections/Hero'
import MenuCover from './components/sections/MenuCover'
import Products from './components/sections/Products'
import Reviews from './components/sections/Reviews'
import Marquee from './components/ui/Marquee'
import { marqueeItems, products } from './data/site'
import { boxItems, summarizeOrder } from './lib/order'
import useStoredState from './lib/useStoredState'

const Catalog = lazy(() => import('./components/sections/Catalog'))
const MenuBook = lazy(() => import('./components/sections/MenuBook'))

export default function App() {
  const [box, setBox] = useStoredState('ziesweets-box', {})
  const [snackBoxes, setSnackBoxes] = useStoredState('ziesweets-snack-boxes', [])
  const orderCount =
    summarizeOrder(boxItems(products, box)).count + snackBoxes.reduce((sum, snackBox) => sum + snackBox.qty, 0)

  return (
    <div id="top" className="overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <Header orderCount={orderCount} />
      <main id="main">
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <Products />
        <MenuCover />
        <Events />
        <Reviews />
        <ClosingCta />
      </main>
      <Footer />
      <Suspense>
        <Catalog box={box} setBox={setBox} snackBoxes={snackBoxes} setSnackBoxes={setSnackBoxes} />
        <MenuBook />
      </Suspense>
    </div>
  )
}
