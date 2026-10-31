import { useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Pencil,
  Trash2,
} from 'lucide-react';
import { COLUMNS, COLUMN_IDS, PRIORITY_MAP } from '../config/constants';
import {
  formatDueDate,
  formatDueDateLong,
  isDueToday,
  isOverdue,
} from '../utils/date';
import Badge from './Badge';
import Button from './Button';

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const [isDragging, setIsDragging] = useState(false);

  const priority = PRIORITY_MAP[task.priority] ?? PRIORITY_MAP.medium;
  const columnIndex = COLUMN_IDS.indexOf(task.status);
  const previousColumn = COLUMNS[columnIndex - 1];
  const nextColumn = COLUMNS[columnIndex + 1];
  const overdue = isOverdue(task.dueDate, task.status);
  const dueToday = isDueToday(task.dueDate, task.status);
  const isCompleted = task.status === 'completed';

  const handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', task.id);
    setIsDragging(true);
  };

  const dueDateClass = overdue
    ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
    : dueToday
      ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
      : 'bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400';

  return (
    <article
      data-task-id={task.id}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
      className={`group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 ${
        isDragging ? 'cursor-grabbing opacity-40' : 'cursor-grab'
      }`}
    >
      <span
        className={`absolute inset-y-0 left-0 w-1 ${priority.accentClass}`}
        aria-hidden="true"
      />
      <div className="p-4 pl-5">
        <div className="flex items-start justify-between gap-2">
          <Badge
            className={priority.badgeClass}
            dotClassName={priority.dotClass}
          >
            {priority.label}
          </Badge>
          <div className="-mr-1 -mt-1 flex items-center gap-0.5">
            <Button
              size="icon-xs"
              variant="ghost"
              className="rounded-lg"
              onClick={() => onMove(task, -1)}
              disabled={!previousColumn}
              aria-label={
                previousColumn
                  ? `Move to ${previousColumn.title}`
                  : 'Already in the first column'
              }
              title={
                previousColumn ? `Move to ${previousColumn.title}` : undefined
              }
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              size="icon-xs"
              variant="ghost"
              className="rounded-lg"
              onClick={() => onMove(task, 1)}
              disabled={!nextColumn}
              aria-label={
                nextColumn
                  ? `Move to ${nextColumn.title}`
                  : 'Already in the last column'
              }
              title={nextColumn ? `Move to ${nextColumn.title}` : undefined}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              size="icon-xs"
              variant="ghost"
              className="rounded-lg"
              onClick={() => onEdit(task)}
              aria-label={`Edit ${task.title}`}
              title="Edit task"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
            <Button
              size="icon-xs"
              variant="ghost"
              className="rounded-lg hover:text-rose-600 dark:hover:text-rose-400"
              onClick={() => onDelete(task)}
              aria-label={`Delete ${task.title}`}
              title="Delete task"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEdit(task)}
          className="mt-3 block w-full rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
        >
          <h3
            className={`text-sm font-semibold leading-snug ${
              isCompleted
                ? 'text-slate-400 line-through decoration-slate-300 dark:text-slate-500'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {task.title}
          </h3>
        </button>

        {task.description && (
          <p
            className={`mt-1.5 line-clamp-2 text-xs leading-relaxed ${
              isCompleted
                ? 'text-slate-400 dark:text-slate-500'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {task.description}
          </p>
        )}

        <div className="mt-3.5 flex items-center justify-between gap-2">
          {task.dueDate ? (
            <span
              title={formatDueDateLong(task.dueDate)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium ${dueDateClass}`}
            >
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {overdue ? 'Overdue · ' : ''}
              {formatDueDate(task.dueDate)}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              No due date
            </span>
          )}
          <GripVertical
            className="h-4 w-4 shrink-0 text-slate-300 opacity-0 transition group-hover:opacity-100 dark:text-slate-600"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}
