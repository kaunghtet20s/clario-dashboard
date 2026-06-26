import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Mail, MoreVertical } from 'lucide-react'
import { cn, formatCurrency } from '../lib/utils'
import { customerFilters, planStyles, customerStatusStyles } from '../data/customers'
import Avatar from './Avatar'

export default function CustomerSection({ customers = [], onAction }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const counts = useMemo(() => {
    const base = { All: customers.length, Active: 0, Trial: 0, Churned: 0 }
    customers.forEach((c) => (base[c.status] += 1))
    return base
  }, [customers])

  const rows = useMemo(
    () =>
      customers.filter((c) => {
        const matchesFilter = filter === 'All' || c.status === filter
        const matchesQuery =
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase()) ||
          c.company.toLowerCase().includes(query.toLowerCase())
        return matchesFilter && matchesQuery
      }),
    [customers, filter, query],
  )

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-ink-200/70 p-4 dark:border-ink-800 lg:flex-row lg:items-center lg:justify-between">
        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-ink-100/70 p-1 dark:bg-ink-800/60">
          {customerFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'relative rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors',
                filter === f
                  ? 'text-ink-900 dark:text-white'
                  : 'text-ink-500 hover:text-ink-700 dark:text-ink-400 dark:hover:text-ink-200',
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="customer-tab"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-ink-700"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative z-10">
                {f}
                <span className="ml-1.5 text-xs text-ink-400">{counts[f]}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="relative lg:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers…"
            className="input pl-10"
          />
        </div>
      </div>

      {/* Cards grid */}
      <div className="p-4">
        <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rows.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-ink-200/70 bg-white p-4 transition-shadow hover:shadow-soft dark:border-ink-800 dark:bg-ink-900"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar name={c.name} size="md" />
                    <span
                      className={cn(
                        'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white dark:ring-ink-900',
                        customerStatusStyles[c.status],
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-800 dark:text-ink-100">
                      {c.name}
                    </p>
                    <p className="truncate text-xs text-ink-400">{c.company}</p>
                  </div>
                  <button
                    onClick={() => onAction?.(c)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800"
                    aria-label="Customer actions"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{c.email}</span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 dark:border-ink-800">
                  <span
                    className={cn(
                      'rounded-md px-2 py-0.5 text-xs font-semibold',
                      planStyles[c.plan],
                    )}
                  >
                    {c.plan}
                  </span>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-ink-700 dark:text-ink-200">
                      {c.mrr > 0 ? `${formatCurrency(c.mrr)}/mo` : '—'}
                    </p>
                    <p className="text-[11px] text-ink-400">Active {c.lastActive}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {rows.length === 0 && (
          <div className="py-12 text-center text-sm text-ink-400">No customers found.</div>
        )}
      </div>
    </div>
  )
}
