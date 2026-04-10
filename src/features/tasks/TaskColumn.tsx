import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import type { TaskStatus } from './types'
import { TaskCard } from './TaskCard'
import { useTaskStore } from '../../store/taskStore'

interface TaskColumnProps {
  status: TaskStatus
  title: string
}

export function TaskColumn({ status, title }: TaskColumnProps) {
  const tasks = useTaskStore(
    useShallow((s) => s.tasks.filter((t) => t.status === status)),
  )
  const setTaskStatus = useTaskStore((s) => s.setTaskStatus)

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const id = e.dataTransfer.getData('text/task-id')
      if (id) setTaskStatus(id, status)
    },
    [setTaskStatus, status],
  )

  return (
    <section
      className="flex min-h-[200px] flex-1 flex-col rounded-2xl border border-dashed border-slate-300 bg-slate-100/60 p-3 dark:border-slate-600 dark:bg-slate-900/40"
      onDragOver={onDragOver}
      onDrop={onDrop}
      aria-label={`${title} column`}
    >
      <header className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
          {title}
        </h2>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
          {tasks.length}
        </span>
      </header>
      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="rounded-lg border border-slate-200/80 bg-white/50 px-3 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950/30 dark:text-slate-500">
            Drop tasks here
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </section>
  )
}
