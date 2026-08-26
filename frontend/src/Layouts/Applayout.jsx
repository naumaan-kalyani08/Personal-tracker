import React from 'react'
import { Link, Outlet,useNavigate } from 'react-router'
import { EllipsisVerticalIcon } from "@animateicons/react/lucide";
const Applayout = () => {
  const navigate = useNavigate()
  const LogoutUser =()=>{
    localStorage.removeItem('access_token')
    navigate('/login')
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '16px', background: '#111827', color: '#fff' }}>
        <div className="flex justify-between items-center">

          <nav style={{ display: 'flex', gap: '16px' }}>
            <Link to='/' style={{ color: '#fff' }}>Home</Link>
            <Link to='/about' style={{ color: '#fff' }}>About</Link>
            <Link to='/contact' style={{ color: '#fff' }}>Contact</Link>
            <Link to='/dashboard' style={{ color: '#fff' }}>Dashboard</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="avatar bg-red-100 rounded-full p-1 w-10 h-10"></div>
            <div className="" onClick={LogoutUser}> <EllipsisVerticalIcon
  size={20}
  duration={0.75}
  color="#ffffff"
/></div>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '220px', padding: '24px', background: '#f3f4f6' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/contact'>Contact</Link>
          </nav>
        </aside>

        <main style={{ flex: 1, padding: '24px' }}>
          <Outlet />
        </main>
      </div>

      <footer style={{ padding: '16px', background: '#e5e7eb', textAlign: 'center' }}>
        Footer
      </footer>
    </div>
  )
}

export default Applayout
