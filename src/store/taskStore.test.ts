import { useTaskStore } from './taskStore'

describe('taskStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useTaskStore.setState({ tasks: [] })
  })

  it('adds a task with pending status', () => {
    useTaskStore.getState().addTask({
      title: 'Write tests',
      description: 'Cover store actions',
      priority: 'high',
    })

    const tasks = useTaskStore.getState().tasks
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('Write tests')
    expect(tasks[0].description).toBe('Cover store actions')
    expect(tasks[0].priority).toBe('high')
    expect(tasks[0].status).toBe('pending')
    expect(tasks[0].id).toBeDefined()
  })

  it('moves a task to completed', () => {
    useTaskStore.getState().addTask({
      title: 'Ship feature',
      description: '',
      priority: 'medium',
    })
    const id = useTaskStore.getState().tasks[0].id

    useTaskStore.getState().setTaskStatus(id, 'completed')

    const updated = useTaskStore.getState().tasks[0]
    expect(updated.status).toBe('completed')
  })
})
