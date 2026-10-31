import {
  CircleCheckBig,
  ListChecks,
  LoaderCircle,
  TriangleAlert,
} from 'lucide-react';

const tones = {
  brand: {
    tile: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300',
    value: 'text-slate-900 dark:text-white',
  },
  amber: {
    tile: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
    value: 'text-slate-900 dark:text-white',
  },
  emerald: {
    tile: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
    value: 'text-slate-900 dark:text-white',
  },
  rose: {
    tile: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300',
    value: 'text-rose-600 dark:text-rose-400',
  },
  neutral: {
    tile: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
    value: 'text-slate-900 dark:text-white',
  },
};

export default function BoardStats({ stats }) {
  const completionRate =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  const items = [
    {
      label: 'Total tasks',
      value: stats.total,
      hint: 'Across the board',
      icon: ListChecks,
      tone: 'brand',
    },
    {
      label: 'In progress',
      value: stats.inProgress,
      hint: 'Actively moving',
      icon: LoaderCircle,
      tone: 'amber',
    },
    {
      label: 'Completed',
      value: stats.completed,
      hint: `${completionRate}% completion rate`,
      icon: CircleCheckBig,
      tone: 'emerald',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      hint: stats.overdue > 0 ? 'Needs attention' : 'Nothing overdue',
      icon: TriangleAlert,
      tone: stats.overdue > 0 ? 'rose' : 'neutral',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map(({ label, value, hint, icon, tone }) => {
        const Icon = icon;

        return (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tones[tone].tile}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-[11px] dark:text-slate-400">
                {label}
              </p>
              <p
                className={`text-xl font-bold leading-tight ${tones[tone].value}`}
              >
                {value}
              </p>
              <p className="hidden truncate text-[11px] text-slate-400 sm:block dark:text-slate-500">
                {hint}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
