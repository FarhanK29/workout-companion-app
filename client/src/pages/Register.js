import React from 'react'
import './Register.css';
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch('/api/register', {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        })
        const json = await response.json();
        if(!response.ok || (username === '' || password === '')){
            setError(json.error)
        }
        else{
            setUsername('');
            setPassword('');
            setError(null)
           console.log("New user added")
            navigate("/login");
        }
    }
    return(
        <div className = "registration-page">
            <h3 className = "workout-header">Workout Companion</h3>
            <div className = "registration-box">
                <h1>Create New Account</h1>

                <form className = "registration-form" onSubmit = {handleSubmit}>
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
                    <div className = "registration-button-container">
                        <button className = "register-button">Register</button>
                    </div>
                    {error && <div className = "registration-error">{error}</div>}
                    <h3>Already have an account? <Link className= "login-link" to = "/login"> Login here</Link></h3>

                </form>
            </div>
        </div>
    )    
}

export default Register;