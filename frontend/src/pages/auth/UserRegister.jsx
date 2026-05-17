import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';
import api from "../api";
import { useNavigate } from 'react-router-dom'; // to navigate to the home page after successful registration


const UserRegister = () => {

	const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        

        await api.post("/api/auth/user/register",{
            fullName,
            email,
            password
        }, {  
			        withCredentials: true // to include cookies in the request
		    })
        .then(response => {

            navigate("/home");

        })
        .catch(error => {
          alert("Registration failed. " + (error.response?.data?.message) + " Please try again.");
        });
    }

    return (
        <main className="auth-page">
          <section className="auth-card">
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-sub">Sign up as a user to start ordering delicious food.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input id="fullName" type="text" placeholder="Full name" />
              </label>

              <label>
                <span>Email</span>
                <input id="email" type="email" placeholder="you@example.com" />
              </label>

              <label>
                <span>Password</span>
                <input id="password" type="password" placeholder="Choose a password" />
              </label>

              <button className="btn-primary" type="submit">Create account</button>
            </form>

            <footer className="auth-foot">Already have an account? <Link to="/user/login">Sign in</Link></footer>
          </section>
        </main>
  )
}

export default UserRegister
