import { AnimatePresence, motion } from 'framer-motion'
import { User, CreditCard, Settings, LogOut } from 'lucide-react'
import Avatar from './Avatar'

const items = [
  { id: 'profile', label: 'Your Profile', icon: User },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function ProfileDropdown({ open, user, onSelect, onLogout }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="card absolute right-0 top-12 z-50 w-60 overflow-hidden p-0 shadow-lift"
        >
          <div className="flex items-center gap-3 border-b border-ink-200/70 p-4 dark:border-ink-800">
            <Avatar name={user.name} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink-800 dark:text-ink-100">
                {user.name}
              </p>
              <p className="truncate text-xs text-ink-500 dark:text-ink-400">{user.email}</p>
            </div>
          </div>
          <div className="p-1.5">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
                >
                  <Icon className="h-4.5 w-4.5 text-ink-400" />
                  {item.label}
                </button>
              )
            })}
          </div>
          <div className="border-t border-ink-200/70 p-1.5 dark:border-ink-800">
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
            >
              <LogOut className="h-4.5 w-4.5" />
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
