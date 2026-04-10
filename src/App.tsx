import { useState } from "react";
import { ThemeToggle } from "./components/ThemeToggle";
import { AddTaskModal } from "./features/tasks/AddTaskModal";
import { KanbanBoard } from "./features/tasks/KanbanBoard";
import { TaskFilterBar } from "./features/tasks/TaskFilterBar";
import { useThemeSync } from "./hooks/useThemeSync";
import { useUIStore } from "./store/uiStore";

function App() {
  const theme = useUIStore((s) => s.theme);
  useThemeSync(theme);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Task board
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Kanban-style task manager with local persistence
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Add new task
          </button>
          <ThemeToggle />
        </div>
      </header>

      <AddTaskModal open={addOpen} onClose={() => setAddOpen(false)} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <TaskFilterBar />
      </div>

      <KanbanBoard />
    </div>
  );
}

export default App;
