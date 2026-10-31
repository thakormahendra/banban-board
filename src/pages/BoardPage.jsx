import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, SearchX, SquareKanban } from 'lucide-react';
import BoardStats from '../components/BoardStats';
import Button from '../components/Button';
import Column from '../components/Column';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import TaskModal from '../components/TaskModal';
import { COLUMN_IDS, COLUMNS, DEFAULT_STATUS } from '../config/constants';
import { useKanbanFilters } from '../hooks/useKanbanFilters';
import { resetFilters } from '../redux/filterSlice';
import { deleteTask, moveTask } from '../redux/kanbanSlice';

export default function BoardPage() {
  const dispatch = useDispatch();
  const {
    columns,
    stats,
    tasks,
    resultCount,
    hasActiveFilters,
    isBoardEmpty,
    hasResults,
  } = useKanbanFilters();

  const [formState, setFormState] = useState({
    open: false,
    task: null,
    defaultStatus: DEFAULT_STATUS,
  });
  const [taskToDelete, setTaskToDelete] = useState(null);

  const openCreate = (status = DEFAULT_STATUS) => {
    setFormState({ open: true, task: null, defaultStatus: status });
  };

  const openEdit = (task) => {
    setFormState({ open: true, task, defaultStatus: task.status });
  };

  const closeForm = () => {
    setFormState((current) => ({ ...current, open: false }));
  };

  const handleMoveTask = (task, direction) => {
    const columnIndex = COLUMN_IDS.indexOf(task.status);
    const target = COLUMNS[columnIndex + direction];
    if (!target) return;

    dispatch(moveTask({ id: task.id, toStatus: target.id }));
  };

  const handleDropTask = (taskId, toStatus, toIndex) => {
    dispatch(moveTask({ id: taskId, toStatus, toIndex }));
  };

  const handleDelete = () => {
    if (!taskToDelete) return;

    dispatch(deleteTask(taskToDelete.id));
    setTaskToDelete(null);
  };

  const gridClass =
    columns.length === 1
      ? 'grid max-w-2xl grid-cols-1 gap-4'
      : 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            Workspace
          </p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Product board
          </h1>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Plan, prioritise, and ship work with a simple three-column flow.
            Drag cards between columns to update their status.
          </p>
        </div>
        <Button onClick={() => openCreate()} className="self-start sm:self-auto">
          <Plus className="h-4 w-4" aria-hidden="true" />
          New task
        </Button>
      </div>

      <BoardStats stats={stats} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar />
        <FilterBar />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <p aria-live="polite">
          {hasActiveFilters
            ? `Showing ${resultCount} of ${tasks.length} ${
                tasks.length === 1 ? 'task' : 'tasks'
              }`
            : `${tasks.length} ${
                tasks.length === 1 ? 'task' : 'tasks'
              } across ${COLUMNS.length} columns`}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => dispatch(resetFilters())}
            className="font-medium text-brand-600 underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-brand-400 dark:focus-visible:ring-offset-slate-950"
          >
            Clear all filters
          </button>
        )}
      </div>

      {isBoardEmpty ? (
        <EmptyState
          icon={SquareKanban}
          title="Your board is empty"
          description="Create your first task to get the board moving. Everything is saved in your browser, so your work survives a refresh."
          action={
            <Button onClick={() => openCreate()}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Create your first task
            </Button>
          }
        />
      ) : !hasResults ? (
        <EmptyState
          icon={SearchX}
          title="No tasks found"
          description="No tasks match your current search and filters. Try a different keyword or reset the filters to see everything again."
          action={
            <Button
              variant="secondary"
              onClick={() => dispatch(resetFilters())}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className={gridClass}>
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              isFiltered={hasActiveFilters}
              onAddTask={openCreate}
              onEditTask={openEdit}
              onDeleteTask={setTaskToDelete}
              onMoveTask={handleMoveTask}
              onDropTask={handleDropTask}
            />
          ))}
        </div>
      )}

      <TaskModal
        open={formState.open}
        task={formState.task}
        defaultStatus={formState.defaultStatus}
        onClose={closeForm}
      />

      <ConfirmDialog
        open={Boolean(taskToDelete)}
        task={taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
