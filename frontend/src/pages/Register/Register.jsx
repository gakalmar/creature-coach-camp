import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css';
import postUser from '../../services/postUser';
export default function Register({ setUser, user }) {

    //Feature hooks
    const navigate = useNavigate();

    //States
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    //Event handlers
    async function handleRegister(e) {
        e.preventDefault()
        const messageBody = { user_name: userName, user_password: userPassword };
        const data = await postUser(messageBody);
    };

    async function handleLogout() {
        setUser({ loggedIn: false });
        navigate('/');
    };

    return (
        <>{!user.loggedIn ?
            <div className='register-container'>
                <div className='register-form'>
                    <form onSubmit={handleRegister}>
                        <label htmlFor="userName">Username:</label>
                        <input id="userName" name="userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <label htmlFor="userPassword">Password:</label>
                        <input id="userPassword" name="userPassword" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                        <div className='register-btn-container'>
                            <button type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div >
            :
            <div className='login-container'>
                <h1>You are already logged in!</h1>
                <div className='register-btn-container'>
                    <button onClick={() => handleLogout()}>Log Out</button>
                </div>
            </div>
        }
        </>
    )
}
