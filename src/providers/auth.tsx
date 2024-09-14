import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { Loader } from 'lucide-react'
import { Navigate } from 'react-router-dom'

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID

function AuthProvider({ children }: React.PropsWithChildren) {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: new URL(
          '/auth/callback',
          window.location.origin,
        ).toString(),
      }}
    >
      {children}
    </Auth0Provider>
  )
}

function RequireAuthenticated({ children }: React.PropsWithChildren) {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading)
    return (
      <Loader className="my-20 mx-auto h-14 w-14 animate-spin text-gray-400" />
    )
  if (!isAuthenticated) return <Navigate replace to="/auth/login" />

  return children
}

function RequireUnAuthenticated({ children }: React.PropsWithChildren) {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading)
    return (
      <Loader className="my-20 mx-auto h-14 w-14 animate-spin text-gray-400" />
    )
  if (isAuthenticated) return <Navigate replace to="/dashboard" />

  return children
}

export { AuthProvider, RequireAuthenticated, RequireUnAuthenticated }
