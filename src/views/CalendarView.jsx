import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus, CalendarDays } from 'lucide-react'
import { cn } from '../lib/utils'
import FadeIn, { PageHeader } from '../components/FadeIn'
import AddEventModal from '../components/AddEventModal'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const monthShort = monthNames.map((m) => m.slice(0, 3))

const pad = (n) => String(n).padStart(2, '0')
const isoKey = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`

// Seed events keyed by ISO date (today is mid-2026 in this demo).
const seedEvents = {
  '2026-06-04': [{ title: 'Product sync', tone: 'bg-brand-500' }],
  '2026-06-09': [{ title: 'Design review', tone: 'bg-amber-500' }],
  '2026-06-12': [{ title: 'Mobile App due', tone: 'bg-rose-500' }],
  '2026-06-16': [
    { title: 'Customer call', tone: 'bg-emerald-500' },
    { title: 'Sprint demo', tone: 'bg-brand-500' },
  ],
  '2026-06-21': [{ title: 'Board meeting', tone: 'bg-violet-500' }],
  '2026-06-24': [{ title: 'Release v2.1', tone: 'bg-cyan-500' }],
  '2026-07-02': [{ title: 'Roadmap planning', tone: 'bg-brand-500' }],
  '2026-09-14': [{ title: 'Team offsite', tone: 'bg-emerald-500' }],
  '2026-12-31': [{ title: 'Year-end review', tone: 'bg-violet-500' }],
  '2027-01-06': [{ title: 'Kickoff 2027', tone: 'bg-amber-500' }],
}

export default function CalendarView({ onToast }) {
  const today = new Date()
  const [view, setView] = useState('month') // 'month' | 'year'
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [events, setEvents] = useState(seedEvents)
  const [addOpen, setAddOpen] = useState(false)
  const [addDate, setAddDate] = useState(null)

  const firstDay = new Date(cursor.year, cursor.month, 1).getDay()
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const isToday = (day) =>
    day === today.getDate() &&
    cursor.month === today.getMonth() &&
    cursor.year === today.getFullYear()

  const shiftMonth = (dir) =>
    setCursor((c) => {
      let month = c.month + dir
      let year = c.year
      if (month < 0) {
        month = 11
        year -= 1
      } else if (month > 11) {
        month = 0
        year += 1
      }
      return { year, month }
    })

  const shiftYear = (dir) => setCursor((c) => ({ ...c, year: c.year + dir }))
  const goToday = () => setCursor({ year: today.getFullYear(), month: today.getMonth() })

  const monthEventCount = (month) =>
    Object.keys(events).filter((k) => k.startsWith(`${cursor.year}-${pad(month + 1)}`)).length

  const openAdd = (date) => {
    setAddDate(date)
    setAddOpen(true)
  }

  const handleCreate = (event) => {
    setEvents((prev) => ({
      ...prev,
      [event.date]: [...(prev[event.date] ?? []), { title: event.title, tone: event.tone }],
    }))
    const [y, m, d] = event.date.split('-').map(Number)
    onToast?.({
      title: 'Event added',
      description: `${event.title} · ${monthShort[m - 1]} ${d}, ${y}`,
      tone: 'success',
    })
  }

  return (
    <div>
      <PageHeader
        title="Calendar"
        description="Plan releases, meetings, and deadlines."
        action={
          <button onClick={() => openAdd(isoKey(today.getFullYear(), today.getMonth(), today.getDate()))} className="btn-primary">
            <Plus className="h-4 w-4" />
            New event
          </button>
        }
      />

      <FadeIn>
        <div className="card p-4 sm:p-5">
          {/* Toolbar */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-ink-900 dark:text-white">
              {view === 'month' ? `${monthNames[cursor.month]} ${cursor.year}` : cursor.year}
            </h3>

            <div className="flex items-center gap-2">
              {/* View toggle */}
              <div className="flex items-center gap-1 rounded-xl bg-ink-100/70 p-1 dark:bg-ink-800/60">
                {['month', 'year'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      'relative rounded-lg px-3 py-1.5 text-sm font-semibold capitalize transition-colors',
                      view === v ? 'text-ink-900 dark:text-white' : 'text-ink-500 hover:text-ink-700 dark:text-ink-400',
                    )}
                  >
                    {view === v && (
                      <motion.span
                        layoutId="cal-view"
                        className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-ink-700"
                        transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      />
                    )}
                    <span className="relative z-10">{v}</span>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => (view === 'month' ? shiftMonth(-1) : shiftYear(-1))}
                  className="grid h-9 w-9 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>
                <button onClick={goToday} className="btn-ghost px-3 py-2 text-xs">
                  Today
                </button>
                <button
                  onClick={() => (view === 'month' ? shiftMonth(1) : shiftYear(1))}
                  className="grid h-9 w-9 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* MONTH VIEW */}
          {view === 'month' && (
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {weekdays.map((d) => (
                <div key={d} className="pb-2 text-center text-xs font-bold uppercase tracking-wide text-ink-400">
                  <span className="hidden sm:inline">{d}</span>
                  <span className="sm:hidden">{d[0]}</span>
                </div>
              ))}

              {cells.map((day, i) => {
                const key = day ? isoKey(cursor.year, cursor.month, day) : null
                const dayEvents = key ? events[key] ?? [] : []
                return (
                  <motion.button
                    key={i}
                    type="button"
                    disabled={!day}
                    onClick={() => day && openAdd(key)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.006 }}
                    className={cn(
                      'min-h-[68px] rounded-xl border p-1.5 text-left transition sm:min-h-[96px] sm:p-2',
                      day
                        ? 'border-ink-200/70 bg-white hover:border-brand-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/50'
                        : 'cursor-default border-transparent',
                    )}
                  >
                    {day && (
                      <>
                        <span
                          className={cn(
                            'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                            isToday(day) ? 'bg-brand-600 text-white' : 'text-ink-600 dark:text-ink-300',
                          )}
                        >
                          {day}
                        </span>
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((ev, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1 truncate rounded-md bg-ink-50 px-1.5 py-0.5 text-[10px] font-medium text-ink-600 dark:bg-ink-800 dark:text-ink-300"
                            >
                              <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', ev.tone)} />
                              <span className="truncate">{ev.title}</span>
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="px-1 text-[10px] font-semibold text-ink-400">
                              +{dayEvents.length - 2} more
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </motion.button>
                )
              })}
            </div>
          )}

          {/* YEAR VIEW */}
          {view === 'year' && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {monthNames.map((name, m) => {
                const count = monthEventCount(m)
                const current = m === today.getMonth() && cursor.year === today.getFullYear()
                return (
                  <motion.button
                    key={name}
                    type="button"
                    onClick={() => {
                      setCursor((c) => ({ ...c, month: m }))
                      setView('month')
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: m * 0.03 }}
                    whileHover={{ y: -3 }}
                    className={cn(
                      'flex flex-col gap-3 rounded-xl border p-4 text-left transition hover:shadow-soft',
                      current
                        ? 'border-brand-400 ring-1 ring-brand-200 dark:border-brand-500/50 dark:ring-brand-500/20'
                        : 'border-ink-200/70 dark:border-ink-800',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn('font-bold', current ? 'text-brand-600 dark:text-brand-300' : 'text-ink-800 dark:text-ink-100')}>
                        {name}
                      </span>
                      <CalendarDays className="h-4 w-4 text-ink-300 dark:text-ink-600" />
                    </div>
                    <span className="text-xs text-ink-400">
                      {count > 0 ? `${count} event${count > 1 ? 's' : ''}` : 'No events'}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          )}
        </div>
      </FadeIn>

      <AddEventModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={handleCreate}
        defaultDate={addDate}
      />
    </div>
  )
}
