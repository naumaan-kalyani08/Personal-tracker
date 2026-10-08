import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { isAuthenticated, subscribeToAuthChanges } from '../Utils/auth'

const ProtectedRoutes = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  useEffect(() => subscribeToAuthChanges(() => {
    setAuthenticated(isAuthenticated());
  }), []);

  if (!authenticated) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
