import { useUIStore } from './uiStore'

describe('uiStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useUIStore.setState({ filter: 'all', theme: 'light' })
  })

  it('sets filter', () => {
    useUIStore.getState().setFilter('in_progress')
    expect(useUIStore.getState().filter).toBe('in_progress')
  })

  it('toggles theme light to dark and back', () => {
    expect(useUIStore.getState().theme).toBe('light')
    useUIStore.getState().toggleTheme()
    expect(useUIStore.getState().theme).toBe('dark')
    useUIStore.getState().toggleTheme()
    expect(useUIStore.getState().theme).toBe('light')
  })

  it('sets theme explicitly', () => {
    useUIStore.getState().setTheme('dark')
    expect(useUIStore.getState().theme).toBe('dark')
  })
})
