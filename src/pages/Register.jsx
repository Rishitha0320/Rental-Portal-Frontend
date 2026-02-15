

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

export default function Register({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/'); // redirect to home after successful registration
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 80 }}>
      <h2>Register</h2>
      <form onSubmit={submit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: 10 }}>
          <label>Name:</label><br />
          <input
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={change}
            required
            style={{ width: '250px', padding: '6px' }}
          />
        </div>

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

        <div style={{ marginBottom: 10 }}>
          <label>Role:</label><br />
          <select
            name="role"
            value={form.role}
            onChange={change}
            style={{ width: '250px', padding: '6px' }}
          >
            <option value="user">User</option>
            <option value="landlord">Landlord</option>
            <option value="serviceprovider">Service Provider</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>

      {/* 👇 Login link */}
      <p style={{ marginTop: 20 }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
