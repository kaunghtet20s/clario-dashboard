import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Sun, Moon, Monitor, Check } from 'lucide-react'
import { cn } from '../lib/utils'
import { useTheme } from '../context/ThemeContext'

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
        checked ? 'bg-brand-600' : 'bg-ink-300 dark:bg-ink-700',
      )}
      role="switch"
      aria-checked={checked}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm',
          checked ? 'right-0.5' : 'left-0.5',
        )}
      />
    </button>
  )
}

function Row({ title, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">{title}</p>
        {description && <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export default function SettingsModal({ open, onClose, onSave }) {
  const { theme, setTheme } = useTheme()
  const [prefs, setPrefs] = useState({
    emailNotifs: true,
    pushNotifs: false,
    weeklyDigest: true,
    productUpdates: true,
    twoFactor: false,
  })
  const set = (key) => (val) => setPrefs((p) => ({ ...p, [key]: val }))

  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="card relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-b-none sm:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink-200/70 px-5 py-4 dark:border-ink-800">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-ink-900 dark:text-white">
                  Settings
                </h2>
                <p className="text-sm text-ink-500 dark:text-ink-400">
                  Manage your preferences and account.
                </p>
              </div>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-xl text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800"
                aria-label="Close settings"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-2">
              {/* Appearance */}
              <section className="py-3">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-400">
                  Appearance
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {themeOptions.map((opt) => {
                    const Icon = opt.icon
                    const active = theme === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTheme(opt.id)}
                        className={cn(
                          'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-sm font-medium transition',
                          active
                            ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200'
                            : 'border-ink-200 text-ink-600 hover:border-ink-300 dark:border-ink-700 dark:text-ink-300',
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Notifications */}
              <section className="border-t border-ink-100 py-3 dark:border-ink-800">
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-400">
                  Notifications
                </h3>
                <div className="divide-y divide-ink-100 dark:divide-ink-800">
                  <Row title="Email notifications" description="Get notified about account activity.">
                    <Toggle checked={prefs.emailNotifs} onChange={set('emailNotifs')} />
                  </Row>
                  <Row title="Push notifications" description="Receive push alerts in your browser.">
                    <Toggle checked={prefs.pushNotifs} onChange={set('pushNotifs')} />
                  </Row>
                  <Row title="Weekly digest" description="A summary of your metrics every Monday.">
                    <Toggle checked={prefs.weeklyDigest} onChange={set('weeklyDigest')} />
                  </Row>
                </div>
              </section>

              {/* Account */}
              <section className="border-t border-ink-100 py-3 dark:border-ink-800">
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-400">
                  Account
                </h3>
                <div className="divide-y divide-ink-100 dark:divide-ink-800">
                  <Row title="Product updates" description="Hear about new features and releases.">
                    <Toggle checked={prefs.productUpdates} onChange={set('productUpdates')} />
                  </Row>
                  <Row
                    title="Two-factor authentication"
                    description="Add an extra layer of security."
                  >
                    <Toggle checked={prefs.twoFactor} onChange={set('twoFactor')} />
                  </Row>
                </div>
              </section>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-ink-200/70 px-5 py-4 dark:border-ink-800">
              <button onClick={onClose} className="btn-ghost">
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => onSave(prefs)}
                className="btn-primary"
              >
                <Check className="h-4 w-4" />
                Save changes
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
