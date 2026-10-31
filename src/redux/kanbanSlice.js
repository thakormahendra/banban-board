import { createSlice } from '@reduxjs/toolkit';
import {
  COLUMN_IDS,
  DEFAULT_PRIORITY,
  DEFAULT_STATUS,
  DESCRIPTION_MAX_LENGTH,
  PRIORITY_IDS,
  TITLE_MAX_LENGTH,
} from '../config/constants';
import { seedTasks } from '../config/seedData';
import { createTaskId, isValidDueDate } from '../utils/task';

const nowIso = () => new Date().toISOString();
const byOrder = (a, b) => a.order - b.order;

const nextOrder = (tasks, status) =>
  tasks
    .filter((task) => task.status === status)
    .reduce((max, task) => Math.max(max, task.order), -1) + 1;

const reindex = (tasks, status) => {
  tasks
    .filter((task) => task.status === status)
    .sort(byOrder)
    .forEach((task, index) => {
      task.order = index;
    });
};

const initialState = {
  tasks: seedTasks.map((task) => ({ ...task })),
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        if (!action.payload.title) return;

        state.tasks.push({
          ...action.payload,
          order: nextOrder(state.tasks, action.payload.status),
        });
      },
      prepare({
        title = '',
        description = '',
        priority = DEFAULT_PRIORITY,
        status = DEFAULT_STATUS,
        dueDate = '',
      } = {}) {
        const timestamp = nowIso();

        return {
          payload: {
            id: createTaskId(),
            title:
              typeof title === 'string'
                ? title.trim().slice(0, TITLE_MAX_LENGTH)
                : '',
            description:
              typeof description === 'string'
                ? description.trim().slice(0, DESCRIPTION_MAX_LENGTH)
                : '',
            priority: PRIORITY_IDS.includes(priority)
              ? priority
              : DEFAULT_PRIORITY,
            status: COLUMN_IDS.includes(status) ? status : DEFAULT_STATUS,
            dueDate: isValidDueDate(dueDate) ? dueDate : '',
            order: 0,
            createdAt: timestamp,
            updatedAt: timestamp,
          },
        };
      },
    },
    updateTask(state, action) {
      const { id, changes = {} } = action.payload ?? {};
      const task = state.tasks.find((item) => item.id === id);
      if (!task) return;

      const nextTitle =
        typeof changes.title === 'string'
          ? changes.title.trim().slice(0, TITLE_MAX_LENGTH)
          : task.title;
      if (!nextTitle) return;

      const previousStatus = task.status;
      const nextStatus = COLUMN_IDS.includes(changes.status)
        ? changes.status
        : task.status;

      task.title = nextTitle;
      task.description =
        typeof changes.description === 'string'
          ? changes.description.trim().slice(0, DESCRIPTION_MAX_LENGTH)
          : task.description;
      task.priority = PRIORITY_IDS.includes(changes.priority)
        ? changes.priority
        : task.priority;
      task.status = nextStatus;
      task.dueDate =
        changes.dueDate === '' || isValidDueDate(changes.dueDate)
          ? changes.dueDate
          : task.dueDate;
      task.updatedAt = nowIso();

      if (previousStatus !== nextStatus) {
        reindex(state.tasks, previousStatus);
        task.order = nextOrder(
          state.tasks.filter((item) => item.id !== id),
          nextStatus,
        );
      }
    },
    deleteTask(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (!task) return;

      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
      reindex(state.tasks, task.status);
    },
    moveTask(state, action) {
      const { id, toStatus, toIndex } = action.payload ?? {};
      if (!COLUMN_IDS.includes(toStatus)) return;

      const task = state.tasks.find((item) => item.id === id);
      if (!task) return;

      const fromStatus = task.status;
      const sameColumn = fromStatus === toStatus;
      const sourceIndex = state.tasks
        .filter((item) => item.status === toStatus)
        .sort(byOrder)
        .findIndex((item) => item.id === id);

      let targetIndex = Number.isInteger(toIndex)
        ? toIndex
        : Number.MAX_SAFE_INTEGER;

      if (sameColumn && sourceIndex !== -1 && sourceIndex < targetIndex) {
        targetIndex -= 1;
      }

      const destination = state.tasks
        .filter((item) => item.id !== id && item.status === toStatus)
        .sort(byOrder);

      const clampedIndex = Math.max(
        0,
        Math.min(targetIndex, destination.length),
      );

      task.status = toStatus;
      task.updatedAt = nowIso();
      destination.splice(clampedIndex, 0, task);
      destination.forEach((item, index) => {
        item.order = index;
      });

      if (!sameColumn) reindex(state.tasks, fromStatus);
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = kanbanSlice.actions;

export const selectTasks = (state) => state.kanban.tasks;

export default kanbanSlice.reducer;
