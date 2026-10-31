import { ChevronDown, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { COLUMNS, PRIORITIES } from '../config/constants';
import {
  resetFilters,
  selectFilters,
  setPriority,
  setStatus,
} from '../redux/filterSlice';
import Button from './Button';

const baseSelectClass =
  'h-10 w-full appearance-none rounded-xl border py-0 pl-3 pr-9 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950';

const activeSelectClass =
  'border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300';

const idleSelectClass =
  'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800';

function FilterSelect({ label, value, onChange, isActive, children }) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={onChange}
        className={`${baseSelectClass} ${
          isActive ? activeSelectClass : idleSelectClass
        }`}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
    </div>
  );
}

export default function FilterBar() {
  const dispatch = useDispatch();
  const { priority, status } = useSelector(selectFilters);
  const hasFilters = priority !== 'all' || status !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="hidden items-center gap-1.5 text-xs font-medium text-slate-500 sm:flex dark:text-slate-400">
        <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
        Filters
      </span>
      <FilterSelect
        label="Filter by priority"
        value={priority}
        onChange={(event) => dispatch(setPriority(event.target.value))}
        isActive={priority !== 'all'}
      >
        <option value="all">All priorities</option>
        {PRIORITIES.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </FilterSelect>
      <FilterSelect
        label="Filter by status"
        value={status}
        onChange={(event) => dispatch(setStatus(event.target.value))}
        isActive={status !== 'all'}
      >
        <option value="all">All statuses</option>
        {COLUMNS.map((column) => (
          <option key={column.id} value={column.id}>
            {column.title}
          </option>
        ))}
      </FilterSelect>
      {hasFilters && (
        <Button
          variant="ghost"
          size="md"
          onClick={() => dispatch(resetFilters())}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </Button>
      )}
    </div>
  );
}
