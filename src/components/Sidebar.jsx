import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  MessageSquare,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  X,
} from 'lucide-react'
import { cn } from '../lib/utils'

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

function Logo({ collapsed }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
          <path
            d="M5 15l4-6 3 4 5-7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap text-lg font-extrabold tracking-tight text-ink-900 dark:text-white"
          >
            Clario
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavList({ collapsed, activeView, onNavigate }) {
  return (
    <nav className="flex-1 space-y-1 px-3">
      {navItems.map((item) => {
        const active = activeView === item.id
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            title={collapsed ? item.label : undefined}
            className={cn(
              'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'text-brand-700 dark:text-white'
                : 'text-ink-500 hover:bg-ink-100/70 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800/60 dark:hover:text-ink-100',
              collapsed && 'justify-center',
            )}
          >
            {active && (
              <motion.span
                layoutId="active-nav"
                className="absolute inset-0 -z-0 rounded-xl bg-brand-50 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:ring-brand-500/20"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <Icon
              className={cn(
                'relative z-10 h-5 w-5 shrink-0 transition-colors',
                active ? 'text-brand-600 dark:text-brand-300' : '',
              )}
            />
            {!collapsed && (
              <span className="relative z-10 flex-1 truncate text-left">{item.label}</span>
            )}
            {!collapsed && item.badge && (
              <span className="relative z-10 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-brand-600 px-1.5 text-[11px] font-bold text-white">
                {item.badge}
              </span>
            )}
            {collapsed && item.badge && (
              <span className="absolute right-1.5 top-1.5 z-10 h-2 w-2 rounded-full bg-brand-600 ring-2 ring-white dark:ring-ink-900" />
            )}
          </button>
        )
      })}
    </nav>
  )
}

function Footer({ collapsed, onOpenSettings, onLogout }) {
  return (
    <div className="space-y-1 border-t border-ink-200/70 px-3 py-3 dark:border-ink-800">
      <button
        onClick={onOpenSettings}
        title={collapsed ? 'Settings' : undefined}
        className={cn(
          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-100/70 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800/60 dark:hover:text-ink-100',
          collapsed && 'justify-center',
        )}
      >
        <Settings className="h-5 w-5 shrink-0" />
        {!collapsed && <span>Settings</span>}
      </button>
      <button
        onClick={onLogout}
        title={collapsed ? 'Logout' : undefined}
        className={cn(
          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10',
          collapsed && 'justify-center',
        )}
      >
        <LogOut className="h-5 w-5 shrink-0" />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  )
}

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  activeView,
  onNavigate,
  mobileOpen,
  onCloseMobile,
  onOpenSettings,
  onLogout,
}) {
  const inner = (showCollapseBtn, isCollapsed) => (
    <>
      <div className="flex h-16 items-center justify-between px-4">
        <Logo collapsed={isCollapsed} />
        {showCollapseBtn ? (
          <button
            onClick={onToggleCollapse}
            className="hidden rounded-lg p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800 dark:hover:text-ink-200 lg:block"
            aria-label="Toggle sidebar"
          >
            <motion.span animate={{ rotate: isCollapsed ? 180 : 0 }} className="block">
              <ChevronLeft className="h-4 w-4" />
            </motion.span>
          </button>
        ) : (
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-800 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <NavList collapsed={isCollapsed} activeView={activeView} onNavigate={onNavigate} />
      <Footer collapsed={isCollapsed} onOpenSettings={onOpenSettings} onLogout={onLogout} />
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 264 }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        className="sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-ink-200/70 bg-white/80 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-900/70 lg:flex"
      >
        {inner(true, collapsed)}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 38 }}
              className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
            >
              {inner(false, false)}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
