// Notification panel seed data
export const initialNotifications = [
  {
    id: 1,
    icon: 'CreditCard',
    title: 'New payment received',
    body: 'Quantum Grid paid $1,290.00 for the Enterprise plan.',
    time: '5 min ago',
    read: false,
    tone: 'emerald',
  },
  {
    id: 2,
    icon: 'UserPlus',
    title: 'New team member',
    body: 'Hana Kim accepted your invitation to Drift Studio.',
    time: '20 min ago',
    read: false,
    tone: 'indigo',
  },
  {
    id: 3,
    icon: 'AlertTriangle',
    title: 'Usage limit warning',
    body: 'Vertex Finance is at 92% of their API quota.',
    time: '1 hour ago',
    read: false,
    tone: 'amber',
  },
  {
    id: 4,
    icon: 'MessageSquare',
    title: 'New message from Lena',
    body: '“Can we review the marketing site before Friday?”',
    time: '2 hours ago',
    read: true,
    tone: 'blue',
  },
  {
    id: 5,
    icon: 'CheckCircle2',
    title: 'Project completed',
    body: 'Onboarding Automation was marked as completed.',
    time: 'Yesterday',
    read: true,
    tone: 'violet',
  },
]

export const notificationToneStyles = {
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300',
}
