

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Rentals from './pages/Rentals';
import Services from './pages/Services';
import CommunityPage from './pages/Community';

function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const navigate = useNavigate();

  // Save user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // 👇 Automatically redirect to login if user not logged in
  // useEffect(() => {
  //   if (!user) navigate('/login');
  // }, [user, navigate]);

  useEffect(() => {
  const currentPath = window.location.pathname;
  if (!user && currentPath !== '/login' && currentPath !== '/register') {
    navigate('/login');
  }
}, [user, navigate]);


  return (
    <div style={{ padding: 20 }}>
      {/* 🧭 Show navbar only if logged in */}
      {user && (
        <nav style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/community">Community</Link>
          <span>Hi, {user.name} ({user.role})</span>
          <button onClick={logout}>Logout</button>
        </nav>
      )}
 
      {/* 🚀 Routes */}   

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        {/* Protected pages (only visible after login) */}
        {user && (
          <>
            <Route path="/" element={<Rentals user={user} setUser={setUser} />} />
            <Route path="/services" element={<Services user={user} setUser={setUser} />} />
            <Route path="/community" element={<CommunityPage user={user} setUser={setUser} />} />
          </>
        )}
        
      </Routes>
    </div>
  );
}

export default App;
