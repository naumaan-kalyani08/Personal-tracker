import React from 'react'
import { Routes, Route } from 'react-router'
import PublicLayout from '../Layouts/PublicLayout'
import AppLayout from '../Layouts/Applayout'
import ProtectedRoutes from './ProtectedRoutes'
import Index from '../Pages/Index'
import LoginPage from '../Pages/LoginPage'
import RegistrationPage from '../Pages/RegistrationPage'
import PageNotFound from '../Pages/PageNotFound'
import DashboardPage from '../Pages/DashboardPage'
import ProfilePage from '../Pages/ProfilePage'
import AccountSettings from '../Pages/AccountSettings'

const AppRouter = () => {
  return (
    <Routes>
      {/* Public pages without a shell */}
      <Route element={<PublicLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
      </Route>

      {/* Public pages with header/footer/sidebar */}
      <Route element={<AppLayout />}>
        <Route path='/' element={<Index />} />
        <Route path='/about' element={<div>About Page</div>} />
        <Route path='/contact' element={<div>Contact Page</div>} />
      </Route>

      {/* Protected pages with header/footer/sidebar */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path ='/account-settings' element={<AccountSettings />} />
        </Route>
      </Route>

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRouter
