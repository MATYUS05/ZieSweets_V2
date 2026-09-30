import { useEffect, useEffectEvent } from 'react'

export default function useHashDialog(dialogRef, routes, onRoute) {
  const handleRoute = useEffectEvent((route) => onRoute?.(route))

  useEffect(() => {
    const dialog = dialogRef.current
    const sync = () => {
      const route = routes[location.hash]
      if (route) handleRoute(route)
      if (route && !dialog.open) dialog.showModal()
      if (!route && dialog.open) dialog.close()
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [dialogRef, routes])

  return () => {
    if (routes[location.hash]) history.replaceState(null, '', location.pathname + location.search)
  }
}
