import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthSplash from './AuthSplash'

// Gate for authenticated-only routes. Redirects guests to /login,
// remembering where they were headed so login can return them.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <AuthSplash />
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}

// Inverse gate: keeps signed-in users out of the auth pages.
export function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <AuthSplash />
  if (isAuthenticated) {
    const to = location.state?.from?.pathname ?? '/'
    return <Navigate to={to} replace />
  }
  return children
}
