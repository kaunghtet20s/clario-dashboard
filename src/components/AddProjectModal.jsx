import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderPlus, Check } from 'lucide-react'
import Modal from './Modal'
import Field, { Select } from './Field'

const todayPlus = (days) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const empty = () => ({
  name: '',
  client: '',
  status: 'In Progress',
  budget: '',
  progress: 0,
  dueDate: todayPlus(30),
  team: '',
})

export default function AddProjectModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (open) setForm(empty())
  }, [open])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const progress = form.status === 'Completed' ? 100 : Number(form.progress) || 0
    onCreate({
      id: 'PRJ-' + Math.floor(1000 + Math.random() * 9000),
      name: form.name.trim(),
      client: form.client.trim() || 'Unassigned',
      status: form.status,
      progress: Math.min(100, Math.max(0, progress)),
      budget: Number(form.budget) || 0,
      dueDate: form.dueDate,
      team: form.team
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New project"
      subtitle="Add a project to your workspace"
      icon={FolderPlus}
      footer={
        <>
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <motion.button whileTap={{ scale: 0.97 }} type="submit" form="add-project-form" className="btn-primary">
            <Check className="h-4 w-4" />
            Create project
          </motion.button>
        </>
      }
    >
      <form id="add-project-form" onSubmit={submit} className="space-y-4">
        <Field label="Project name">
          <input required value={form.name} onChange={set('name')} placeholder="e.g. Mobile App Redesign" className="input" />
        </Field>
        <Field label="Client">
          <input value={form.client} onChange={set('client')} placeholder="e.g. Northwind Labs" className="input" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Status">
            <Select value={form.status} onChange={set('status')}>
              <option>In Progress</option>
              <option>Review</option>
              <option>Completed</option>
              <option>On Hold</option>
            </Select>
          </Field>
          <Field label="Budget ($)">
            <input type="number" min="0" value={form.budget} onChange={set('budget')} placeholder="48000" className="input" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Due date">
            <input type="date" value={form.dueDate} onChange={set('dueDate')} className="input" />
          </Field>
          <Field label="Progress (%)" hint={form.status === 'Completed' ? 'Set to 100% automatically' : undefined}>
            <input
              type="number"
              min="0"
              max="100"
              value={form.status === 'Completed' ? 100 : form.progress}
              onChange={set('progress')}
              disabled={form.status === 'Completed'}
              className="input disabled:opacity-60"
            />
          </Field>
        </div>
        <Field label="Team" hint="Comma-separated names">
          <input value={form.team} onChange={set('team')} placeholder="Ava Chen, Leo Park" className="input" />
        </Field>
      </form>
    </Modal>
  )
}
