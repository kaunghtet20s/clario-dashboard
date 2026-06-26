import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '../lib/utils'

const ToastContext = createContext(null)

const toneConfig = {
  success: { icon: CheckCircle2, ring: 'text-emerald-500' },
  info: { icon: Info, ring: 'text-blue-500' },
  warning: { icon: AlertTriangle, ring: 'text-amber-500' },
}

let counter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, tone = 'success', duration = 3200 }) => {
      const id = ++counter
      setToasts((prev) => [...prev, { id, title, description, tone }])
      if (duration) setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2.5 sm:bottom-6 sm:right-6">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const { icon: Icon, ring } = toneConfig[t.tone] ?? toneConfig.success
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                className="card pointer-events-auto flex items-start gap-3 p-3.5 shadow-lift"
              >
                <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', ring)} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded-lg p-1 text-ink-400 transition hover:bg-ink-100 hover:text-ink-600 dark:hover:bg-ink-800"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
