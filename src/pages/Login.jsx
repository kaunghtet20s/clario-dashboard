import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, Github } from 'lucide-react'
import AuthLayout from './AuthLayout'
import FormField from '../components/FormField'
import FormError from '../components/FormError'
import { useToast } from '../components/Toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: 'alex@clario.io', password: 'password' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login({ email: form.email, password: form.password })
      toast({ title: 'Welcome back!', description: 'Signed in successfully.', tone: 'success' })
      navigate(location.state?.from?.pathname ?? '/', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Sign in to Clario"
      subtitle="Welcome back! Please enter your details."
      footer={
        <span className="text-ink-500 dark:text-ink-400">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300">
            Sign up
          </Link>
        </span>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <FormError message={error} />
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
        <FormField
          label="Password"
          type="password"
          icon={Lock}
          value={form.password}
          onChange={update('password')}
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
          >
            Forgot password?
          </Link>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-70"
        >
          {loading ? 'Signing in…' : 'Sign in'}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </motion.button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-ink-200 dark:bg-ink-800" />
          <span className="text-xs font-medium text-ink-400">OR</span>
          <span className="h-px flex-1 bg-ink-200 dark:bg-ink-800" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="btn-ghost">
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3 14.6 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c5.8 0 9.6-4.1 9.6-9.8 0-.7-.1-1.1-.2-1.6H12z" />
            </svg>
            Google
          </button>
          <button type="button" className="btn-ghost">
            <Github className="h-4.5 w-4.5" />
            GitHub
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
