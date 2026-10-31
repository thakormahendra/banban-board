const variants = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-500 active:bg-brand-700',
  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
  ghost:
    'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
  subtle:
    'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20',
  danger:
    'bg-rose-600 text-white shadow-sm hover:bg-rose-500 active:bg-rose-700',
};

const sizes = {
  sm: 'h-8 gap-1.5 px-3 text-xs',
  md: 'h-10 gap-2 px-4 text-sm',
  icon: 'h-9 w-9',
  'icon-sm': 'h-8 w-8',
  'icon-xs': 'h-7 w-7',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  type,
  ...props
}) {
  const classes = [
    'inline-flex shrink-0 items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-40 dark:focus-visible:ring-offset-slate-950',
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    className,
  ].join(' ');

  return (
    <Component
      type={Component === 'button' ? (type ?? 'button') : type}
      className={classes}
      {...props}
    />
  );
}
