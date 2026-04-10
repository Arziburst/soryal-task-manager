import { useEffect } from 'react'
import type { ThemeMode } from '../store/uiStore'

export function useThemeSync(theme: ThemeMode): void {
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])
}
