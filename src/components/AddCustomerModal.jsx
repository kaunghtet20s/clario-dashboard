import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Check } from 'lucide-react'
import Modal from './Modal'
import Field, { Select } from './Field'

const planMrr = { Enterprise: 1290, Pro: 490, Starter: 149 }

const empty = () => ({
  name: '',
  email: '',
  company: '',
  plan: 'Pro',
  status: 'Active',
})

export default function AddCustomerModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (open) setForm(empty())
  }, [open])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const billable = form.status === 'Active'
    onCreate({
      id: 'CUS-' + Math.floor(9000 + Math.random() * 1000),
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || '—',
      plan: form.plan,
      status: form.status,
      mrr: billable ? planMrr[form.plan] ?? 0 : 0,
      lastActive: 'Just now',
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add customer"
      subtitle="Create a new customer account"
      icon={UserPlus}
      footer={
        <>
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <motion.button whileTap={{ scale: 0.97 }} type="submit" form="add-customer-form" className="btn-primary">
            <Check className="h-4 w-4" />
            Add customer
          </motion.button>
        </>
      }
    >
      <form id="add-customer-form" onSubmit={submit} className="space-y-4">
        <Field label="Full name">
          <input required value={form.name} onChange={set('name')} placeholder="e.g. Jordan Blake" className="input" />
        </Field>
        <Field label="Email">
          <input required type="email" value={form.email} onChange={set('email')} placeholder="jordan@company.com" className="input" />
        </Field>
        <Field label="Company">
          <input value={form.company} onChange={set('company')} placeholder="e.g. Northwind Labs" className="input" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Plan">
            <Select value={form.plan} onChange={set('plan')}>
              <option>Enterprise</option>
              <option>Pro</option>
              <option>Starter</option>
            </Select>
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={set('status')}>
              <option>Active</option>
              <option>Trial</option>
              <option>Churned</option>
            </Select>
          </Field>
        </div>
      </form>
    </Modal>
  )
}
