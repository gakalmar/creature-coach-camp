import React from 'react';
import { useState } from 'react'
import './Login.css';
import loginUser from '../../services/loginUser';
import { useNavigate } from 'react-router-dom';
export default function Login({ setUser, user }) {

    //Feature hooks
    const navigate = useNavigate();

    //States
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    //Event handlers
    async function handleLogin(e) {
        e.preventDefault()
        const messageBody = { user_name: userName, user_password: userPassword };

        const data = await loginUser(messageBody);

        if (!data.error) {
            setUser(data);
            navigate('/');
        }
    };

    async function handleLogout() {
        setUser({ loggedIn: false });
        navigate('/');
    };

    return (
        <> {!user.loggedIn ?
            <div className='login-container'>
                <div className='login-form'>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="userName">Username:</label>
                        <input id="userName" name="userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <label htmlFor="userPassword">Password:</label>
                        <input id="userPassword" name="userPassword" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                        <div className='login-btn-container'>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            :
            <div className='login-container'>
                <h1>You are already logged in!</h1>
                <div className='login-btn-container'>
                    <button onClick={() => handleLogout()}>Log Out</button>
                </div>
            </div>
        }
        </>
    )
}
