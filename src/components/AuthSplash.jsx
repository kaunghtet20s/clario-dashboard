import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

// Full-screen loader shown while the session is being restored.
export default function AuthSplash() {
  return (
    <div className="auth-bg grid min-h-screen place-items-center bg-ink-50 dark:bg-ink-950">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none">
            <path
              d="M5 15l4-6 3 4 5-7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <div className="flex items-center gap-2 text-sm font-medium text-ink-500 dark:text-ink-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading your workspace…
        </div>
      </div>
    </div>
  )
}
