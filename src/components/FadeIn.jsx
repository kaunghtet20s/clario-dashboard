import { motion } from 'framer-motion'

// Generic fade-up reveal used across page sections.
export default function FadeIn({ children, delay = 0, y = 20, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Section header with title + description.
export function PageHeader({ title, description, action }) {
  return (
    <FadeIn className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{description}</p>
        )}
      </div>
      {action}
    </FadeIn>
  )
}
