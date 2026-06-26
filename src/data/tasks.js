// Kanban board seed data — grouped by column id
export const kanbanColumns = [
  { id: 'todo', title: 'To Do', accent: 'text-ink-500', dot: 'bg-ink-400' },
  { id: 'progress', title: 'In Progress', accent: 'text-blue-500', dot: 'bg-blue-500' },
  { id: 'review', title: 'Review', accent: 'text-amber-500', dot: 'bg-amber-500' },
  { id: 'done', title: 'Completed', accent: 'text-emerald-500', dot: 'bg-emerald-500' },
]

export const initialTasks = {
  todo: [
    {
      id: 't1',
      title: 'Draft Q3 product roadmap',
      priority: 'High',
      assignee: 'Ava Chen',
      due: 'Jul 2',
      tag: 'Planning',
    },
    {
      id: 't2',
      title: 'Audit onboarding email flow',
      priority: 'Low',
      assignee: 'Leo Park',
      due: 'Jul 6',
      tag: 'Growth',
    },
    {
      id: 't3',
      title: 'Collect NPS survey feedback',
      priority: 'Medium',
      assignee: 'Mia Torres',
      due: 'Jul 9',
      tag: 'Research',
    },
  ],
  progress: [
    {
      id: 't4',
      title: 'Build analytics export API',
      priority: 'High',
      assignee: 'Noah Reed',
      due: 'Jun 28',
      tag: 'Backend',
    },
    {
      id: 't5',
      title: 'Refactor billing webhooks',
      priority: 'Medium',
      assignee: 'Owen Hart',
      due: 'Jun 30',
      tag: 'Payments',
    },
  ],
  review: [
    {
      id: 't6',
      title: 'Marketing site hero section',
      priority: 'Medium',
      assignee: 'Sofia Ramos',
      due: 'Jun 27',
      tag: 'Design',
    },
  ],
  done: [
    {
      id: 't7',
      title: 'Dark mode design tokens',
      priority: 'Low',
      assignee: 'Eli Stone',
      due: 'Jun 20',
      tag: 'Design',
    },
    {
      id: 't8',
      title: 'Migrate auth to v2',
      priority: 'High',
      assignee: 'Zoe Kim',
      due: 'Jun 18',
      tag: 'Security',
    },
  ],
}

export const priorityStyles = {
  High: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300',
  Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
  Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
}
