import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/20">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
        Error 404
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        This column does not exist
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        The page you are looking for was moved, deleted, or never created.
        Head back to the board and keep shipping.
      </p>
      <Button as={Link} to="/" className="mt-6">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to board
      </Button>
    </div>
  );
}
