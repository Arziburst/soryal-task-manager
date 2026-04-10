import type { TaskFilter } from './types'
import { useUIStore } from '../../store/uiStore'

const OPTIONS: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
]

export function TaskFilterBar() {
  const filter = useUIStore((s) => s.filter)
  const setFilter = useUIStore((s) => s.setFilter)

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter tasks by status"
    >
      {OPTIONS.map((opt) => {
        const active = filter === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active
                ? 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-500'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
