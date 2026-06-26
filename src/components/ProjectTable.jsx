import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
} from 'lucide-react'
import { cn, formatCurrency } from '../lib/utils'
import { useClickOutside } from '../lib/useClickOutside'
import { projectStatuses, statusStyles } from '../data/projects'
import { AvatarStack } from './Avatar'

function ProgressBar({ value }) {
  const tone =
    value >= 100 ? 'bg-emerald-500' : value >= 60 ? 'bg-brand-500' : value >= 30 ? 'bg-amber-500' : 'bg-rose-500'
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className={cn('h-full rounded-full', tone)}
        />
      </div>
      <span className="w-9 text-xs font-semibold text-ink-500 dark:text-ink-400">{value}%</span>
    </div>
  )
}

function RowMenu({ project, onAction }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)

  const actions = [
    { id: 'view', label: 'View details', icon: Eye },
    { id: 'edit', label: 'Edit project', icon: Pencil },
    { id: 'complete', label: 'Mark complete', icon: CheckCircle2 },
    { id: 'delete', label: 'Delete', icon: Trash2, danger: true },
  ]

  return (
    <div ref={ref} className="relative flex justify-end">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800',
          open && 'bg-ink-100 dark:bg-ink-800',
        )}
        aria-label="Row actions"
      >
        <MoreHorizontal className="h-4.5 w-4.5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.14 }}
            className="card absolute right-0 top-9 z-20 w-44 p-1.5 shadow-lift"
          >
            {actions.map((a) => {
              const Icon = a.icon
              return (
                <button
                  key={a.id}
                  onClick={() => {
                    setOpen(false)
                    onAction(a.id, project)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition',
                    a.danger
                      ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10'
                      : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {a.label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const sortOptions = [
  { id: 'dueDate', label: 'Due date' },
  { id: 'budget', label: 'Budget' },
  { id: 'progress', label: 'Progress' },
  { id: 'name', label: 'Name' },
]

export default function ProjectTable({ projects = [], onAction }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('dueDate')
  const [sortDir, setSortDir] = useState('asc')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)

  const filterRef = useRef(null)
  const sortRef = useRef(null)
  useClickOutside(filterRef, () => setFilterOpen(false), filterOpen)
  useClickOutside(sortRef, () => setSortMenuOpen(false), sortMenuOpen)

  const rows = useMemo(() => {
    let list = projects.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.client.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter
      return matchesQuery && matchesStatus
    })

    list = [...list].sort((a, b) => {
      let res = 0
      if (sortBy === 'name') res = a.name.localeCompare(b.name)
      else if (sortBy === 'dueDate') res = new Date(a.dueDate) - new Date(b.dueDate)
      else res = a[sortBy] - b[sortBy]
      return sortDir === 'asc' ? res : -res
    })
    return list
  }, [projects, query, statusFilter, sortBy, sortDir])

  const activeSortLabel = sortOptions.find((s) => s.id === sortBy)?.label

  return (
    <div className="card overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-ink-200/70 p-4 dark:border-ink-800 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="input pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter */}
          <div ref={filterRef} className="relative">
            <button
              onClick={() => {
                setFilterOpen((o) => !o)
                setSortMenuOpen(false)
              }}
              className="btn-ghost py-2.5 text-sm"
            >
              {statusFilter === 'All' ? 'All status' : statusFilter}
              <ChevronDown className={cn('h-4 w-4 transition-transform', filterOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                  className="card absolute right-0 top-12 z-20 w-44 p-1.5 shadow-lift"
                >
                  {projectStatuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStatusFilter(s)
                        setFilterOpen(false)
                      }}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium transition',
                        statusFilter === s
                          ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200'
                          : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800',
                      )}
                    >
                      {s}
                      {statusFilter === s && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => {
                setSortMenuOpen((o) => !o)
                setFilterOpen(false)
              }}
              className="btn-ghost py-2.5 text-sm"
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden sm:inline">{activeSortLabel}</span>
            </button>
            <AnimatePresence>
              {sortMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                  className="card absolute right-0 top-12 z-20 w-48 p-1.5 shadow-lift"
                >
                  {sortOptions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        if (sortBy === s.id) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
                        else setSortBy(s.id)
                      }}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium transition',
                        sortBy === s.id
                          ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200'
                          : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800',
                      )}
                    >
                      {s.label}
                      {sortBy === s.id && (
                        <span className="text-xs font-bold">{sortDir === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-ink-200/70 text-xs uppercase tracking-wide text-ink-400 dark:border-ink-800">
              <th className="px-5 py-3 font-semibold">Project</th>
              <th className="px-5 py-3 font-semibold">Client</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Progress</th>
              <th className="px-5 py-3 font-semibold">Budget</th>
              <th className="px-5 py-3 font-semibold">Due date</th>
              <th className="px-5 py-3 text-right font-semibold">Team</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-800/70">
            <AnimatePresence mode="popLayout">
              {rows.map((p, i) => (
                <motion.tr
                  key={p.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="group transition-colors hover:bg-ink-50/70 dark:hover:bg-ink-800/40"
                >
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">{p.name}</p>
                    <p className="text-xs text-ink-400">{p.id}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink-600 dark:text-ink-300">{p.client}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
                        statusStyles[p.status],
                      )}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <ProgressBar value={p.progress} />
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-ink-800 dark:text-ink-100">
                    {formatCurrency(p.budget)}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink-600 dark:text-ink-300">
                    {new Date(p.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <AvatarStack names={p.team} max={3} />
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <RowMenu project={p} onAction={onAction} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-ink-400">
            No projects match your filters.
          </div>
        )}
      </div>
    </div>
  )
}
