const inView = (rect) => rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth

export default function flyToBox(source) {
  if (!source || matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const from = source.getBoundingClientRect()
  const ghost = source.cloneNode(true)
  ghost.setAttribute('aria-hidden', 'true')
  Object.assign(ghost.style, {
    position: 'fixed',
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    margin: '0',
    zIndex: '60',
    pointerEvents: 'none',
  })

  requestAnimationFrame(() => {
    const targets = [...document.querySelectorAll('[data-fly-target]')].filter((el) => el.getClientRects().length)
    const target = targets.find((el) => inView(el.getBoundingClientRect())) ?? targets[0]
    if (!target) return

    const to = target.getBoundingClientRect()
    const dx = to.left + to.width / 2 - (from.left + from.width / 2)
    const dy = to.top + to.height / 2 - (from.top + from.height / 2)
    ;(source.closest('dialog') ?? document.body).append(ghost)
    const flight = ghost.animate(
      [
        { transform: 'none', opacity: 1 },
        { transform: `translate(${dx * 0.4}px, ${dy * 0.4 - 80}px) scale(0.6) rotate(-8deg)`, offset: 0.45 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.1)`, opacity: 0.3, borderRadius: '50%' },
      ],
      { duration: 650, easing: 'cubic-bezier(0.4, 0, 0.6, 1)' },
    )
    flight.onfinish = flight.oncancel = () => ghost.remove()
  })
}
