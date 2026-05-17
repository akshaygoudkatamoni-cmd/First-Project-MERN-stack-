import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import api from "../api";
import { useNavigate } from 'react-router-dom'

const PartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    await api.post("/api/auth/food-partner/login", {
      email,
      password
    }, {
      withCredentials: true
    })
    .then(response => {
      navigate("/create-food");
    }
    )
    .catch(error => {
      alert("Login failed. " + (error.response?.data?.message) + " Please check your credentials and try again.");
    });
    
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Partner sign in</h1>
        <p className="auth-sub">Access your partner dashboard.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input id="email" type="email" placeholder="business@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input id="password" type="password" placeholder="Your password" />
          </label>

          <button className="btn-primary" type="submit">Sign in</button>
        </form>

        <footer className="auth-foot">New here? <Link to="/food-partner/register">Register</Link></footer>
      </section>
    </main>
  )
}

export default PartnerLogin
