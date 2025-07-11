import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import type { ReactNode } from 'react'

type ProtectedRouteProps = {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuthContext()
  const location = useLocation()

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default ProtectedRoute
