import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Check, Mail, Briefcase, MapPin, Phone, Building2, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Avatar from '../components/Avatar'
import Field from '../components/Field'
import FadeIn, { PageHeader } from '../components/FadeIn'

export default function ProfileView({ onToast }) {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    role: user?.role ?? '',
    company: user?.company ?? 'Clario, Inc.',
    location: user?.location ?? 'San Francisco, CA',
    phone: user?.phone ?? '',
    bio: user?.bio ?? 'Product leader focused on building delightful analytics experiences.',
  })
  const [saving, setSaving] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile(form)
      onToast({ title: 'Profile updated', description: 'Your changes have been saved.', tone: 'success' })
    } catch (err) {
      onToast({ title: 'Update failed', description: err.message, tone: 'warning' })
    } finally {
      setSaving(false)
    }
  }

  const stats = [
    { label: 'Plan', value: 'Pro' },
    { label: 'Member since', value: 'Mar 2026' },
    { label: 'Projects', value: '8' },
    { label: 'Role', value: form.role || '—' },
  ]

  return (
    <div>
      <PageHeader title="Profile" description="Manage your personal information and account." />

      {/* Header card */}
      <FadeIn>
        <div className="card overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-brand-500 via-brand-600 to-violet-600 sm:h-32" />
          <div className="px-5 pb-5 sm:px-6">
            <div className="-mt-10 flex flex-col items-start gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <Avatar name={form.name || 'User'} size="lg" className="h-20 w-20 text-2xl ring-4 ring-white dark:ring-ink-900" />
                  <button
                    onClick={() => onToast({ title: 'Upload photo', description: 'Photo upload coming soon.', tone: 'info' })}
                    className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm transition hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
                    aria-label="Change photo"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="pb-1">
                  <h2 className="text-xl font-extrabold tracking-tight text-ink-900 dark:text-white">
                    {form.name || 'Your name'}
                  </h2>
                  <p className="flex items-center gap-1.5 text-sm text-ink-500 dark:text-ink-400">
                    <Briefcase className="h-3.5 w-3.5" />
                    {form.role || '—'}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified account
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-ink-50 px-4 py-3 dark:bg-ink-800/50">
                  <p className="text-xs text-ink-400">{s.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-ink-800 dark:text-ink-100">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Edit form */}
      <FadeIn delay={0.08} className="mt-6">
        <form onSubmit={submit} className="card p-5 sm:p-6">
          <h3 className="text-base font-bold tracking-tight text-ink-900 dark:text-white">
            Personal information
          </h3>
          <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-400">
            Update your details. These appear across your workspace.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input value={form.name} onChange={set('name')} className="input" placeholder="Your name" />
            </Field>
            <Field label="Role / title">
              <input value={form.role} onChange={set('role')} className="input" placeholder="e.g. Product Lead" />
            </Field>
            <Field label="Email">
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-400" />
                <input type="email" value={form.email} onChange={set('email')} className="input pl-10" placeholder="you@company.com" />
              </span>
            </Field>
            <Field label="Phone">
              <span className="relative block">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-400" />
                <input value={form.phone} onChange={set('phone')} className="input pl-10" placeholder="+1 (555) 000-0000" />
              </span>
            </Field>
            <Field label="Company">
              <span className="relative block">
                <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-400" />
                <input value={form.company} onChange={set('company')} className="input pl-10" placeholder="Company" />
              </span>
            </Field>
            <Field label="Location">
              <span className="relative block">
                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-400" />
                <input value={form.location} onChange={set('location')} className="input pl-10" placeholder="City, Country" />
              </span>
            </Field>
            <Field label="Bio" className="sm:col-span-2">
              <textarea
                value={form.bio}
                onChange={set('bio')}
                rows={3}
                className="input resize-none"
                placeholder="A short bio about yourself"
              />
            </Field>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2 border-t border-ink-200/70 pt-5 dark:border-ink-800">
            <button
              type="button"
              onClick={() =>
                setForm({
                  name: user?.name ?? '',
                  email: user?.email ?? '',
                  role: user?.role ?? '',
                  company: user?.company ?? 'Clario, Inc.',
                  location: user?.location ?? 'San Francisco, CA',
                  phone: user?.phone ?? '',
                  bio: user?.bio ?? 'Product leader focused on building delightful analytics experiences.',
                })
              }
              className="btn-ghost"
            >
              Reset
            </button>
            <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={saving} className="btn-primary disabled:opacity-70">
              <Check className="h-4 w-4" />
              {saving ? 'Saving…' : 'Save changes'}
            </motion.button>
          </div>
        </form>
      </FadeIn>
    </div>
  )
}
