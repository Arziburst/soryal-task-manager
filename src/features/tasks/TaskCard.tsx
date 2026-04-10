import { useCallback } from 'react'
import { CheckCircle2, Inbox, PlayCircle, Trash2 } from 'lucide-react'
import type { Task, TaskStatus } from './types'
import { PRIORITY_LABELS, priorityClass } from './priorityStyles'
import { useTaskStore } from '../../store/taskStore'

interface TaskCardProps {
  task: Task
}

const iconBtnClass =
  'rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'

const deleteBtnClass =
  'rounded-lg p-2 text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/60'

export function TaskCard({ task }: TaskCardProps) {
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const setTaskStatus = useTaskStore((s) => s.setTaskStatus)

  const onDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData('text/task-id', task.id)
      e.dataTransfer.effectAllowed = 'move'
    },
    [task.id],
  )

  const moveTo = useCallback(
    (status: TaskStatus) => {
      setTaskStatus(task.id, status)
    },
    [setTaskStatus, task.id],
  )

  const stopDrag = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation()
  }

  const handleDelete = useCallback(() => {
    if (
      !confirm(
        'Delete this task? This action cannot be undone.',
      )
    )
      return
    deleteTask(task.id)
  }, [deleteTask, task.id])

  return (
    <article
      draggable
      onDragStart={onDragStart}
      className="cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm active:cursor-grabbing dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {task.title}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${priorityClass(task.priority)}`}
            >
              {PRIORITY_LABELS[task.priority]}
            </span>
          </div>
          {task.description ? (
            <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
              {task.description}
            </p>
          ) : null}
        </div>
        <div className="flex w-11 shrink-0 flex-col items-center self-stretch border-l border-slate-200 pl-3 dark:border-slate-700 sm:w-12">
          <div
            className="flex flex-1 flex-col items-center justify-center gap-1"
            role="group"
            aria-label="Change task status"
          >
            {task.status !== 'pending' ? (
              <button
                type="button"
                onClick={() => moveTo('pending')}
                onMouseDown={stopDrag}
                className={iconBtnClass}
                aria-label="Move to backlog"
              >
                <Inbox className="size-5" strokeWidth={2} aria-hidden />
              </button>
            ) : null}
            {task.status !== 'in_progress' ? (
              <button
                type="button"
                onClick={() => moveTo('in_progress')}
                onMouseDown={stopDrag}
                className={iconBtnClass}
                aria-label="Move to in progress"
              >
                <PlayCircle className="size-5" strokeWidth={2} aria-hidden />
              </button>
            ) : null}
            {task.status !== 'completed' ? (
              <button
                type="button"
                onClick={() => moveTo('completed')}
                onMouseDown={stopDrag}
                className={iconBtnClass}
                aria-label="Mark completed"
              >
                <CheckCircle2 className="size-5" strokeWidth={2} aria-hidden />
              </button>
            ) : null}
          </div>
          <button
            type="button"
            onClick={handleDelete}
            onMouseDown={stopDrag}
            className={`${deleteBtnClass} shrink-0`}
            aria-label="Delete task"
          >
            <Trash2 className="size-5" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </article>
  )
}
