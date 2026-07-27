import React from 'react'
import { Routes, Route } from 'react-router-dom'
const AppRoutes = () => {
  return (    
    <Routes>
      {/* Public Routes */}
      <Route>
        <Route path="/" element={<div>Home</div>} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<div>Authenticated Routes</div>}>
        <Route path="/dashboard" element={<div>Dashboard</div>} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default AppRoutes