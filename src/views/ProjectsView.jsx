import { useState } from 'react'
import { Plus } from 'lucide-react'
import ProjectTable from '../components/ProjectTable'
import KanbanBoard from '../components/KanbanBoard'
import AddProjectModal from '../components/AddProjectModal'
import FadeIn, { PageHeader } from '../components/FadeIn'
import { projects as seedProjects } from '../data/projects'

export default function ProjectsView({ onToast }) {
  const [projects, setProjects] = useState(seedProjects)
  const [addOpen, setAddOpen] = useState(false)

  const handleCreate = (project) => {
    setProjects((prev) => [project, ...prev])
    onToast({ title: 'Project created', description: project.name, tone: 'success' })
  }

  const handleProjectAction = (action, project) => {
    if (action === 'delete') {
      setProjects((prev) => prev.filter((p) => p.id !== project.id))
      onToast({ title: 'Project deleted', description: project.name, tone: 'warning' })
      return
    }
    if (action === 'complete') {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, status: 'Completed', progress: 100 } : p)),
      )
      onToast({ title: 'Marked complete', description: project.name, tone: 'success' })
      return
    }
    const labels = { view: `Opening “${project.name}”`, edit: `Editing “${project.name}”` }
    onToast({ title: labels[action] ?? 'Action performed', description: project.client, tone: 'info' })
  }

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Track delivery, budgets, and team workload."
        action={
          <button onClick={() => setAddOpen(true)} className="btn-primary">
            <Plus className="h-4 w-4" />
            New project
          </button>
        }
      />

      <FadeIn>
        <ProjectTable projects={projects} onAction={handleProjectAction} />
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8">
        <h3 className="mb-4 text-lg font-bold tracking-tight text-ink-900 dark:text-white">
          Task Board
        </h3>
        <KanbanBoard
          onMove={(col) =>
            onToast({ title: 'Task moved', description: `Moved to ${col}`, tone: 'success' })
          }
        />
      </FadeIn>

      <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onCreate={handleCreate} />
    </div>
  )
}
