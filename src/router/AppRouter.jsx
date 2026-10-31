import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

const router = createBrowserRouter(routes, { basename });

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
