import React from 'react'
import { Navigate, Outlet } from 'react-router'

const isAuthenticated = () => {
  return Boolean(localStorage.getItem('access_token'))
}

const ProtectedRoutes = () => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
