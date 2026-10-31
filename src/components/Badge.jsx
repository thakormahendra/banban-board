export default function Badge({
  children,
  className = '',
  dotClassName,
  icon: Icon,
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}
    >
      {dotClassName && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotClassName}`}
          aria-hidden="true"
        />
      )}
      {Icon && <Icon className="h-3 w-3" aria-hidden="true" />}
      {children}
    </span>
  );
}
