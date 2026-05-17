import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'

const ChooseRegister = () => {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Welcome</h1>
        <p className="auth-sub">Choose how you'd like to continue.</p>

        <div className="auth-form" style={{gap:'0.9rem'}}>
          <Link to="/user/login" className="btn-rect">User sign in</Link>
          <Link to="/food-partner/login" className="btn-rect">Partner sign in</Link>
        </div>

        <footer className="auth-foot" style={{textAlign:'center', marginTop:'1.25rem'}}>
          <Link to="/user/register" className="link-plain">Register as User</Link>
          <span className="muted-sep">|</span>
          <Link to="/food-partner/register" className="link-plain">Register as Food Partner</Link>
        </footer>

      </section>
    </main>
  )
}

export default ChooseRegister
