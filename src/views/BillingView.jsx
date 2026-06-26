import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Download, Zap } from 'lucide-react'
import { cn, formatCurrency } from '../lib/utils'
import { plans, invoices } from '../data/plans'
import FadeIn, { PageHeader } from '../components/FadeIn'

export default function BillingView({ onToast }) {
  const [yearly, setYearly] = useState(false)
  const [current, setCurrent] = useState('pro')

  const choose = (plan) => {
    setCurrent(plan.id)
    onToast({
      title: `Switched to ${plan.name}`,
      description: yearly ? 'Billed annually' : 'Billed monthly',
      tone: 'success',
    })
  }

  return (
    <div>
      <PageHeader
        title="Billing & Plans"
        description="Manage your subscription, usage, and invoices."
      />

      {/* Current plan summary */}
      <FadeIn>
        <div className="card relative overflow-hidden p-5 sm:p-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/10 blur-2xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-ink-500 dark:text-ink-400">Current plan</p>
                <p className="text-xl font-extrabold tracking-tight text-ink-900 dark:text-white">
                  {plans.find((p) => p.id === current)?.name} Plan
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-xs text-ink-400">Next invoice</p>
                <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">Jul 1, 2026</p>
              </div>
              <div>
                <p className="text-xs text-ink-400">Seats used</p>
                <p className="text-sm font-semibold text-ink-800 dark:text-ink-100">18 / 25</p>
              </div>
              <div className="min-w-[140px]">
                <div className="mb-1 flex justify-between text-xs text-ink-400">
                  <span>Events</span>
                  <span>168k / 250k</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '67%' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="h-full rounded-full bg-brand-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Billing cycle toggle */}
      <FadeIn delay={0.05} className="mt-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 rounded-full bg-ink-100/80 p-1 dark:bg-ink-800/70">
          {[
            { id: false, label: 'Monthly' },
            { id: true, label: 'Yearly' },
          ].map((opt) => (
            <button
              key={String(opt.id)}
              onClick={() => setYearly(opt.id)}
              className={cn(
                'relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
                yearly === opt.id
                  ? 'text-ink-900 dark:text-white'
                  : 'text-ink-500 hover:text-ink-700 dark:text-ink-400',
              )}
            >
              {yearly === opt.id && (
                <motion.span
                  layoutId="cycle"
                  className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-ink-700"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {opt.label}
                {opt.id && (
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
                    -16%
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Plan cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly
          const isCurrent = current === plan.id
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'card relative flex flex-col p-6',
                plan.highlighted
                  ? 'border-brand-500/60 ring-2 ring-brand-500/30 dark:border-brand-500/50'
                  : '',
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white shadow-glow">
                  <Sparkles className="h-3.5 w-3.5" />
                  {plan.badge}
                </span>
              )}

              <h3 className="text-lg font-bold text-ink-900 dark:text-white">{plan.name}</h3>
              <p className="mt-1 min-h-[40px] text-sm text-ink-500 dark:text-ink-400">
                {plan.description}
              </p>

              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-ink-900 dark:text-white">
                  {formatCurrency(price)}
                </span>
                <span className="mb-1.5 text-sm text-ink-400">/{yearly ? 'yr' : 'mo'}</span>
              </div>

              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-300">
                    <span
                      className={cn(
                        'mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full',
                        plan.highlighted
                          ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300'
                          : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300',
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => choose(plan)}
                disabled={isCurrent}
                className={cn(
                  'mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition',
                  isCurrent
                    ? 'cursor-default bg-ink-100 text-ink-400 dark:bg-ink-800'
                    : plan.highlighted
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'border border-ink-200 text-ink-700 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800',
                )}
              >
                {isCurrent ? 'Current plan' : `Choose ${plan.name}`}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      {/* Invoices */}
      <FadeIn delay={0.1} className="mt-8">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink-200/70 px-5 py-4 dark:border-ink-800">
            <h3 className="text-base font-bold text-ink-900 dark:text-white">Billing history</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-ink-400">
                  <th className="px-5 py-3 font-semibold">Invoice</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 dark:divide-ink-800/70">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="transition hover:bg-ink-50/70 dark:hover:bg-ink-800/40">
                    <td className="px-5 py-3.5 font-semibold text-ink-800 dark:text-ink-100">
                      {inv.id}
                    </td>
                    <td className="px-5 py-3.5 text-ink-600 dark:text-ink-300">{inv.date}</td>
                    <td className="px-5 py-3.5 text-ink-600 dark:text-ink-300">
                      {formatCurrency(inv.amount)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => onToast({ title: 'Downloading receipt', description: inv.id, tone: 'info' })}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-300"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
