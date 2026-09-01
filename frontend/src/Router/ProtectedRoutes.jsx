import React from 'react'
import { Navigate, Outlet } from 'react-router'

const isAuthenticated = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}')
    return Boolean(auth?.access_token)
  } catch {
    return false
  }
}

const ProtectedRoutes = () => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
