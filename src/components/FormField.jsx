import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../lib/utils'

export default function FormField({
  label,
  type = 'text',
  icon: Icon,
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
  name,
}) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-semibold text-ink-700 dark:text-ink-200">
          {label}
        </span>
      )}
      <span className="relative block">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-400" />
        )}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={cn('input', Icon && 'pl-10', isPassword && 'pr-11')}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 transition hover:text-ink-600 dark:hover:text-ink-200"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
          </button>
        )}
      </span>
    </label>
  )
}
