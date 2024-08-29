import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const handleLogout = async (event) =>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    }

    return (
    <nav className = "navbar-container">
            <Link to = "/" className = "link-button">Workout Companion</Link>
            <div className = "navbar-links-container">
                <div>Welcome Back {username}</div>
                <span onClick = {handleLogout} className = "link-button" id = "logout-btn">Logout</span>
            </div>
    </nav>
  )
}
