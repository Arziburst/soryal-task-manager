import type { TaskPriority } from './types'

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export function priorityClass(priority: TaskPriority): string {
  switch (priority) {
    case 'high':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
    case 'medium':
      return 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
    case 'low':
    default:
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
  }
}
