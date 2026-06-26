// Projects table data
export const projects = [
  {
    id: 'PRJ-1042',
    name: 'Mobile App Redesign',
    client: 'Northwind Labs',
    status: 'In Progress',
    progress: 68,
    budget: 48000,
    dueDate: '2026-07-12',
    team: ['Ava Chen', 'Leo Park', 'Mia Torres'],
  },
  {
    id: 'PRJ-1039',
    name: 'Analytics Platform v2',
    client: 'Vertex Finance',
    status: 'In Progress',
    progress: 41,
    budget: 92000,
    dueDate: '2026-09-03',
    team: ['Noah Reed', 'Ivy Wu'],
  },
  {
    id: 'PRJ-1036',
    name: 'Marketing Site Revamp',
    client: 'Bloom & Co',
    status: 'Review',
    progress: 86,
    budget: 27500,
    dueDate: '2026-06-30',
    team: ['Sofia Ramos', 'Eli Stone'],
  },
  {
    id: 'PRJ-1031',
    name: 'Onboarding Automation',
    client: 'Pulse Health',
    status: 'Completed',
    progress: 100,
    budget: 35200,
    dueDate: '2026-06-08',
    team: ['Maya Singh', 'Jack Lee'],
  },
  {
    id: 'PRJ-1028',
    name: 'Billing Migration',
    client: 'Cobalt Systems',
    status: 'On Hold',
    progress: 22,
    budget: 61000,
    dueDate: '2026-08-19',
    team: ['Owen Hart'],
  },
  {
    id: 'PRJ-1024',
    name: 'AI Support Assistant',
    client: 'Lumen Retail',
    status: 'In Progress',
    progress: 54,
    budget: 78400,
    dueDate: '2026-07-28',
    team: ['Zoe Kim', 'Adam Frost', 'Rhea Patel'],
  },
  {
    id: 'PRJ-1019',
    name: 'Data Warehouse Setup',
    client: 'Vertex Finance',
    status: 'Review',
    progress: 73,
    budget: 54300,
    dueDate: '2026-07-05',
    team: ['Ivy Wu', 'Sam Diaz'],
  },
  {
    id: 'PRJ-1011',
    name: 'Design System Rollout',
    client: 'Bloom & Co',
    status: 'Completed',
    progress: 100,
    budget: 41800,
    dueDate: '2026-05-22',
    team: ['Sofia Ramos', 'Ava Chen'],
  },
]

export const projectStatuses = ['All', 'In Progress', 'Review', 'Completed', 'On Hold']

// Visual styling per status (Tailwind class fragments)
export const statusStyles = {
  'In Progress': 'bg-blue-50 text-blue-600 ring-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300',
  Review: 'bg-amber-50 text-amber-600 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300',
  Completed:
    'bg-emerald-50 text-emerald-600 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300',
  'On Hold': 'bg-rose-50 text-rose-600 ring-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300',
}
