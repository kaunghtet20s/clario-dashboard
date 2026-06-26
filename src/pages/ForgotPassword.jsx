import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, MailCheck } from 'lucide-react'
import AuthLayout from './AuthLayout'
import FormField from '../components/FormField'
import FormError from '../components/FormError'
import { useToast } from '../components/Toast'
import { forgotPasswordRequest } from '../api/auth'

export default function ForgotPassword() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await forgotPasswordRequest({ email })
      setSent(true)
      toast({ title: 'Reset link sent', description: `Check ${email}`, tone: 'success' })
    } catch (err) {
      setError(err.message || 'Unable to send reset link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title={sent ? 'Check your inbox' : 'Forgot password?'}
      subtitle={
        sent
          ? `We’ve sent a password reset link to ${email}.`
          : 'No worries — we’ll send you reset instructions.'
      }
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 rounded-2xl border border-ink-200/70 bg-white p-8 text-center dark:border-ink-800 dark:bg-ink-900"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
            <MailCheck className="h-7 w-7" />
          </span>
          <p className="text-sm text-ink-500 dark:text-ink-400">
            Didn’t receive the email? Check your spam folder or
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
          >
            try another email address
          </button>
        </motion.div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <FormError message={error} />
          <FormField
            label="Email"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-70"
          >
            {loading ? 'Sending…' : 'Send reset link'}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </motion.button>
        </form>
      )}
    </AuthLayout>
  )
}
