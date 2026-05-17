import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister.jsx'
import UserLogin from '../pages/auth/UserLogin.jsx'
import PartnerRegister from '../pages/auth/PartnerRegister.jsx'
import PartnerLogin from '../pages/auth/PartnerLogin.jsx'
import ChooseRegister from '../pages/auth/ChooseRegister.jsx'
import Home from '../pages/general/Home.jsx'
import Saved from '../pages/general/Saved.jsx'
import MainLayout from '../components/MainLayout.jsx'
import CreateFood from '../pages/food-partner/CreateFood.jsx'
import Profile from '../pages/food-partner/profile.jsx'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<PartnerRegister />} />
                <Route path="/food-partner/login" element={<PartnerLogin />} />

                <Route element={<MainLayout/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/saved" element={<Saved/>} />
                </Route>

                <Route path="/create-food" element={<CreateFood/>} />
                <Route path="/food-partner/:id" element={<Profile/>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
