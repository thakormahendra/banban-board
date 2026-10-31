import { useEffect, useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CalendarDays, ChevronDown, Plus, Save } from 'lucide-react';
import {
  COLUMNS,
  DEFAULT_PRIORITY,
  DEFAULT_STATUS,
  DESCRIPTION_MAX_LENGTH,
  PRIORITIES,
  TITLE_MAX_LENGTH,
} from '../config/constants';
import { addTask, updateTask } from '../redux/kanbanSlice';
import Button from './Button';
import Modal from './Modal';

const emptyForm = {
  title: '',
  description: '',
  priority: DEFAULT_PRIORITY,
  status: DEFAULT_STATUS,
  dueDate: '',
};

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500';

const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300';

const counterClass = 'text-[11px] font-medium text-slate-400 dark:text-slate-500';

function SelectField({ id, label, value, onChange, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`${fieldClass} appearance-none pr-10`}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function TaskModal({
  open,
  task = null,
  defaultStatus = DEFAULT_STATUS,
  onClose,
}) {
  const dispatch = useDispatch();
  const formId = useId();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;

    setForm(
      task
        ? {
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate,
          }
        : { ...emptyForm, status: defaultStatus },
    );
    setError('');
  }, [open, task, defaultStatus]);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
    if (field === 'title' && error) setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = form.title.trim();
    if (!title) {
      setError('A task title is required.');
      return;
    }

    const payload = {
      title,
      description: form.description.trim(),
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate,
    };

    if (task) {
      dispatch(updateTask({ id: task.id, changes: payload }));
    } else {
      dispatch(addTask(payload));
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={task ? 'Edit task' : 'Create task'}
      description={
        task
          ? 'Update the details and save your changes.'
          : 'Capture the work before it slips through the cracks.'
      }
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label
              htmlFor={`${formId}-title`}
              className={`${labelClass} mb-0`}
            >
              Title <span className="text-rose-500">*</span>
            </label>
            <span className={counterClass}>
              {form.title.length}/{TITLE_MAX_LENGTH}
            </span>
          </div>
          <input
            id={`${formId}-title`}
            data-autofocus
            type="text"
            value={form.title}
            onChange={updateField('title')}
            maxLength={TITLE_MAX_LENGTH}
            placeholder="e.g. Design the onboarding flow"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${formId}-title-error` : undefined}
            className={`${fieldClass} ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                : ''
            }`}
          />
          {error && (
            <p
              id={`${formId}-title-error`}
              className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
            >
              {error}
            </p>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label
              htmlFor={`${formId}-description`}
              className={`${labelClass} mb-0`}
            >
              Description
            </label>
            <span className={counterClass}>
              {form.description.length}/{DESCRIPTION_MAX_LENGTH}
            </span>
          </div>
          <textarea
            id={`${formId}-description`}
            value={form.description}
            onChange={updateField('description')}
            maxLength={DESCRIPTION_MAX_LENGTH}
            rows={3}
            placeholder="Add context, acceptance criteria, or useful links..."
            className={`${fieldClass} resize-none`}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id={`${formId}-priority`}
            label="Priority"
            value={form.priority}
            onChange={updateField('priority')}
          >
            {PRIORITIES.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.label}
              </option>
            ))}
          </SelectField>
          <SelectField
            id={`${formId}-status`}
            label="Status"
            value={form.status}
            onChange={updateField('status')}
          >
            {COLUMNS.map((column) => (
              <option key={column.id} value={column.id}>
                {column.title}
              </option>
            ))}
          </SelectField>
        </div>

        <div>
          <label htmlFor={`${formId}-due-date`} className={labelClass}>
            Due date
          </label>
          <div className="relative">
            <CalendarDays
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id={`${formId}-due-date`}
              type="date"
              value={form.dueDate}
              onChange={updateField('dueDate')}
              className={`${fieldClass} pl-10`}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {task ? (
              <Save className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Plus className="h-4 w-4" aria-hidden="true" />
            )}
            {task ? 'Save changes' : 'Create task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
