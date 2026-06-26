import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, Bell, Sun, Moon, ChevronDown, Command, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { useTheme } from '../context/ThemeContext'
import { useClickOutside } from '../lib/useClickOutside'
import Avatar from './Avatar'
import NotificationPanel from './NotificationPanel'
import ProfileDropdown from './ProfileDropdown'

const viewTitles = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  projects: 'Projects',
  customers: 'Customers',
  messages: 'Messages',
  calendar: 'Calendar',
  billing: 'Billing & Plans',
  profile: 'Profile',
}

export default function Topbar({
  activeView,
  onOpenMobile,
  search,
  onSearch,
  user,
  notifications,
  onMarkAllRead,
  onClearAll,
  onNotificationClick,
  onProfileSelect,
  onLogout,
}) {
  const { isDark, toggleTheme } = useTheme()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const notifRef = useRef(null)
  const profileRef = useRef(null)
  useClickOutside(notifRef, () => setNotifOpen(false), notifOpen)
  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen)

  const unread = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-200/70 bg-white/70 px-4 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-900/60 sm:px-6">
      {/* Mobile menu + title */}
      <button
        onClick={onOpenMobile}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden min-w-0 sm:block">
        <h1 className="truncate text-lg font-bold tracking-tight text-ink-900 dark:text-white">
          {viewTitles[activeView] ?? 'Dashboard'}
        </h1>
      </div>

      {/* Search */}
      <div className="relative ml-auto hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search anything…"
          className="input pl-10 pr-16"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-ink-200 bg-ink-50 px-1.5 py-0.5 text-[10px] font-semibold text-ink-400 dark:border-ink-700 dark:bg-ink-800 lg:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5 md:ml-0">
        {/* Mobile search icon */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800 md:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="grid h-10 w-10 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800"
          aria-label="Toggle theme"
        >
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="block"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.span>
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setNotifOpen((o) => !o)
              setProfileOpen(false)
            }}
            className={cn(
              'relative grid h-10 w-10 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800',
              notifOpen && 'bg-ink-100 dark:bg-ink-800',
            )}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 grid h-4 min-w-[1rem] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-ink-900">
                {unread}
              </span>
            )}
          </button>
          <NotificationPanel
            open={notifOpen}
            notifications={notifications}
            onMarkAllRead={onMarkAllRead}
            onClearAll={onClearAll}
            onItemClick={onNotificationClick}
          />
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative pl-1">
          <button
            onClick={() => {
              setProfileOpen((o) => !o)
              setNotifOpen(false)
            }}
            className={cn(
              'flex items-center gap-2 rounded-xl py-1 pl-1 pr-1.5 transition hover:bg-ink-100 dark:hover:bg-ink-800 sm:pr-2.5',
              profileOpen && 'bg-ink-100 dark:bg-ink-800',
            )}
          >
            <Avatar name={user.name} size="sm" />
            <span className="hidden text-left sm:block">
              <span className="block text-xs font-semibold leading-tight text-ink-800 dark:text-ink-100">
                {user.name}
              </span>
              <span className="block text-[11px] leading-tight text-ink-400">{user.role}</span>
            </span>
            <ChevronDown
              className={cn(
                'hidden h-4 w-4 text-ink-400 transition-transform sm:block',
                profileOpen && 'rotate-180',
              )}
            />
          </button>
          <ProfileDropdown
            open={profileOpen}
            user={user}
            onSelect={(id) => {
              setProfileOpen(false)
              onProfileSelect(id)
            }}
            onLogout={() => {
              setProfileOpen(false)
              onLogout()
            }}
          />
        </div>
      </div>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-0 flex h-16 items-center gap-2 border-b border-ink-200/70 bg-white px-4 dark:border-ink-800 dark:bg-ink-900 md:hidden"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                autoFocus
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search anything…"
                className="input pl-10"
              />
            </div>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 dark:hover:bg-ink-800"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
