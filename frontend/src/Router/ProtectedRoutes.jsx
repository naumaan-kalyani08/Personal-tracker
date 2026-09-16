import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { isAuthenticated } from '../Utils/auth'

const ProtectedRoutes = () => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
