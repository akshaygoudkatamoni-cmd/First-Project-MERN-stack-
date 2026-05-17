import React, { useEffect, useRef, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import '../styles/reels.css'

const order = { '/home': 0, '/saved': 1 }

const MainLayout = () => {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const [dir, setDir] = useState('forward')

  useEffect(() => {
    const prevIdx = order[prevPath.current] ?? 0
    const nextIdx = order[location.pathname] ?? 0
    setDir(nextIdx >= prevIdx ? 'forward' : 'back')
    prevPath.current = location.pathname
  }, [location.pathname])

  return (
    <>
      <div className="page">
        <div className={`page-inner ${dir === 'forward' ? 'slide-left' : 'slide-right'}`}>
          <Outlet />
        </div>
      </div>

      <nav className="bottom-nav" aria-label="primary">
        <Link to="/home" className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" stroke="white" strokeWidth="1.2"/></svg>
          <span>home</span>
        </Link>
        <Link to="/saved" className={`nav-item ${location.pathname === '/saved' ? 'active' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 2h9l3 3v16l-8-4-8 4V2z" stroke="white" strokeWidth="1.2"/></svg>
          <span>saved</span>
        </Link>
      </nav>
    </>
  )
}

export default MainLayout
