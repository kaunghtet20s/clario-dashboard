import { forwardRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Calendar, GripVertical } from 'lucide-react'
import { cn } from '../lib/utils'
import { kanbanColumns, initialTasks, priorityStyles } from '../data/tasks'
import Avatar from './Avatar'

const TaskCard = forwardRef(function TaskCard(
  { task, columnId, onDragStart, onDragEnd, dragging },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      layout
      layoutId={task.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: dragging ? 0.4 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      draggable
      onDragStart={() => onDragStart(task.id, columnId)}
      onDragEnd={onDragEnd}
      whileHover={{ y: -2 }}
      className="group cursor-grab rounded-xl border border-ink-200/70 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-soft active:cursor-grabbing dark:border-ink-800 dark:bg-ink-900"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            'rounded-md px-2 py-0.5 text-[11px] font-bold',
            priorityStyles[task.priority],
          )}
        >
          {task.priority}
        </span>
        <GripVertical className="h-4 w-4 text-ink-300 opacity-0 transition group-hover:opacity-100 dark:text-ink-600" />
      </div>

      <p className="mt-2 text-sm font-semibold leading-snug text-ink-800 dark:text-ink-100">
        {task.title}
      </p>

      <span className="mt-2 inline-block rounded-md bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-500 dark:bg-ink-800 dark:text-ink-300">
        {task.tag}
      </span>

      <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-2.5 dark:border-ink-800">
        <div className="flex items-center gap-1.5 text-xs text-ink-400">
          <Calendar className="h-3.5 w-3.5" />
          {task.due}
        </div>
        <Avatar name={task.assignee} size="xs" />
      </div>
    </motion.div>
  )
})

export default function KanbanBoard({ onMove }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [dragged, setDragged] = useState(null) // { id, from }
  const [overCol, setOverCol] = useState(null)

  const handleDragStart = (id, from) => setDragged({ id, from })
  const handleDragEnd = () => {
    setDragged(null)
    setOverCol(null)
  }

  const handleDrop = (toCol) => {
    if (!dragged) return
    const { id, from } = dragged
    if (from === toCol) {
      setOverCol(null)
      return
    }
    setTasks((prev) => {
      const task = prev[from].find((t) => t.id === id)
      if (!task) return prev
      return {
        ...prev,
        [from]: prev[from].filter((t) => t.id !== id),
        [toCol]: [task, ...prev[toCol]],
      }
    })
    const colTitle = kanbanColumns.find((c) => c.id === toCol)?.title
    onMove?.(colTitle)
    setOverCol(null)
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kanbanColumns.map((col) => {
        const items = tasks[col.id]
        const isOver = overCol === col.id
        return (
          <div
            key={col.id}
            onDragOver={(e) => {
              e.preventDefault()
              if (overCol !== col.id) setOverCol(col.id)
            }}
            onDragLeave={(e) => {
              // only clear if leaving the column entirely
              if (!e.currentTarget.contains(e.relatedTarget)) setOverCol(null)
            }}
            onDrop={() => handleDrop(col.id)}
            className={cn(
              'flex flex-col rounded-2xl border border-dashed p-3 transition-colors',
              isOver
                ? 'border-brand-400 bg-brand-50/60 dark:border-brand-500/50 dark:bg-brand-500/10'
                : 'border-ink-200/70 bg-ink-100/40 dark:border-ink-800 dark:bg-ink-900/40',
            )}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={cn('h-2.5 w-2.5 rounded-full', col.dot)} />
                <h3 className="text-sm font-bold text-ink-800 dark:text-ink-100">{col.title}</h3>
                <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-white px-1.5 text-xs font-semibold text-ink-500 dark:bg-ink-800 dark:text-ink-300">
                  {items.length}
                </span>
              </div>
              <button
                className="grid h-6 w-6 place-items-center rounded-lg text-ink-400 transition hover:bg-white hover:text-ink-700 dark:hover:bg-ink-800"
                aria-label={`Add task to ${col.title}`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex min-h-[120px] flex-1 flex-col gap-2.5">
              <AnimatePresence mode="popLayout">
                {items.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    columnId={col.id}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    dragging={dragged?.id === task.id}
                  />
                ))}
              </AnimatePresence>
              {items.length === 0 && (
                <div className="grid flex-1 place-items-center rounded-xl text-xs text-ink-400">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
