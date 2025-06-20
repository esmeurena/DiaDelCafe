import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import OrderOnlinePage from '../components/OrderOnlinePage';
import UserDashboard from '../components/UserDashboard';
import CreateMenuItemPage from '../components/CreateMenuItemPage';
import UpdateMenuItemPage from '../components/UpdateMenuItemPage';
import UpdateUserDashboard from '../components/UpdateUserDashboard';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/order",
        element: <OrderOnlinePage />,
      },
      {
        path: "/dashboard",
        element: <UserDashboard />
      },
      {
        path: "/createMenuItem",
        element: <CreateMenuItemPage />
      },
      {
        path: "/menu_items/:id/update",
        element: <UpdateMenuItemPage />
      },
      {
        path: "/users/:id/update",
        element: <UpdateUserDashboard />
      }
    ],
  },
]);
