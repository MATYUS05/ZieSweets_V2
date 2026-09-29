import { whatsappLink } from '../../data/site'
import { formatPrice, orderMessage, summarizeOrder } from '../../lib/order'
import Button from './Button'

export default function OrderBox({ items, onClear, className = '' }) {
  const { count, total } = summarizeOrder(items)
  const checkoutUrl = whatsappLink(orderMessage(items))
  const countLabel = `${count} ${count === 1 ? 'item' : 'items'}`

  return (
    <aside aria-labelledby="order-box-title" className={className}>
      <div className="border-2 border-cocoa bg-white p-6 shadow-hard-lg max-lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <h3 id="order-box-title" className="text-3xl font-black uppercase">
            Your box
          </h3>
          <span className="tag">{countLabel}</span>
        </div>

        {count === 0 ? (
          <p className="mt-6 border-2 border-dashed border-cocoa/40 p-6 text-center text-cocoa-muted">
            Your box is empty. Add a treat or two to get started.
          </p>
        ) : (
          <>
            <ul className="mt-6 divide-y-2 divide-dashed divide-cocoa/30 border-y-2 border-dashed border-cocoa/30">
              {items.map((item) => (
                <li key={item.name} className="flex justify-between gap-4 py-3">
                  <span>
                    <span className="font-bold tabular-nums">{item.qty}×</span> {item.name}
                  </span>
                  <span className="tabular-nums">{formatPrice(item.qty * item.price)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-baseline justify-between gap-4">
              <span className="text-sm font-bold tracking-[0.15em] uppercase">Total</span>
              <span className="font-display text-3xl font-black">{formatPrice(total)}</span>
            </p>
            <Button href={checkoutUrl} className="mt-6 w-full">
              Checkout on WhatsApp →
            </Button>
            <button
              type="button"
              onClick={onClear}
              className="mt-4 w-full text-sm font-semibold underline underline-offset-4 hover:text-cocoa-muted"
            >
              Empty the box
            </button>
          </>
        )}

        <p className="mt-4 text-center text-sm text-cocoa-muted">We’ll confirm your order on WhatsApp.</p>
      </div>

      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t-2 border-cocoa bg-gold px-5 py-3 lg:hidden">
          <p>
            <span className="block text-xs font-bold tracking-[0.15em] uppercase">{countLabel} in your box</span>
            <span className="font-display text-2xl font-black">{formatPrice(total)}</span>
          </p>
          <Button href={checkoutUrl}>Checkout →</Button>
        </div>
      )}
    </aside>
  )
}
