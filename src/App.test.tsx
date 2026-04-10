import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { useTaskStore } from './store/taskStore'
import { useUIStore } from './store/uiStore'

async function openModalAndCreateTask(user: ReturnType<typeof userEvent.setup>, title: string) {
  await user.click(screen.getByRole('button', { name: /Add new task/i }))
  await user.type(screen.getByPlaceholderText('Task title'), title)
  await user.click(screen.getByRole('button', { name: /Create task/i }))
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    useTaskStore.setState({ tasks: [] })
    useUIStore.setState({ filter: 'all', theme: 'light' })
    document.documentElement.classList.remove('dark')
    jest.restoreAllMocks()
  })

  it('creates a task from the modal', async () => {
    const user = userEvent.setup()
    render(<App />)

    await openModalAndCreateTask(user, 'Modal task')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: /Modal task/i }),
    ).toBeInTheDocument()
  })

  it('persists selected priority on new task', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Add new task/i }))
    await user.type(screen.getByPlaceholderText('Task title'), 'Priority check')
    await user.selectOptions(screen.getByRole('combobox', { name: /Priority/i }), 'high')
    await user.click(screen.getByRole('button', { name: /Create task/i }))

    expect(screen.getByText('High')).toBeInTheDocument()
  })

  it('shows only the In Progress column when that filter is active', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'In progress' }))

    expect(
      screen.queryByRole('region', { name: /Backlog column/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: /In Progress column/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('region', { name: /Completed column/i }),
    ).not.toBeInTheDocument()
  })

  it('shows all three columns when filter is All', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'In progress' }))
    await user.click(screen.getByRole('button', { name: 'All' }))

    expect(
      screen.getByRole('region', { name: /Backlog column/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: /In Progress column/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: /Completed column/i }),
    ).toBeInTheDocument()
  })

  it('toggles dark class on document via theme control', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getByRole('button', { name: /Switch to dark mode/i }),
    )
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    await user.click(
      screen.getByRole('button', { name: /Switch to light mode/i }),
    )
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('moves task to completed via Mark completed', async () => {
    const user = userEvent.setup()
    render(<App />)

    await openModalAndCreateTask(user, 'Finish me')

    await user.click(
      screen.getByRole('button', { name: /Mark completed/i }),
    )

    const completed = screen.getByRole('region', { name: /Completed column/i })
    expect(
      within(completed).getByRole('heading', { name: /Finish me/i }),
    ).toBeInTheDocument()
  })

  it('does not delete when confirm is dismissed', async () => {
    const user = userEvent.setup()
    jest.spyOn(window, 'confirm').mockReturnValue(false)
    render(<App />)

    await openModalAndCreateTask(user, 'Keep me')

    await user.click(screen.getByRole('button', { name: /Delete task/i }))

    expect(
      screen.getByRole('heading', { name: /Keep me/i }),
    ).toBeInTheDocument()
  })

  it('deletes task when confirm is accepted', async () => {
    const user = userEvent.setup()
    jest.spyOn(window, 'confirm').mockReturnValue(true)
    render(<App />)

    await openModalAndCreateTask(user, 'Remove me')

    await user.click(screen.getByRole('button', { name: /Delete task/i }))

    expect(
      screen.queryByRole('heading', { name: /Remove me/i }),
    ).not.toBeInTheDocument()
  })
})
