# Soryal Task Manager

A production-style Kanban task board built with React 18, TypeScript, Zustand, and Tailwind CSS. Tasks support title, description, and priority (low / medium / high), can move across **Backlog**, **In Progress**, and **Completed** columns via drag-and-drop or quick actions, and persist in `localStorage`. Theme (light / dark) uses Tailwind’s `dark` class strategy and is remembered locally.

## Setup

```bash
npm install
npm run dev
```

(Optional: `npm test` for unit tests, `npm run build` for production build.)

## Tech stack

- **React 19** (hooks only) with **TypeScript**
- **Zustand** for tasks and UI preferences, with **persist** syncing to `localStorage`
- **Tailwind CSS v4** via the Vite plugin (`@tailwindcss/vite`)
- **Lucide React** for icons
- **Jest** + **Testing Library** for unit tests

## Features

- Three-column Kanban: Backlog, In Progress, Completed
- Add tasks via a modal (title, description, priority)
- Mark complete (and move between columns) via buttons or native HTML5 drag-and-drop
- Delete tasks
- Filters: All, In progress, Completed (controls which columns are visible)
- Responsive, mobile-first layout (columns stack on small screens)
- Light / dark mode toggle with persisted preference

## Project structure

- `src/components/` — shared UI (e.g. theme toggle)
- `src/features/tasks/` — task domain UI (board, columns, cards, form, filters)
- `src/store/` — Zustand stores (`taskStore`, `uiStore`)
- `src/hooks/` — e.g. syncing theme class on `document.documentElement`
- `src/utils/` — column labels and filter helpers
