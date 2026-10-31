import { Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch, setSearch } from '../redux/filterSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  return (
    <div role="search" className="relative w-full lg:max-w-sm">
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <input
        type="search"
        value={search}
        onChange={(event) => dispatch(setSearch(event.target.value))}
        placeholder="Search tasks by title..."
        aria-label="Search tasks by title"
        className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      {search && (
        <button
          type="button"
          onClick={() => dispatch(setSearch(''))}
          aria-label="Clear search"
          title="Clear search"
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
