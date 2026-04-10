import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { NewTaskInput, Task, TaskStatus } from '../features/tasks/types'

const STORAGE_KEY = 'soryal-task-manager:tasks'

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export interface TaskStoreState {
  tasks: Task[]
  addTask: (input: NewTaskInput) => void
  deleteTask: (id: string) => void
  setTaskStatus: (id: string, status: TaskStatus) => void
}

export const useTaskStore = create<TaskStoreState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (input) => {
        const task: Task = {
          id: createId(),
          title: input.title.trim(),
          description: input.description.trim(),
          priority: input.priority,
          status: 'pending',
          createdAt: Date.now(),
        }
        set((s) => ({ tasks: [task, ...s.tasks] }))
      },
      deleteTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      setTaskStatus: (id, status) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    },
  ),
)
