# FlowBoard — Responsive Kanban Task Board

A production-ready Kanban board built with **React**, **Redux Toolkit**, **React Router**, **Tailwind CSS**, and **localStorage** persistence. FlowBoard gives teams a focused three-column workflow for planning, tracking, and shipping work — with drag-and-drop status changes, live search, priority filters, dark mode, and a fully responsive layout.

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764abc?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-ca4245?logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Creating the Project From Scratch](#creating-the-project-from-scratch)
- [Tailwind CSS Configuration](#tailwind-css-configuration)
- [Available Scripts](#available-scripts)
- [State Architecture](#state-architecture)
  - [Store Shape](#store-shape)
  - [Slice Responsibilities](#slice-responsibilities)
  - [Data Model](#data-model)
  - [localStorage Persistence Lifecycle](#localstorage-persistence-lifecycle)
  - [Ordering and Drag-and-Drop](#ordering-and-drag-and-drop)
  - [Derived Data and Filtering](#derived-data-and-filtering)
- [Feature Behaviour](#feature-behaviour)
- [Customization Guide](#customization-guide)
  - [Adding or Renaming Columns](#adding-or-renaming-columns)
  - [Adding Priority Levels](#adding-priority-levels)
  - [Changing the Theme and Branding](#changing-the-theme-and-branding)
  - [Changing Seed / Demo Data](#changing-seed--demo-data)
  - [Storage Keys and Schema Migrations](#storage-keys-and-schema-migrations)
  - [Adding a New Task Field](#adding-a-new-task-field)
  - [Swapping localStorage for a REST API](#swapping-localstorage-for-a-rest-api)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)
- [Performance Notes](#performance-notes)
- [Privacy and Security](#privacy-and-security)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Manual QA Checklist](#manual-qa-checklist)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

FlowBoard is a single-page application that models a classic Kanban workflow with three columns:

| Column | Purpose |
| --- | --- |
| **Todo** | Work that has not started yet |
| **In Progress** | Work that is actively moving |
| **Completed** | Work that is done and dusted |

Tasks can be created, edited, moved between columns, reordered, searched, filtered, and deleted. Every change is written to `localStorage`, so the board survives a browser refresh with no backend required. On first run the app seeds a small demo board so the experience is immediately explorable; the seed data can be removed or replaced in one file.

The project is intentionally organised around small, composable modules: configuration constants, Redux slices, custom hooks, reusable UI components, layout wrappers, route configuration, and pages. It is designed to be used as a reference implementation for a React + Redux + Tailwind application, or as a starting point for a real product board.

---

## Key Features

### Board and task management

- Three fixed workflow columns: **Todo**, **In Progress**, and **Completed**.
- Create tasks with a title, description, priority, status, and due date.
- Edit tasks through a pre-populated modal form.
- Delete tasks behind an explicit confirmation dialog.
- Move tasks between columns with:
  - native HTML5 drag and drop (including insertion at a precise position);
  - previous/next column controls on each card for touch devices and keyboard users;
  - the status field inside the edit modal.
- Reorder tasks within a column by dragging.
- Overdue and due-today date highlighting.

### Search, filters, and empty states

- Live title search with a 200 ms debounce.
- Filter by priority: **All**, **Low**, **Medium**, **High**.
- Filter by status: **All**, **Todo**, **In Progress**, **Completed**.
- Combined search + priority + status filtering.
- Filter-aware column counts and a live result summary (`Showing 4 of 7 tasks`).
- Dedicated empty states for:
  - a completely empty board;
  - no search/filter matches;
  - an individual column with no matching tasks.
- One-click reset for all filters.

### Persistence and UX

- Automatic persistence to `localStorage` on every task mutation.
- Defensive hydration: corrupt or partially invalid data is sanitised instead of crashing the app.
- Seeded demo board on first run only.
- Light/dark theme toggle, persisted and synchronised across tabs.
- System theme preference respected on first visit.
- Inline theme script prevents a flash of the wrong theme on page load.
- Responsive layout for mobile, tablet, and desktop.
- Accessible modal with focus management, focus trapping, Escape-to-close, and body scroll locking.
- Visible focus rings and descriptive ARIA labels throughout.
- Statistics strip for total, in-progress, completed, and overdue tasks.

---

## Tech Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| [React](https://react.dev/) | 19 | Component-based UI |
| [Vite](https://vite.dev/) | 7 | Development server and production bundler |
| [Redux Toolkit](https://redux-toolkit.js.org/) | 2 | Task and filter state management |
| [React Redux](https://react-redux.js.org/) | 9 | React bindings for the store |
| [React Router](https://reactrouter.com/) | 7 | SPA routing (`createBrowserRouter`, `RouterProvider`) |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling, dark mode, design tokens |
| [Lucide React](https://lucide.dev/) | 1 | Icon set |
| ESLint | 9 | Static analysis and code-quality checks |

> React Router 7 is used through its stable `createBrowserRouter` API, which is compatible with the React Router v6.4+ data-router model.

---

## Folder Structure

```text
kanban board/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/                  # Reusable presentation components
│   │   ├── Badge.jsx                # Priority pill with optional dot/icon
│   │   ├── BoardStats.jsx           # Total / in-progress / completed / overdue
│   │   ├── Button.jsx               # Polymorphic button (button, Link, ...)
│   │   ├── Column.jsx               # Column shell, drop zone, empty state
│   │   ├── ConfirmDialog.jsx        # Delete confirmation
│   │   ├── EmptyState.jsx           # Shared empty-state panel
│   │   ├── FilterBar.jsx            # Priority + status selects, reset
│   │   ├── Modal.jsx                # Portal, focus trap, scroll lock
│   │   ├── SearchBar.jsx            # Live search input
│   │   ├── TaskCard.jsx             # Draggable task card and card actions
│   │   └── TaskModal.jsx            # Create/edit task form and validation
│   ├── config/
│   │   ├── constants.js             # Columns, priorities, storage keys, limits
│   │   └── seedData.js              # First-run demo tasks
│   ├── hooks/
│   │   ├── useDebounce.js           # Debounced value helper
│   │   ├── useKanbanFilters.js      # Derived filtered tasks, columns, stats
│   │   ├── useLocalStorage.js       # localStorage state + cross-tab sync
│   │   └── useTheme.js              # Theme state and document side effects
│   ├── layouts/
│   │   ├── Footer.jsx
│   │   ├── MainLayout.jsx           # Navbar + background + Outlet + footer
│   │   └── Navbar.jsx               # Branding, board link, theme toggle
│   ├── pages/
│   │   ├── BoardPage.jsx            # Main dashboard and modal orchestration
│   │   └── NotFound.jsx             # 404 route
│   ├── redux/
│   │   ├── filterSlice.js           # Search, priority, status
│   │   ├── kanbanSlice.js           # Task CRUD, moves, ordering
│   │   └── store.js                 # Store creation + persistence subscriber
│   ├── router/
│   │   ├── AppRouter.jsx            # createBrowserRouter + RouterProvider
│   │   └── routes.jsx               # Route definitions
│   ├── utils/
│   │   ├── date.js                  # Due-date parsing and formatting
│   │   └── task.js                  # ID generation and hydration sanitising
│   ├── App.jsx
│   ├── index.css                    # Tailwind import, theme tokens, base styles
│   └── main.jsx                     # React root + Redux Provider
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── vite.config.js
└── README.md
```

---

## Prerequisites

- **Node.js 20.19+** or **22.12+** (required by Vite 7).
- **npm 10+** (or a compatible package manager such as pnpm/yarn).
- A modern evergreen browser (Chrome, Edge, Firefox, Safari).
- No database, API key, or backend is required.

Check your versions:

```bash
node --version
npm --version
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd "kanban board"
```

If your checkout directory has a different name, use that name instead.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Vite provides hot module replacement, so edits appear without a full reload.

### 4. Build for production

```bash
npm run build
```

The optimised static bundle is written to `dist/`.

### 5. Preview the production build

```bash
npm run preview
```

### 6. Run linting

```bash
npm run lint
```

> The project is client-side only. There are no environment variables to configure.

---

## Creating the Project From Scratch

If you want to reproduce this setup in a new folder, run:

```bash
# 1. Scaffold a React app with Vite
npm create vite@latest flowboard -- --template react

# 2. Enter the project
cd flowboard

# 3. Install base dependencies
npm install

# 4. Install application dependencies
npm install @reduxjs/toolkit react-redux react-router-dom lucide-react

# 5. Install Tailwind CSS v4 and its Vite plugin
npm install -D tailwindcss @tailwindcss/vite
```

Then wire Tailwind into Vite (see the next section) and copy the `src/` structure from this repository.

---

## Tailwind CSS Configuration

This project uses **Tailwind CSS v4**, which is configured through the Vite plugin and CSS-first design tokens. A `tailwind.config.js` file is **not** required.

### `vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### `src/index.css`

```css
@import "tailwindcss";

/* Class-based dark mode: <html class="dark"> */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --color-brand-50: #eef2ff;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;

  --animate-fade-in: fade-in 150ms ease-out;
  --animate-scale-in: scale-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

The full palette, base styles, custom scrollbar, and keyframes live in `src/index.css`. Dark mode is class-based, toggled by adding or removing `.dark` on `<html>`.

If you are using Tailwind CSS v3 instead, initialise `tailwind.config.js`, add the `./index.html` and `./src/**/*.{js,jsx}` content globs, enable `darkMode: 'class'`, and add the `@tailwind` directives instead of `@import "tailwindcss"`.

---

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `npm run dev` | Start the Vite development server with HMR |
| `build` | `npm run build` | Create an optimised production build in `dist/` |
| `preview` | `npm run preview` | Serve the production build locally |
| `lint` | `npm run lint` | Run ESLint over the repository |

---

## State Architecture

FlowBoard keeps **server-like state** (tasks) and **UI filter state** in Redux, while transient form/modal state stays local to the page that owns it. Persistence is handled by a small store subscriber rather than a third-party persistence library.

```text
┌─────────────────────────────────────────────────────────────┐
│                         React UI                            │
│  BoardPage · Column · TaskCard · TaskModal · FilterBar      │
└───────────────────────────┬─────────────────────────────────┘
                            │ useDispatch / useSelector
┌───────────────────────────▼─────────────────────────────────┐
│                     Redux Toolkit store                     │
│  ┌──────────────────────┐   ┌───────────────────────────┐   │
│  │ kanbanSlice          │   │ filterSlice               │   │
│  │ tasks[]              │   │ search, priority, status  │   │
│  └──────────┬───────────┘   └─────────────┬─────────────┘   │
└─────────────┼─────────────────────────────┼─────────────────┘
              │ derived with                │
              │ useKanbanFilters            │
              │ (useMemo + useDebounce)     │
              ▼                             ▼
        Columns / stats / result counts / empty states

              │ store.subscribe(persistTasks)
              ▼
┌─────────────────────────────────────────────────────────────┐
│ localStorage                                                │
│  flowboard.tasks.v1 → JSON array of tasks                   │
│  flowboard.theme    → "light" | "dark"                      │
└─────────────────────────────────────────────────────────────┘
```

### Store Shape

```js
{
  kanban: {
    tasks: [
      {
        id: "7a1c…",
        title: "Design the onboarding flow",
        description: "Cover empty, loading, and error states.",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-11-04",
        order: 0,
        createdAt: "2026-10-31T09:00:00.000Z",
        updatedAt: "2026-10-31T09:12:00.000Z"
      }
    ]
  },
  filters: {
    search: "",
    priority: "all",
    status: "all"
  }
}
```

### Slice Responsibilities

#### `kanbanSlice` (`src/redux/kanbanSlice.js`)

| Action | Payload | Behaviour |
| --- | --- | --- |
| `addTask` | `{ title, description?, priority?, status?, dueDate? }` | Trims strings, validates enum values, generates an ID, appends to the end of the target column |
| `updateTask` | `{ id, changes }` | Merges validated changes, updates `updatedAt`, appends to the new column if status changed |
| `deleteTask` | `id` | Removes the task and re-indexes the remaining column |
| `moveTask` | `{ id, toStatus, toIndex? }` | Moves within or across columns, inserts at `toIndex`, re-indexes both columns |

All mutations run through Immer (built into Redux Toolkit), so reducers use readable mutable syntax while producing immutable state.

#### `filterSlice` (`src/redux/filterSlice.js`)

| Action | Payload | Behaviour |
| --- | --- | --- |
| `setSearch` | `string` | Stores the raw search input |
| `setPriority` | `"all" \| "low" \| "medium" \| "high"` | Filters by priority |
| `setStatus` | `"all" \| "todo" \| "in-progress" \| "completed"` | Shows only the selected column |
| `resetFilters` | — | Restores the initial filter state |

### Data Model

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | `string` | Yes | `crypto.randomUUID()` with a fallback |
| `title` | `string` | Yes | Trimmed; 1–100 characters; enforced by the form and slice |
| `description` | `string` | No | Trimmed; up to 500 characters |
| `priority` | `"low" \| "medium" \| "high"` | Yes | Defaults to `"medium"` |
| `status` | `"todo" \| "in-progress" \| "completed"` | Yes | Defaults to `"todo"` |
| `dueDate` | `string` | No | `YYYY-MM-DD` or `""` |
| `order` | `number` | Yes | Zero-based position within its column |
| `createdAt` | ISO string | Yes | Set on creation |
| `updatedAt` | ISO string | Yes | Updated on every edit or move |

### localStorage Persistence Lifecycle

Persistence is intentionally small and explicit:

1. **Read once at startup.** `src/redux/store.js` calls `readPersistedTasks()` before the store is created.
2. **Validate before hydrating.** `sanitizeTasks()` in `src/utils/task.js`:
   - returns `null` when the payload is not an array;
   - drops entries without a non-empty string `id` and `title`, plus duplicate IDs;
   - trims and caps title/description lengths;
   - falls back to valid priority/status defaults;
   - repairs missing timestamps and order values, then re-indexes each column.
3. **Preload or seed.**
   - Valid stored data becomes `preloadedState`.
   - When no stored data exists, the slice's initial state uses `seedTasks`.
   - An empty array `[]` is valid and is respected — it does **not** re-seed the board.
4. **Subscribe to the store.**
   ```js
   store.subscribe(persistTasks);
   persistTasks();
   ```
5. **Write only when tasks change.** The subscriber compares the `tasks` array reference with the last persisted reference. Filter actions do not touch `kanban.tasks`, so they never trigger a write.
6. **Fail safely.** Quota or privacy-mode errors are caught and logged; the in-memory board keeps working.
7. **Theme is separate.** The theme preference uses `useLocalStorage('flowboard.theme', …)`, not Redux, because it is a small UI preference with no cross-component coordination needs. It is also applied by an inline script in `index.html` before React mounts to avoid a flash of the wrong theme.

The task storage key is versioned (`flowboard.tasks.v1`). Bump the key when the schema changes incompatibly, or add a migration step inside `readPersistedTasks()`.

### Ordering and Drag-and-Drop

Each task has an `order` scoped to its column. Whenever a task is added, removed, moved, or edited into another column, the affected columns are re-indexed from `0..n-1`.

When a card is dropped:

1. `Column` reads the dragged task ID from `dataTransfer`.
2. It finds the card under the pointer, compares the pointer's Y position with that card's midpoint, and computes an insertion index in the **unfiltered** column list.
3. `moveTask` removes the task from its source list, clamps the index, inserts it, and re-indexes.
4. If the drop happens in the same column, the reducer compensates for the removal shift so the card lands exactly where the user expects.

Because insertion indexes are computed against `allTasks` rather than the filtered view, dragging still behaves correctly while a search or priority filter is active.

### Derived Data and Filtering

`useKanbanFilters()` is the single source of truth for board presentation:

- reads `tasks` from `kanbanSlice`;
- reads `search`, `priority`, and `status` from `filterSlice`;
- debounces the raw search value with `useDebounce(search, 200)`;
- memoises the filtered task list, visible columns, and statistics with `useMemo`;
- returns `isBoardEmpty`, `hasResults`, `resultCount`, and `hasActiveFilters` so the page can choose between the board, the empty board state, and the “no results” state.

Column order follows `COLUMNS` in `src/config/constants.js`; task order follows the persisted `order` field.

---

## Feature Behaviour

### Create

- Open the modal from **New task**, the `+` in a column header, or **Add task** at the bottom of a column.
- Creating from a specific column pre-selects that column's status.
- The title is required, trimmed, and limited to 100 characters.
- Description, priority, status, and due date are optional; priority defaults to Medium, status to Todo.
- The form blocks submission on an empty/whitespace-only title and shows an inline error.

### Edit

- Click a card title or the pencil action to open the modal.
- Every field is pre-populated.
- Changing the status moves the task to the end of the new column and re-indexes the old one.

### Delete

- The trash action opens a confirmation dialog naming the task.
- Cancel is focused by default to reduce accidental destructive actions.
- Confirming removes the task and re-indexes the column.

### Search and filters

- Search matches task titles case-insensitively.
- Search input is stored raw; filtering uses a 200 ms debounced value.
- Priority and status filters combine with search.
- Selecting a status hides the other columns and expands the visible column.
- Empty states are chosen in this order:
  1. no tasks at all → “Your board is empty”;
  2. tasks exist but no matches → “No tasks found”;
  3. a column has no matches → column-level “No matching tasks”.

### Dates

- Due dates are stored as `YYYY-MM-DD` and parsed as **local** dates, avoiding timezone off-by-one errors.
- Overdue tasks (not completed) show a red date badge prefixed with `Overdue ·`.
- Tasks due today show an amber badge.
- Completed tasks never count as overdue.

### Themes

- Light/dark toggle in the navbar.
- First visit follows `prefers-color-scheme`.
- Choice persists in `flowboard.theme`.
- Other tabs receive the change through the `storage` event.
- `<meta name="theme-color">` and `color-scheme` are updated for native UI.

---

## Customization Guide

### Adding or Renaming Columns

Columns are defined once in `src/config/constants.js`:

```js
export const COLUMNS = [
  {
    id: 'todo',
    title: 'Todo',
    description: 'Ideas and work waiting to start',
    dotClass: 'bg-sky-500',
    gradientClass: 'from-sky-400 via-sky-500 to-cyan-400',
    countClass:
      'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  },
  // ...
];
```

`COLUMN_IDS` is derived automatically, so the slice, status filter, edit form, and move controls pick up new entries without further changes.

To add a fourth column:

```js
{
  id: 'blocked',
  title: 'Blocked',
  description: 'Waiting on external input',
  dotClass: 'bg-violet-500',
  gradientClass: 'from-violet-400 via-violet-500 to-fuchsia-400',
  countClass:
    'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
}
```

Then update the board grid in `src/pages/BoardPage.jsx`:

```js
const gridClass =
  columns.length === 1
    ? 'grid max-w-2xl grid-cols-1 gap-4'
    : 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4';
```

Notes:

- Keep `id` values stable. They are persisted inside every task.
- Renaming a column only requires changing `title`.
- Removing a column is safe: hydration maps unknown statuses back to `todo`, but existing tasks in that column will be reclassified on the next load.
- Use literal Tailwind class strings so the compiler can detect them.

### Adding Priority Levels

Add an entry to `PRIORITIES` in `src/config/constants.js`:

```js
{
  id: 'critical',
  label: 'Critical',
  dotClass: 'bg-fuchsia-500',
  accentClass: 'bg-fuchsia-400',
  badgeClass:
    'bg-fuchsia-50 text-fuchsia-700 ring-1 ring-inset ring-fuchsia-600/15 ' +
    'dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:ring-fuchsia-400/20',
}
```

`PRIORITY_IDS` and `PRIORITY_MAP` update automatically, so the create/edit select, task cards, and filter options all include the new priority. Adjust `DEFAULT_PRIORITY` if needed.

### Changing the Theme and Branding

**Brand colours.** Edit the `--color-brand-*` tokens in `src/index.css` under `@theme`. Every primary button, focus ring, empty-state icon, and accent references these tokens.

**Fonts.** Replace the `--font-sans` token and the Google Fonts link in `index.html`.

**Dark mode.** The project uses a class-based variant:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

If you prefer system-only dark mode, replace the variant with `@media (prefers-color-scheme: dark)` and remove the toggle logic in `useTheme.js`.

**App name.** Change `APP_NAME` in `src/config/constants.js`, the `<title>` and meta description in `index.html`, and the wordmark in `src/layouts/Navbar.jsx`.

**Logo.** Replace `src/assets/logo.svg` (navbar) and `public/favicon.svg` (browser tab). Keep the SVGs square for best results.

**Theme toggle icon/labels.** Edit `src/layouts/Navbar.jsx`.

### Changing Seed / Demo Data

Edit `src/config/seedData.js`. Set the array to `[]` for a clean first-run board. Because persisted data always wins, you must also clear the storage key when testing seed changes:

```js
// Browser DevTools console
localStorage.removeItem('flowboard.tasks.v1');
location.reload();
```

The seed dates are generated relative to “today” so the overdue and due-today states are always demonstrable.

### Storage Keys and Schema Migrations

Storage keys live in `src/config/constants.js`:

```js
export const STORAGE_KEYS = Object.freeze({
  TASKS: 'flowboard.tasks.v1',
  THEME: 'flowboard.theme',
});
```

When changing the task schema:

1. Prefer additive, optional fields so old data remains usable.
2. Update `sanitizeTasks()` with defaults for the new fields.
3. For breaking changes, bump the key to `flowboard.tasks.v2` and migrate in `readPersistedTasks()`:

```js
const readPersistedTasks = () => {
  const legacy = localStorage.getItem('flowboard.tasks.v1');
  const current = localStorage.getItem(STORAGE_KEYS.TASKS);

  if (!current && legacy) {
    const migrated = migrateV1ToV2(JSON.parse(legacy));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(migrated));
    localStorage.removeItem('flowboard.tasks.v1');
  }

  // ...parse and sanitise current
};
```

### Adding a New Task Field

Use this checklist to add a field such as `assignee`:

1. **Constants** — add any enums or option lists.
2. **Seed data** — add the field to demo tasks (optional).
3. **Slice** — accept the field in `addTask.prepare` and `updateTask`.
4. **Hydration** — add a default in `sanitizeTasks()`.
5. **Task modal** — add the input, include it in form state and submit payload.
6. **Task card** — render the value.
7. **Filtering** — extend `filterSlice` and `useKanbanFilters` if it should be filterable.
8. **README** — update the data model table.

### Swapping localStorage for a REST API

The UI depends only on the slice actions, so persistence can be replaced without rewriting components.

1. Create async thunks for fetch/create/update/delete/move.
2. Handle `pending` / `fulfilled` / `rejected` cases in `extraReducers`.
3. Remove `store.subscribe(persistTasks)` from `store.js`, or keep it as an offline cache.
4. Keep optimistic updates in the reducers if you want instant drag-and-drop feedback, then reconcile with the server response.
5. Move the API base URL into an environment variable (`VITE_API_URL`) and never commit secrets.

Example thunk skeleton:

```js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('kanban/fetchTasks', async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
  if (!response.ok) throw new Error('Failed to load tasks');
  return response.json();
});
```

The current architecture deliberately favours a zero-backend, offline-first experience. `localStorage` is per-origin and per-browser, so data is not shared between devices.

---

## Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`.
- Columns expose `aria-label="<Title> column"`.
- Icon-only controls have descriptive `aria-label` and `title` text.
- The modal:
  - renders in a portal with `role="dialog"` and `aria-modal="true"`;
  - labels itself from the modal heading;
  - traps Tab/Shift+Tab focus;
  - closes on Escape or backdrop click;
  - locks body scroll and restores focus to the trigger on close.
- Form errors use `aria-invalid` and `aria-describedby`.
- Search, filter, and delete controls are native inputs/selects/buttons, keyboard operable.
- The result count uses `aria-live="polite"`.
- Every interactive element has a visible `focus-visible` ring.
- Priority is communicated by text and colour, not colour alone.
- Drag-and-drop is never the only way to move a card: the arrow buttons and status select provide keyboard/touch alternatives.

---

## Responsive Design

| Breakpoint | Layout |
| --- | --- |
| Mobile (< 640px) | Single-column board stack, stacked toolbar, 2×2 stats grid, full-screen-friendly modal |
| Tablet (640–1279px) | Two-column board grid, inline stats, side-by-side filters |
| Desktop (≥ 1280px) | Three-column board, four-card stats strip, wide toolbar |

Other responsive details:

- Cards use flexible widths and `line-clamp-2` descriptions.
- The modal aligns to the bottom on mobile and centres on larger screens.
- The navbar collapses the “Board” label on small screens.
- `min-h-dvh` keeps the footer at the bottom without relying on `100vh` quirks.
- The sticky navbar uses backdrop blur without blocking the board.

---

## Performance Notes

- **Memoised derived state.** Filtering, grouping, and stats are computed once per relevant state change with `useMemo`.
- **Debounced search.** Filtering does not run on every keystroke.
- **Minimal persistence writes.** The store subscriber compares array references, so filter changes and re-renders never touch `localStorage`.
- **No heavy UI framework.** Tailwind v4 generates only the utilities used.
- **Small icon surface.** Only the Lucide icons actually imported are bundled.
- **Production bundle (reference build):** ~389 kB JavaScript before gzip, ~124 kB gzipped; ~48 kB CSS before gzip, ~8.4 kB gzipped.

---

## Privacy and Security

- All data stays in the browser's `localStorage`; nothing is sent to a server.
- No analytics, tracking, or third-party scripts are included beyond the optional Google Fonts stylesheet.
- Do not store credentials, tokens, or personal data in task fields if the app is hosted on a shared origin.
- React escapes rendered strings by default, which mitigates HTML injection through task content.
- `localStorage` is readable by any JavaScript running on the same origin, so treat it as untrusted storage and avoid hosting untrusted third-party scripts alongside the app.

---

## Deployment

The build output is a static SPA in `dist/`. Any static host works.

### Vercel

1. Import the repository.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.

### Netlify

- Build command: `npm run build`.
- Publish directory: `dist`.
- Add a `public/_redirects` file for client-side routing:

```text
/*  /index.html  200
```

### GitHub Pages

- Set the Vite `base` option to your repository path:

```js
export default defineConfig({
  base: '/your-repository-name/',
  plugins: [react(), tailwindcss()],
});
```

- Build and publish `dist/` with your preferred GitHub Pages action.
- The router already receives `basename: import.meta.env.BASE_URL`, so it follows the configured base path automatically.
- If the host cannot rewrite unknown paths to `index.html`, switch `createBrowserRouter` to `createHashRouter` in `src/router/AppRouter.jsx`.

### Any static server

Serve `dist/` and rewrite unknown routes to `index.html`. Without the rewrite, refreshing `/some-route` returns a 404 from the server before React Router can handle it.

---

## Troubleshooting

| Problem | Cause | Fix |
| --- | --- | --- |
| Tailwind classes have no effect | Vite plugin missing or dev server not restarted | Add `tailwindcss()` to `vite.config.js`, restart `npm run dev` |
| Styles look unstyled after install | Tailwind CSS not installed, or `index.css` not imported in `main.jsx` | Run `npm install -D tailwindcss @tailwindcss/vite`; verify `import './index.css'` |
| Board resets on refresh | Private browsing, storage disabled, or a different origin/port | Use a normal window; check DevTools → Application → Local Storage |
| Seed changes do not appear | Existing persisted tasks take precedence | Remove `flowboard.tasks.v1` from localStorage and reload |
| Drag-and-drop does nothing on a phone | Native HTML5 DnD is not supported on most touch browsers | Use the previous/next arrow buttons or edit the task's status |
| Refresh on a deployed route returns 404 | Static host lacks SPA rewrites | Configure `/* /index.html 200` or use a hash router |
| Due dates are off by one day | Custom date code parsed UTC timestamps | This project parses `YYYY-MM-DD` as local dates in `src/utils/date.js`; preserve that behaviour |
| Theme flashes on load | Inline theme script removed | Keep the script in `index.html` before the module script |
| `npm run dev` fails on Node 18 | Vite 7 requires newer Node | Upgrade to Node 20.19+ or 22.12+ |
| “Unable to persist tasks” warning | Storage quota exceeded or blocked | Free space, allow storage, or reduce task payload size |

Reset the entire board:

```js
// Browser DevTools console
localStorage.removeItem('flowboard.tasks.v1');
localStorage.removeItem('flowboard.theme');
location.reload();
```

---

## Manual QA Checklist

- [ ] Board renders three columns with seeded tasks on a fresh profile.
- [ ] Create a task from the toolbar and from a specific column.
- [ ] Submit an empty/whitespace title and confirm the inline error.
- [ ] Edit every field and confirm the card updates.
- [ ] Change a task's status via the edit modal; the card moves columns.
- [ ] Move a task with the arrow controls in both directions.
- [ ] Drag a task to another column and to a specific position within a column.
- [ ] Delete a task; cancel once, then confirm.
- [ ] Search by a partial title, clear it, and search for a non-existent title.
- [ ] Combine a search with priority and status filters; reset all filters.
- [ ] Filter to one status and confirm only that column is visible.
- [ ] Confirm overdue, due-today, and no-due-date states.
- [ ] Toggle dark mode, refresh, and confirm the preference persists.
- [ ] Refresh after CRUD operations and confirm the board is intact.
- [ ] Open a modal, press Escape, and confirm focus returns to the trigger.
- [ ] Tab through the modal and confirm focus stays inside it.
- [ ] Check mobile, tablet, and desktop widths for overflow.
- [ ] Visit an unknown route and confirm the 404 page.

---

## Roadmap

Potential next steps:

- Undo/redo for destructive actions.
- Multiple boards and workspace switching.
- Custom labels, assignees, and checklists.
- Keyboard-first drag-and-drop with announcements for screen readers.
- REST/GraphQL sync and optimistic reconciliation.
- Import/export JSON.
- Automated unit and end-to-end tests with Vitest, React Testing Library, and Playwright.
- Internationalisation and date-format preferences.

---

## License

Released under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

Built with care using React, Redux Toolkit, React Router, and Tailwind CSS. Contributions, issues, and suggestions are welcome.
