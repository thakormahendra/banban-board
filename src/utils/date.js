const parseDateOnly = (value) => {
  if (typeof value !== 'string') return null;

  const parts = value.split('-').map(Number);
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return null;
  }

  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
};

export const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'completed') return false;

  const parsed = parseDateOnly(dueDate);
  return parsed ? parsed < startOfToday() : false;
};

export const isDueToday = (dueDate, status) => {
  if (!dueDate || status === 'completed') return false;

  const parsed = parseDateOnly(dueDate);
  return parsed ? parsed.getTime() === startOfToday().getTime() : false;
};

export const formatDueDate = (dueDate) => {
  const parsed = parseDateOnly(dueDate);
  if (!parsed) return '';

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatDueDateLong = (dueDate) => {
  const parsed = parseDateOnly(dueDate);
  if (!parsed) return '';

  return parsed.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
