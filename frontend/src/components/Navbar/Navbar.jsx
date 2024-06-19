import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ user }) {
    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to={'/'}>
                    <img src="/images/logo/chupacabra-project-logo.png" alt="logo" />
                </Link>
            </div>
            <div className='navbar-links'>
                <Link to='/'>Home</Link>
                <Link to='/selecthero'>Select A Hero</Link>
                <Link to='/herodashboard'>Hero Dashboard</Link>
                {user && user.admin ? <Link to='/edit'>Edit</Link> : null}
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>
        </nav>
    )
}
