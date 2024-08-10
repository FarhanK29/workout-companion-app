import React from 'react'
import './Home.css'
import Navbar from '../components/Navbar'

export default function Home() {

    const username = localStorage.getItem('username');
    return(
        <div className = "home-page">
            <Navbar />
            <div>Home Page</div>
        </div>
    )
}
