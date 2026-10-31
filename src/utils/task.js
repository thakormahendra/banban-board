import {
  COLUMN_IDS,
  DEFAULT_PRIORITY,
  DEFAULT_STATUS,
  DESCRIPTION_MAX_LENGTH,
  PRIORITY_IDS,
  TITLE_MAX_LENGTH,
} from '../config/constants';

const asString = (value, fallback = '') =>
  typeof value === 'string' ? value : fallback;

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const isValidDueDate = (value) => {
  if (typeof value !== 'string' || !DATE_ONLY_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const createTaskId = () => {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const sanitizeTasks = (raw) => {
  if (!Array.isArray(raw)) return null;

  const timestamp = new Date().toISOString();
  const seenIds = new Set();
  const tasks = [];

  raw.forEach((task, index) => {
    if (!task || typeof task !== 'object') return;
    if (typeof task.id !== 'string' || typeof task.title !== 'string') return;

    const id = task.id.trim();
    if (!id || !task.title.trim() || seenIds.has(id)) return;

    seenIds.add(id);
    tasks.push({
      id,
      title: task.title.trim().slice(0, TITLE_MAX_LENGTH),
      description: asString(task.description)
        .trim()
        .slice(0, DESCRIPTION_MAX_LENGTH),
      priority: PRIORITY_IDS.includes(task.priority)
        ? task.priority
        : DEFAULT_PRIORITY,
      status: COLUMN_IDS.includes(task.status) ? task.status : DEFAULT_STATUS,
      dueDate: isValidDueDate(task.dueDate) ? task.dueDate : '',
      order: Number.isFinite(task.order) ? task.order : index,
      createdAt: asString(task.createdAt, timestamp) || timestamp,
      updatedAt: asString(task.updatedAt, timestamp) || timestamp,
    });
  });

  COLUMN_IDS.forEach((status) => {
    tasks
      .filter((task) => task.status === status)
      .sort((a, b) => a.order - b.order)
      .forEach((task, index) => {
        task.order = index;
      });
  });

  return tasks;
};
