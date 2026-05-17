import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import api from "../api";
import { useNavigate } from 'react-router-dom'

const PartnerRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    await api.post("/api/auth/food-partner/register", {
      name: businessName,
      contactName,
      phone,
      email,
      password,
      address
    }, {
      withCredentials: true
    })
    .then(response => {
      navigate("/create-food");
    })
    .catch(error => {
      alert("Registration failed. " + (error.response?.data?.message) + " Please try again with a different email.");
    });

  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Partner sign up</h1>
        <p className="auth-sub">Grow your business with our platform.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Business name</span>
            <input id="businessName" type="text" placeholder="Tasty Bites" />
          </label>

          <div className="form-row">
            <label>
              <span>Contact name</span>
              <input id="contactName" type="text" placeholder="Jane Doe" />
            </label>

            <label>
              <span>Phone</span>
              <input id="phone" type="tel" placeholder="+1 555 123 4567" />
            </label>
          </div>

          <label>
            <span>Email</span>
            <input id="email" type="email" placeholder="business@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input id="password" type="password" placeholder="Create password" />
          </label>

          <label>
            <span>Address</span>
            <input id="address" type="text" placeholder="123 Market Street" />
            <small className="helper-text">Full address helps customers find you faster.</small>
          </label>

          <button className="btn-primary" type="submit">Create Partner Account</button>
        </form>

        <footer className="auth-foot" style={{marginTop:'0.9rem'}}>
          Already a partner? <Link to="/food-partner/login">Sign in</Link>
        </footer>
      </section>
    </main>
  )
}

export default PartnerRegister
