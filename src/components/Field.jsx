import { cn } from '../lib/utils'

// Labelled form field wrapper. Pass a native input/select/textarea as children.
export default function Field({ label, hint, className, children }) {
  return (
    <label className={cn('block', className)}>
      {label && (
        <span className="mb-1.5 block text-sm font-semibold text-ink-700 dark:text-ink-200">
          {label}
        </span>
      )}
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-400">{hint}</span>}
    </label>
  )
}

// Styled native <select> with a chevron.
export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn('input appearance-none pr-9', className)}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}
