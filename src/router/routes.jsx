import MainLayout from '../layouts/MainLayout';
import BoardPage from '../pages/BoardPage';
import NotFound from '../pages/NotFound';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <BoardPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
