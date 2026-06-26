import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarPlus, Check } from 'lucide-react'
import { cn } from '../lib/utils'
import Modal from './Modal'
import Field from './Field'

export const eventColors = [
  { label: 'Indigo', tone: 'bg-brand-500' },
  { label: 'Emerald', tone: 'bg-emerald-500' },
  { label: 'Amber', tone: 'bg-amber-500' },
  { label: 'Rose', tone: 'bg-rose-500' },
  { label: 'Cyan', tone: 'bg-cyan-500' },
  { label: 'Violet', tone: 'bg-violet-500' },
]

const empty = (date) => ({ title: '', date: date || new Date().toISOString().slice(0, 10), tone: eventColors[0].tone })

export default function AddEventModal({ open, onClose, onCreate, defaultDate }) {
  const [form, setForm] = useState(() => empty(defaultDate))

  useEffect(() => {
    if (open) setForm(empty(defaultDate))
  }, [open, defaultDate])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onCreate({ date: form.date, title: form.title.trim(), tone: form.tone })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New event"
      subtitle="Add an event to your calendar"
      icon={CalendarPlus}
      size="sm"
      footer={
        <>
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <motion.button whileTap={{ scale: 0.97 }} type="submit" form="add-event-form" className="btn-primary">
            <Check className="h-4 w-4" />
            Add event
          </motion.button>
        </>
      }
    >
      <form id="add-event-form" onSubmit={submit} className="space-y-4">
        <Field label="Event title">
          <input required value={form.title} onChange={set('title')} placeholder="e.g. Sprint planning" className="input" />
        </Field>
        <Field label="Date">
          <input type="date" value={form.date} onChange={set('date')} className="input" />
        </Field>
        <Field label="Colour">
          <div className="flex flex-wrap gap-2">
            {eventColors.map((c) => (
              <button
                key={c.tone}
                type="button"
                onClick={() => setForm((f) => ({ ...f, tone: c.tone }))}
                aria-label={c.label}
                className={cn(
                  'h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-white transition dark:ring-offset-ink-900',
                  c.tone,
                  form.tone === c.tone ? 'ring-ink-400 dark:ring-ink-300' : 'ring-transparent',
                )}
              />
            ))}
          </div>
        </Field>
      </form>
    </Modal>
  )
}
