import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { COLUMNS } from '../config/constants';
import { selectFilters } from '../redux/filterSlice';
import { selectTasks } from '../redux/kanbanSlice';
import { isOverdue } from '../utils/date';
import { useDebounce } from './useDebounce';

const byOrder = (a, b) => a.order - b.order;

export function useKanbanFilters() {
  const tasks = useSelector(selectTasks);
  const { search, priority, status } = useSelector(selectFilters);
  const debouncedSearch = useDebounce(search, 200);
  const normalizedSearch =
    search.trim() === '' ? '' : debouncedSearch.trim().toLowerCase();

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesSearch =
          !normalizedSearch ||
          task.title.toLowerCase().includes(normalizedSearch);
        const matchesPriority =
          priority === 'all' || task.priority === priority;
        const matchesStatus = status === 'all' || task.status === status;

        return matchesSearch && matchesPriority && matchesStatus;
      }),
    [tasks, normalizedSearch, priority, status],
  );

  const columns = useMemo(
    () =>
      COLUMNS.filter(
        (column) => status === 'all' || column.id === status,
      ).map((column) => ({
        ...column,
        tasks: filteredTasks
          .filter((task) => task.status === column.id)
          .sort(byOrder),
        allTasks: tasks
          .filter((task) => task.status === column.id)
          .sort(byOrder),
      })),
    [filteredTasks, tasks, status],
  );

  const stats = useMemo(
    () => ({
      total: tasks.length,
      inProgress: tasks.filter((task) => task.status === 'in-progress').length,
      completed: tasks.filter((task) => task.status === 'completed').length,
      overdue: tasks.filter((task) => isOverdue(task.dueDate, task.status))
        .length,
    }),
    [tasks],
  );

  const activeFilterCount = [
    search.trim() !== '',
    priority !== 'all',
    status !== 'all',
  ].filter(Boolean).length;

  return {
    tasks,
    columns,
    stats,
    resultCount: filteredTasks.length,
    hasActiveFilters: activeFilterCount > 0,
    isBoardEmpty: tasks.length === 0,
    hasResults: filteredTasks.length > 0,
  };
}
