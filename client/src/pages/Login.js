import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
const Login = () =>{
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);

    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch('/api/login', {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        })
        console.log(response)
        const json = await response.json();
        if(!response.ok){
            setError(json.error)
        }
        else{

            console.log("Got the token:", json.data)
            localStorage.setItem('token', json.data)
            localStorage.setItem('username', username)
            setUsername('');
            setPassword('');
            setError(null)
            navigate('/')
        }
    }


    return(
        <div className = "login-page">
            <h3 className = "workout-header">Workout Companion</h3>
            <div className = "login-box">
                <h1>Login</h1>

                <form className = "login-form" onSubmit = {handleSubmit}>
                    <label>Username</label>
                    <input
                        className = "username-input"
                        value = {username} 
                        type = "text"
                        onChange = {(e) => {setUsername(e.target.value)}}
                        // required placeholder = "Username"
                    />
                    
                    <label>Password</label>
                    <input
                        className = "password-input" 
                        type = "password"
                        onChange = {(e) => {setPassword(e.target.value)}}
                        value = {password}
                        // required placeholder = "Password"
                    />
                    <div className = "login-button-container">
                        <button className = "login-button">Login</button>
                    </div>
                    {error && <div className = "login-error">{error}</div>}
                    <h3><Link className = "forgot-password-link">Forgot Password?</Link></h3>
                    <div className = "registration-redirect">Don't have an account? <Link className = "registration-link" to = "/register" >Register Here</Link></div>
                </form>
            </div>
        </div>
    )    
}

export default Login;