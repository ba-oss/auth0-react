import { DashboardLayout } from '@/components/dashboard-layout'
import {
  AuthProvider,
  RequireAuthenticated,
  RequireUnAuthenticated,
} from '@/providers/auth'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { Callback } from './auth/callback'
import { Login } from './auth/login'
import { HomePage } from './dashboard/home'
import { InvoicesPage } from './dashboard/invoices'
import { NotFound } from './not-found'

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate replace to="/auth/login" />,
      },
      {
        path: '/auth',
        element: (
          <RequireUnAuthenticated>
            <Outlet />
          </RequireUnAuthenticated>
        ),
        children: [
          {
            path: 'login',
            element: (
              <RequireUnAuthenticated>
                <Login />
              </RequireUnAuthenticated>
            ),
          },
          {
            path: 'callback',
            element: (
              <RequireUnAuthenticated>
                <Callback />
              </RequireUnAuthenticated>
            ),
          },
        ],
      },
      {
        path: '/dashboard',
        element: (
          <RequireAuthenticated>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </RequireAuthenticated>
        ),
        children: [
          { index: true, element: <HomePage /> },
          { path: 'invoices', element: <InvoicesPage /> },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export { router }
