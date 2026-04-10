import type { TaskFilter, TaskStatus } from '../features/tasks/types'

export const COLUMN_ORDER: TaskStatus[] = [
  'pending',
  'in_progress',
  'completed',
]

export const COLUMN_LABELS: Record<TaskStatus, string> = {
  pending: 'Backlog',
  in_progress: 'In Progress',
  completed: 'Completed',
}

export function statusesVisibleForFilter(filter: TaskFilter): TaskStatus[] {
  if (filter === 'all') return COLUMN_ORDER
  return [filter]
}
