import { Inbox } from 'lucide-react';

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}) {
  const Icon = icon ?? Inbox;

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/40 ${className}`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/20">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
