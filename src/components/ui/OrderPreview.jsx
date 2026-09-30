import { useEffect, useRef } from 'react'
import logoMark from '../../assets/img/logo-mark.webp'
import { whatsappLink } from '../../data/site'
import Button from './Button'

export default function OrderPreview({ message, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (message && !dialog.open) dialog.showModal()
    if (!message && dialog.open) dialog.close()
  }, [message])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="order-preview-title"
      onClose={onClose}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(28rem,calc(100%-2rem))] overflow-visible border-0 bg-transparent p-0 text-cocoa backdrop:bg-cocoa/50 open:animate-rise"
    >
      <div className="-rotate-1 border-2 border-cocoa bg-white p-6 shadow-hard-lg">
        <div className="flex items-center gap-4 border-b-2 border-dashed border-cocoa/30 pb-5">
          <img src={logoMark} alt="" className="size-14 rotate-6 rounded-full border-2 border-cocoa shadow-hard" />
          <div>
            <p className="text-xs font-bold tracking-[0.15em] uppercase">Your order note</p>
            <h2 id="order-preview-title" className="text-3xl leading-none font-black uppercase">
              Ready to send?
            </h2>
          </div>
        </div>

        <p className="mt-5 text-sm text-cocoa-muted">
          We’ll open WhatsApp with this message — nothing is sent until you tap send there.
        </p>
        <pre className="scrollbar-brand mt-3 max-h-[45dvh] overflow-y-auto border-2 border-dashed border-cocoa/40 bg-cream p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </pre>

        <div className="mt-6 grid gap-4">
          {message && <Button href={whatsappLink(message)}>Send on WhatsApp →</Button>}
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            className="text-sm font-semibold underline underline-offset-4 hover:text-cocoa-muted"
          >
            Edit my order
          </button>
        </div>
      </div>
    </dialog>
  )
}
