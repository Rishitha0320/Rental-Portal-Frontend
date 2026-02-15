
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form); 
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/'); 
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 80 }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: 10 }}>
          <label>Email:</label><br />
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={change}
            required
            style={{ width: '250px', padding: '6px' }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password:</label><br />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={change}
            required
            style={{ width: '250px', padding: '6px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>

      {/* 👇 Register button */}
      <p style={{ marginTop: 20 }}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
