import { useCallback, useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import { AddTaskForm } from './AddTaskForm'

interface AddTaskModalProps {
  open: boolean
  onClose: () => void
}

export function AddTaskModal({ open, onClose }: AddTaskModalProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', onKeyDown)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prev
    }
  }, [open, onKeyDown])

  useEffect(() => {
    if (open) panelRef.current?.querySelector('input')?.focus()
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2
            id={titleId}
            className="text-lg font-semibold text-slate-900 dark:text-slate-100"
          >
            New task
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={2} aria-hidden />
          </button>
        </div>
        <AddTaskForm
          showHeading={false}
          onSuccess={onClose}
          className="block"
        />
      </div>
    </div>
  )
}
