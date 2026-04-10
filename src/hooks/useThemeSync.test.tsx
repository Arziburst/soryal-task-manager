import { render } from '@testing-library/react'
import { useThemeSync } from './useThemeSync'

function Probed({ theme }: { theme: 'light' | 'dark' }) {
  useThemeSync(theme)
  return null
}

describe('useThemeSync', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('removes dark class for light theme', () => {
    document.documentElement.classList.add('dark')
    render(<Probed theme="light" />)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('adds dark class for dark theme', () => {
    render(<Probed theme="dark" />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('updates class when theme prop changes', () => {
    const { rerender } = render(<Probed theme="light" />)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    rerender(<Probed theme="dark" />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    rerender(<Probed theme="light" />)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
