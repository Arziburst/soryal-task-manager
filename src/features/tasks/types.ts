export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskStatus = 'pending' | 'in_progress' | 'completed'

export type TaskFilter = 'all' | 'in_progress' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  createdAt: number
}

export interface NewTaskInput {
  title: string
  description: string
  priority: TaskPriority
}
