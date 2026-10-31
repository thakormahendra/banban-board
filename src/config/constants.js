export const APP_NAME = 'FlowBoard';

export const STORAGE_KEYS = Object.freeze({
  TASKS: 'flowboard.tasks.v1',
  THEME: 'flowboard.theme',
});

export const THEMES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
});

export const DEFAULT_PRIORITY = 'medium';
export const DEFAULT_STATUS = 'todo';

export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;

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
  {
    id: 'in-progress',
    title: 'In Progress',
    description: 'Work that is actively moving',
    dotClass: 'bg-amber-500',
    gradientClass: 'from-amber-400 via-orange-500 to-rose-400',
    countClass:
      'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  },
  {
    id: 'completed',
    title: 'Completed',
    description: 'Work that is done and dusted',
    dotClass: 'bg-emerald-500',
    gradientClass: 'from-emerald-400 via-emerald-500 to-teal-400',
    countClass:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
];

export const COLUMN_IDS = COLUMNS.map((column) => column.id);

export const PRIORITIES = [
  {
    id: 'low',
    label: 'Low',
    dotClass: 'bg-emerald-500',
    accentClass: 'bg-emerald-400',
    badgeClass:
      'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  },
  {
    id: 'medium',
    label: 'Medium',
    dotClass: 'bg-amber-500',
    accentClass: 'bg-amber-400',
    badgeClass:
      'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/15 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20',
  },
  {
    id: 'high',
    label: 'High',
    dotClass: 'bg-rose-500',
    accentClass: 'bg-rose-400',
    badgeClass:
      'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/15 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20',
  },
];

export const PRIORITY_IDS = PRIORITIES.map((priority) => priority.id);

export const PRIORITY_MAP = Object.fromEntries(
  PRIORITIES.map((priority) => [priority.id, priority]),
);
