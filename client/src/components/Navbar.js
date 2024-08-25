import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
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
                {/* <div className = "navbar-username">{username}</div>
                 */}
                <Link to = "/workout" className = "link-button">Log a Workout</Link>
                <Link to = "/progress" className = "link-button">Progress</Link>
                <span onClick = {handleLogout} className = "link-button" id = "logout-btn">Logout</span>
            </div>
    </nav>
  )
}
