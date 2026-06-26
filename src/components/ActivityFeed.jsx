import { motion } from 'framer-motion'
import {
  UserPlus,
  CreditCard,
  FolderPlus,
  ArrowUpCircle,
  LifeBuoy,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { activities, activityToneStyles } from '../data/activities'

const iconMap = { UserPlus, CreditCard, FolderPlus, ArrowUpCircle, LifeBuoy }

const badgeTone = {
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
}

export default function ActivityFeed() {
  return (
    <ul className="relative space-y-1">
      {/* connector line */}
      <span className="absolute bottom-4 left-[26px] top-4 w-px bg-ink-200/70 dark:bg-ink-800" />
      {activities.map((item, i) => {
        const Icon = iconMap[item.icon] ?? UserPlus
        return (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
            className="relative flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-ink-50 dark:hover:bg-ink-800/40"
          >
            <span
              className={cn(
                'relative z-10 mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full ring-4 ring-white dark:ring-ink-900',
                activityToneStyles[item.statusTone],
              )}
            >
              <Icon className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug text-ink-800 dark:text-ink-100">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{item.meta}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                  badgeTone[item.statusTone],
                )}
              >
                {item.status}
              </span>
              <span className="text-[11px] text-ink-400">{item.time}</span>
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}
