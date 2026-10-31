import { MousePointer2 } from 'lucide-react';
import { APP_NAME } from '../config/constants';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-slate-500 sm:flex-row sm:px-6 sm:text-left lg:px-8 dark:text-slate-400">
        <p>
          {new Date().getFullYear()} {APP_NAME}. Built with React, Redux
          Toolkit &amp; Tailwind CSS.
        </p>
        <p className="flex items-center gap-1.5">
          <MousePointer2 className="h-3.5 w-3.5" aria-hidden="true" />
          Drag cards between columns. Changes save automatically.
        </p>
      </div>
    </footer>
  );
}
