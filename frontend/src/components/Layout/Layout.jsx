import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function Layout({ user }) {
  return (
    <main id='main'>
      <Navbar user={user} />
      <Outlet />
    </main>
  )
}
