import { Heart } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-ink-200/70 py-5 text-sm text-ink-500 dark:border-ink-800 dark:text-ink-400 sm:flex-row">
      <p className="flex items-center gap-1.5">
        © {year} Clario, Inc. Made with
        <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
        for modern teams.
      </p>
      <div className="flex items-center gap-5">
        <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-semibold text-ink-500 dark:bg-ink-800 dark:text-ink-300">
          v1.0.0
        </span>
        <a href="#" className="transition hover:text-ink-800 dark:hover:text-ink-100">
          Privacy
        </a>
        <a href="#" className="transition hover:text-ink-800 dark:hover:text-ink-100">
          Terms
        </a>
      </div>
    </footer>
  )
}
