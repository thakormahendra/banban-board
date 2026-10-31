import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className="relative isolate flex min-h-dvh flex-col">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-3xl dark:bg-brand-500/10" />
        <div className="absolute -bottom-48 -right-24 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/5" />
        <div className="absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/5" />
      </div>

      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
