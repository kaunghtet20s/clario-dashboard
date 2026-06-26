import { avatarGradient, initials, cn } from '../lib/utils'

const sizes = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

export default function Avatar({ name = '', size = 'sm', ring = false, className }) {
  return (
    <span
      title={name}
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white',
        sizes[size],
        ring && 'ring-2 ring-white dark:ring-ink-900',
        className,
      )}
      style={{ backgroundImage: avatarGradient(name) }}
    >
      {initials(name)}
    </span>
  )
}

// Overlapping avatar stack
export function AvatarStack({ names = [], max = 3, size = 'sm' }) {
  const shown = names.slice(0, max)
  const extra = names.length - shown.length
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((n) => (
        <Avatar key={n} name={n} size={size} ring />
      ))}
      {extra > 0 && (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-100 text-xs font-semibold text-ink-500 ring-2 ring-white dark:bg-ink-800 dark:text-ink-300 dark:ring-ink-900">
          +{extra}
        </span>
      )}
    </div>
  )
}
