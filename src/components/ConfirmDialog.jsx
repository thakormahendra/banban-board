import { AlertTriangle, Trash2 } from 'lucide-react';
import Button from './Button';
import Modal from './Modal';

export default function ConfirmDialog({
  open,
  task,
  title = 'Delete task?',
  description = 'This action cannot be undone.',
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
    >
      <div className="space-y-5">
        <div className="flex gap-3 rounded-xl border border-rose-100 bg-rose-50/70 p-4 dark:border-rose-500/20 dark:bg-rose-500/10">
          <AlertTriangle
            className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400"
            aria-hidden="true"
          />
          <div className="min-w-0 text-sm text-slate-600 dark:text-slate-300">
            <p>You are about to permanently delete:</p>
            <p className="mt-1 truncate font-semibold text-slate-900 dark:text-white">
              {task?.title}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} data-autofocus>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete task
          </Button>
        </div>
      </div>
    </Modal>
  );
}
