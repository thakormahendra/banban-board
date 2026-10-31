import { useState } from 'react';
import { Inbox, Plus } from 'lucide-react';
import Button from './Button';
import TaskCard from './TaskCard';

export default function Column({
  column,
  isFiltered,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onDropTask,
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    const relatedTarget = event.relatedTarget;

    if (
      !(relatedTarget instanceof Node) ||
      !event.currentTarget.contains(relatedTarget)
    ) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const taskId = event.dataTransfer.getData('text/plain');
    if (!taskId) return;

    let targetIndex = column.allTasks.length;
    const card = event.target.closest('[data-task-id]');

    if (card) {
      const index = column.allTasks.findIndex(
        (task) => task.id === card.dataset.taskId,
      );

      if (index !== -1) {
        const rect = card.getBoundingClientRect();
        targetIndex =
          event.clientY > rect.top + rect.height / 2 ? index + 1 : index;
      }
    }

    onDropTask(taskId, column.id, targetIndex);
  };

  return (
    <section
      aria-label={`${column.title} column`}
      className="flex min-h-[24rem] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/60 dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div
        className={`h-1 bg-gradient-to-r ${column.gradientClass}`}
        aria-hidden="true"
      />
      <header className="flex items-center gap-3 px-4 pb-3 pt-4">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${column.dotClass}`}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {column.title}
            </h2>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${column.countClass}`}
            >
              {column.tasks.length}
            </span>
          </div>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {column.description}
          </p>
        </div>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => onAddTask(column.id)}
          aria-label={`Add task to ${column.title}`}
          title={`Add task to ${column.title}`}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </Button>
      </header>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-1 flex-col gap-3 rounded-b-2xl px-3 pb-3 transition-colors ${
          isDragOver
            ? 'bg-brand-50/70 ring-2 ring-inset ring-brand-400/40 dark:bg-brand-500/5'
            : ''
        }`}
      >
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onMove={onMoveTask}
          />
        ))}

        {column.tasks.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center dark:border-slate-700">
            <Inbox
              className="h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {isFiltered ? 'No matching tasks' : 'No tasks yet'}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              {isFiltered
                ? 'Try changing or clearing your filters.'
                : 'Drop a card here or add a new task.'}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => onAddTask(column.id)}
          className="mt-auto flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-white/50 py-2.5 text-xs font-medium text-slate-500 transition-colors hover:border-brand-300 hover:bg-white hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:bg-slate-900 dark:hover:text-brand-300"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add task
        </button>
      </div>
    </section>
  );
}
