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

  it('trims title and description', () => {
    useTaskStore.getState().addTask({
      title: '  Trimmed  ',
      description: '  desc  ',
      priority: 'medium',
    })
    const t = useTaskStore.getState().tasks[0]
    expect(t.title).toBe('Trimmed')
    expect(t.description).toBe('desc')
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

  it('moves a task to in progress', () => {
    useTaskStore.getState().addTask({
      title: 'WIP',
      description: '',
      priority: 'low',
    })
    const id = useTaskStore.getState().tasks[0].id
    useTaskStore.getState().setTaskStatus(id, 'in_progress')
    expect(useTaskStore.getState().tasks[0].status).toBe('in_progress')
  })

  it('ignores setTaskStatus for unknown id', () => {
    useTaskStore.getState().addTask({
      title: 'Stable',
      description: '',
      priority: 'low',
    })
    const before = useTaskStore.getState().tasks[0]
    useTaskStore.getState().setTaskStatus('no-such-id', 'completed')
    const after = useTaskStore.getState().tasks[0]
    expect(after).toEqual(before)
  })

  it('deletes a task by id', () => {
    useTaskStore.getState().addTask({
      title: 'A',
      description: '',
      priority: 'low',
    })
    useTaskStore.getState().addTask({
      title: 'B',
      description: '',
      priority: 'low',
    })
    const idA = useTaskStore.getState().tasks.find((t) => t.title === 'A')!.id

    useTaskStore.getState().deleteTask(idA)

    const titles = useTaskStore.getState().tasks.map((t) => t.title)
    expect(titles).toEqual(['B'])
  })
})
