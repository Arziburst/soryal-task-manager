import { useUIStore } from '../../store/uiStore'
import { COLUMN_LABELS, statusesVisibleForFilter } from '../../utils/taskColumns'
import { TaskColumn } from './TaskColumn'

export function KanbanBoard() {
  const filter = useUIStore((s) => s.filter)
  const statuses = statusesVisibleForFilter(filter)

  return (
    <div
      className={`grid gap-4 ${
        statuses.length === 1
          ? 'grid-cols-1'
          : statuses.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
      }`}
    >
      {statuses.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          title={COLUMN_LABELS[status]}
        />
      ))}
    </div>
  )
}
