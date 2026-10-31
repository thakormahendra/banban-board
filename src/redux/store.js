import { configureStore } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../config/constants';
import { sanitizeTasks } from '../utils/task';
import filterReducer from './filterSlice';
import kanbanReducer from './kanbanSlice';

const readPersistedTasks = () => {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!raw) return null;

    return sanitizeTasks(JSON.parse(raw));
  } catch (error) {
    console.warn('[FlowBoard] Unable to read saved tasks.', error);
    return null;
  }
};

const writePersistedTasks = (tasks) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.warn('[FlowBoard] Unable to persist tasks.', error);
  }
};

const persistedTasks = readPersistedTasks();

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
    filters: filterReducer,
  },
  preloadedState: persistedTasks
    ? { kanban: { tasks: persistedTasks } }
    : undefined,
});

let lastPersistedTasks = null;

const persistTasks = () => {
  const { tasks } = store.getState().kanban;
  if (tasks === lastPersistedTasks) return;

  lastPersistedTasks = tasks;
  writePersistedTasks(tasks);
};

store.subscribe(persistTasks);
persistTasks();
