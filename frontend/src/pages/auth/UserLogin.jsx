import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import api from "../api";
import { useNavigate } from 'react-router-dom'


const UserLogin = () => {

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const email = e.target.email.value;
		const password = e.target.password.value;

		await api.post("/api/auth/user/login", {
			email,
			password
		}, {
			withCredentials: true
		})
    .then(response => {
      navigate("/home");
    })
    .catch(error => {
      alert("Login failed. " + (error.response?.data?.message) + " Please check your credentials and try again.");
    });

	}

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to continue to your account.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input id="email" type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input id="password" type="password" placeholder="Your password" />
          </label>

          <button className="btn-primary" type="submit">Sign in</button>
        </form>

        <footer className="auth-foot">Don't have an account? <Link to="/user/register">Register</Link></footer>
      </section>
    </main>
  )
}

export default UserLogin
