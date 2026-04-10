import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TaskFilter } from '../features/tasks/types'

const STORAGE_KEY = 'soryal-task-manager:ui'

export type ThemeMode = 'light' | 'dark'

export interface UIStoreState {
  filter: TaskFilter
  theme: ThemeMode
  setFilter: (filter: TaskFilter) => void
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

export const useUIStore = create<UIStoreState>()(
  persist(
    (set) => ({
      filter: 'all',
      theme: 'light',
      setFilter: (filter) => set({ filter }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
