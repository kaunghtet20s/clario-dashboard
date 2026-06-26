import { AnimatePresence, motion } from 'framer-motion'
import {
  CreditCard,
  UserPlus,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
  BellOff,
  CheckCheck,
  Trash2,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { notificationToneStyles } from '../data/notifications'

const iconMap = { CreditCard, UserPlus, AlertTriangle, MessageSquare, CheckCircle2 }

export default function NotificationPanel({
  open,
  notifications,
  onMarkAllRead,
  onClearAll,
  onItemClick,
}) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="card absolute right-0 top-12 z-50 w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden p-0 shadow-lift"
        >
          <div className="flex items-center justify-between border-b border-ink-200/70 px-4 py-3 dark:border-ink-800">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-ink-800 dark:text-ink-100">Notifications</h3>
              {unreadCount > 0 && (
                <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-brand-600 px-1.5 text-[11px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onMarkAllRead}
              className="flex items-center gap-1 text-xs font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-300"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          </div>

          <div className="max-h-[22rem] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                <BellOff className="h-7 w-7 text-ink-300 dark:text-ink-600" />
                <p className="text-sm font-medium text-ink-500 dark:text-ink-400">All caught up!</p>
                <p className="text-xs text-ink-400">You have no new notifications.</p>
              </div>
            ) : (
              <ul>
                <AnimatePresence initial={false}>
                  {notifications.map((n) => {
                    const Icon = iconMap[n.icon] ?? MessageSquare
                    return (
                      <motion.li
                        key={n.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <button
                          onClick={() => onItemClick(n.id)}
                          className={cn(
                            'flex w-full gap-3 border-b border-ink-100 px-4 py-3 text-left transition hover:bg-ink-50 dark:border-ink-800/70 dark:hover:bg-ink-800/50',
                            !n.read && 'bg-brand-50/40 dark:bg-brand-500/5',
                          )}
                        >
                          <span
                            className={cn(
                              'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                              notificationToneStyles[n.tone],
                            )}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-ink-800 dark:text-ink-100">
                              {n.title}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-xs text-ink-500 dark:text-ink-400">
                              {n.body}
                            </p>
                            <p className="mt-1 text-[11px] font-medium text-ink-400">{n.time}</p>
                          </div>
                          {!n.read && (
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                          )}
                        </button>
                      </motion.li>
                    )
                  })}
                </AnimatePresence>
              </ul>
            )}
          </div>

          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex w-full items-center justify-center gap-1.5 border-t border-ink-200/70 py-2.5 text-xs font-semibold text-ink-500 transition hover:bg-ink-50 hover:text-rose-500 dark:border-ink-800 dark:hover:bg-ink-800/50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear all
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
