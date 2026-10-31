import { Link, NavLink } from 'react-router-dom';
import { LayoutGrid, Moon, Sun } from 'lucide-react';
import logo from '../assets/logo.svg';
import { APP_NAME } from '../config/constants';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
        >
          <img
            src={logo}
            alt=""
            width="36"
            height="36"
            className="h-9 w-9 rounded-xl shadow-sm transition-transform duration-200 group-hover:-rotate-3"
          />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              {APP_NAME}
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
              Kanban board
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <NavLink
            to="/"
            end
            aria-label="Board"
            className={({ isActive }) =>
              `inline-flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }`
            }
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Board</span>
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? 'Switch to light theme' : 'Switch to dark theme'
            }
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-offset-slate-950"
          >
            {isDark ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
