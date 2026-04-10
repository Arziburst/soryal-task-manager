import { type FormEvent, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NewTaskInput, TaskPriority } from "./types";
import { useTaskStore } from "../../store/taskStore";

const PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

const initial: NewTaskInput = {
  title: "",
  description: "",
  priority: "medium",
};

interface AddTaskFormProps {
  onSuccess?: () => void;
  showHeading?: boolean;
  className?: string;
}

export function AddTaskForm({
  onSuccess,
  showHeading = true,
  className = "",
}: AddTaskFormProps) {
  const addTask = useTaskStore((s) => s.addTask);
  const [values, setValues] = useState<NewTaskInput>(initial);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.title.trim()) return;
    addTask({
      title: values.title,
      description: values.description,
      priority: values.priority,
    });
    setValues(initial);
    onSuccess?.();
  };

  return (
    <form onSubmit={onSubmit} className={className}>
      {showHeading ? (
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          New task
        </h2>
      ) : null}
      <div className={`grid gap-4 sm:grid-cols-2 ${showHeading ? "mt-4" : ""}`}>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Title
          </span>
          <input
            name="title"
            value={values.title}
            onChange={(e) =>
              setValues((v) => ({ ...v, title: e.target.value }))
            }
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-indigo-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Task title"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </span>
          <textarea
            name="description"
            value={values.description}
            onChange={(e) =>
              setValues((v) => ({ ...v, description: e.target.value }))
            }
            rows={3}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-indigo-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Details"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Priority
          </span>
          <div className="relative">
            <select
              name="priority"
              value={values.priority}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  priority: e.target.value as TaskPriority,
                }))
              }
              className="w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-10 text-slate-900 shadow-sm outline-none ring-indigo-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400"
              strokeWidth={2}
              aria-hidden
            />
          </div>
        </label>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 sm:w-auto"
          >
            Create task
          </button>
        </div>
      </div>
    </form>
  );
}
