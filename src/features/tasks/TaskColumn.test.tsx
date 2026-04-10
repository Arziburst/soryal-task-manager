import { fireEvent, render, screen } from '@testing-library/react'
import type { Task } from './types'
import { TaskColumn } from './TaskColumn'
import { useTaskStore } from '../../store/taskStore'

function mockDataTransfer(taskId: string) {
  return {
    getData: (format: string) =>
      format === 'text/task-id' ? taskId : '',
    dropEffect: 'move',
    effectAllowed: 'move',
  }
}

describe('TaskColumn', () => {
  beforeEach(() => {
    localStorage.clear()
    useTaskStore.setState({ tasks: [] })
  })

  it('updates task status on drop with task id', () => {
    const task: Task = {
      id: 'task-drop-1',
      title: 'Drag target',
      description: '',
      priority: 'low',
      status: 'pending',
      createdAt: 1,
    }
    useTaskStore.setState({ tasks: [task] })

    render(<TaskColumn status="completed" title="Completed" />)

    const region = screen.getByRole('region', { name: /Completed column/i })
    fireEvent.drop(region, {
      dataTransfer: mockDataTransfer('task-drop-1'),
    })

    expect(useTaskStore.getState().tasks[0].status).toBe('completed')
  })
})
