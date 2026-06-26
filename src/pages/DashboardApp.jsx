import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import SettingsModal from '../components/SettingsModal'
import { useToast } from '../components/Toast'
import { useAuth } from '../context/AuthContext'
import { initialNotifications } from '../data/notifications'

import DashboardView from '../views/DashboardView'
import AnalyticsView from '../views/AnalyticsView'
import ProjectsView from '../views/ProjectsView'
import CustomersView from '../views/CustomersView'
import MessagesView from '../views/MessagesView'
import CalendarView from '../views/CalendarView'
import BillingView from '../views/BillingView'
import ProfileView from '../views/ProfileView'

const FALLBACK_USER = {
  name: 'Alex Morgan',
  email: 'alex@clario.io',
  role: 'Product Lead',
}

export default function DashboardApp() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user: authUser, logout } = useAuth()
  const user = authUser ?? FALLBACK_USER

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)

  const handleNavigate = (id) => {
    setActiveView(id)
    setMobileOpen(false)
  }

  // Reset scroll to the top whenever the active view changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeView])

  const handleLogout = () => {
    logout()
    toast({ title: 'Signed out', description: 'See you soon!', tone: 'info' })
    navigate('/login', { replace: true })
  }

  const handleProfileSelect = (id) => {
    if (id === 'settings') setSettingsOpen(true)
    else if (id === 'billing') setActiveView('billing')
    else if (id === 'profile') setActiveView('profile')
  }

  const handleSaveSettings = () => {
    setSettingsOpen(false)
    toast({ title: 'Settings saved', description: 'Your preferences were updated.', tone: 'success' })
  }

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  const clearAll = () => setNotifications([])
  const onNotificationClick = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))

  const renderView = () => {
    switch (activeView) {
      case 'analytics':
        return <AnalyticsView />
      case 'projects':
        return <ProjectsView onToast={toast} />
      case 'customers':
        return <CustomersView onToast={toast} />
      case 'messages':
        return <MessagesView onToast={toast} />
      case 'calendar':
        return <CalendarView onToast={toast} />
      case 'billing':
        return <BillingView onToast={toast} />
      case 'profile':
        return <ProfileView onToast={toast} />
      default:
        return <DashboardView onNavigate={handleNavigate} userName={user.name} />
    }
  }

  return (
    <div className="app-bg flex min-h-screen bg-ink-50 dark:bg-ink-950">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        activeView={activeView}
        onNavigate={handleNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onOpenSettings={() => setSettingsOpen(true)}
        onLogout={handleLogout}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          activeView={activeView}
          onOpenMobile={() => setMobileOpen(true)}
          search={search}
          onSearch={setSearch}
          user={user}
          notifications={notifications}
          onMarkAllRead={markAllRead}
          onClearAll={clearAll}
          onNotificationClick={onNotificationClick}
          onProfileSelect={handleProfileSelect}
          onLogout={handleLogout}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            {/* Keyed fade-up on mount. We intentionally avoid AnimatePresence
                mode="wait" here: views contain layoutId/animated children whose
                exit could deadlock the presence and freeze view switching. */}
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderView()}
            </motion.div>
            <Footer />
          </div>
        </main>
      </div>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSaveSettings}
      />
    </div>
  )
}
