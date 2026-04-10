import { COLUMN_ORDER, statusesVisibleForFilter } from './taskColumns'

describe('statusesVisibleForFilter', () => {
  it('returns all column statuses for filter all', () => {
    expect(statusesVisibleForFilter('all')).toEqual(COLUMN_ORDER)
  })

  it('returns only in_progress for that filter', () => {
    expect(statusesVisibleForFilter('in_progress')).toEqual(['in_progress'])
  })

  it('returns only completed for that filter', () => {
    expect(statusesVisibleForFilter('completed')).toEqual(['completed'])
  })
})
