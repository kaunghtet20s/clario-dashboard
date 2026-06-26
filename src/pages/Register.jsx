import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import { cn } from '../lib/utils'
import AuthLayout from './AuthLayout'
import FormField from '../components/FormField'
import FormError from '../components/FormError'
import { useToast } from '../components/Toast'
import { useAuth } from '../context/AuthContext'

function strength(password) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

const strengthMeta = [
  { label: '', color: '' },
  { label: 'Weak', color: 'bg-rose-500' },
  { label: 'Fair', color: 'bg-amber-500' },
  { label: 'Good', color: 'bg-blue-500' },
  { label: 'Strong', color: 'bg-emerald-500' },
]

export default function Register() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const score = useMemo(() => strength(form.password), [form.password])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register({ name: form.name || undefined, email: form.email, password: form.password })
      toast({ title: 'Account created!', description: 'Welcome to Clario.', tone: 'success' })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to create your account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your 14-day free trial. No credit card required."
      footer={
        <span className="text-ink-500 dark:text-ink-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300">
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <FormError message={error} />
        <FormField
          label="Full name"
          icon={User}
          value={form.name}
          onChange={update('name')}
          placeholder="Alex Morgan"
          autoComplete="name"
          required
        />
        <FormField
          label="Email"
          type="email"
          icon={Mail}
          value={form.email}
          onChange={update('email')}
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
        <div>
          <FormField
            label="Password"
            type="password"
            icon={Lock}
            value={form.password}
            onChange={update('password')}
            placeholder="Create a strong password"
            autoComplete="new-password"
            required
          />
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors',
                      i <= score ? strengthMeta[score].color : 'bg-ink-200 dark:bg-ink-800',
                    )}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-ink-400">
                Password strength: <span className="font-semibold">{strengthMeta[score].label || '—'}</span>
              </p>
            </div>
          )}
        </div>

        <label className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
          />
          <span>
            I agree to the{' '}
            <a href="#" className="font-semibold text-brand-600 dark:text-brand-300">Terms</a> and{' '}
            <a href="#" className="font-semibold text-brand-600 dark:text-brand-300">Privacy Policy</a>.
          </span>
        </label>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-70"
        >
          {loading ? 'Creating account…' : 'Create account'}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </motion.button>
      </form>
    </AuthLayout>
  )
}
