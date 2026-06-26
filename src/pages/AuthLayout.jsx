import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, TrendingUp, ShieldCheck, Zap } from 'lucide-react'

const highlights = [
  { icon: TrendingUp, text: 'Real-time analytics across every metric' },
  { icon: Zap, text: 'Lightning-fast dashboards your team will love' },
  { icon: ShieldCheck, text: 'Enterprise-grade security & SSO' },
]

export default function AuthLayout({ title, subtitle, children, footer }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="auth-bg flex min-h-screen bg-ink-50 dark:bg-ink-950">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800 p-12 text-white lg:flex">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />

        <div className="relative flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
              <path
                d="M5 15l4-6 3 4 5-7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight">Clario</span>
        </div>

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md text-4xl font-extrabold leading-tight tracking-tight"
          >
            The modern analytics platform for ambitious teams.
          </motion.h2>
          <ul className="mt-8 space-y-4">
            {highlights.map((h, i) => {
              const Icon = h.icon
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="flex items-center gap-3 text-white/90"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  {h.text}
                </motion.li>
              )
            })}
          </ul>
        </div>

        <p className="relative text-sm text-white/60">
          “Clario gave us a single source of truth.” — Head of Growth, Vertex
        </p>
      </div>

      {/* Form panel */}
      <div className="relative flex w-full flex-col items-center justify-center px-5 py-10 lg:w-1/2">
        <button
          onClick={toggleTheme}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M5 15l4-6 3 4 5-7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-ink-900 dark:text-white">
              Clario
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{subtitle}</p>

          <div className="mt-7">{children}</div>

          {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
        </motion.div>
      </div>
    </div>
  )
}
