import { useEffect } from 'react'

// Calls `handler` when a pointerdown/touch happens outside the referenced element.
export function useClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return
    const listener = (event) => {
      const el = ref.current
      if (!el || el.contains(event.target)) return
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, active])
}
