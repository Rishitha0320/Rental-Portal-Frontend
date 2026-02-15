

import React, { useState, useEffect } from 'react';
import API from '../api/api';
import RentalForm from '../components/RentalForm';

export default function Rentals({ user }) {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch rentals from backend
  const fetchRentals = async () => {
    try {
      const res = await API.get('/rentals');
      setRentals(res.data);
    } catch (err) {
      console.error('Error fetching rentals:', err);
      alert('Failed to fetch rentals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRentals(); }, []);

  const handleCreateClick = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (r) => {
    setEditing(r);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this rental?')) return;
    try {
      await API.delete(`/rentals/${id}`);
      setRentals(rentals.filter(r => r._id !== id));
      alert('Deleted');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const onSave = () => {
    setShowForm(false);
    fetchRentals();
  };

  // Filter rentals based on search term (address or price)
  const filteredRentals = rentals.filter(r => {
    const addressMatch = r.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const priceMatch = r.price?.toString().includes(searchTerm);
    return addressMatch || priceMatch;
  });

  if (loading) return <p style={{ textAlign: 'center', marginTop: 50 }}>Loading rentals...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>🏠 Available Rentals</h2>

      {/* Landlord: create button */}
      {user?.role === 'landlord' && (
        <div style={{ textAlign: 'center', marginBottom: 15 }}>
          <button onClick={handleCreateClick} style={{ padding: '8px 12px', cursor: 'pointer' }}>+ Post New Rental</button>
        </div>
      )}

      {/* Search input */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by address or price..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '80%', maxWidth: 400, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </div>

      {/* Rental Form */}
      {showForm && (
        <div style={{ border: '1px solid #ccc', padding: 15, marginBottom: 20 }}>
          <RentalForm initial={editing || {}} onSave={onSave} />
          <button onClick={() => setShowForm(false)} style={{ marginTop: 10 }}>Cancel</button>
        </div>
      )}

      {/* Rentals Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {filteredRentals.length > 0 ? filteredRentals.map(r => (
          <div key={r._id} style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {/* Images */}
            {r.images?.length > 0 && (
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
                {r.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:8000'}/uploads/${img}`}
                    alt={`Rental ${idx + 1}`}
                    style={{ width: 250, height: 180, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }}
                  />
                ))}
              </div>
            )}

            {/* Rental Info */}
            <h3 style={{ margin: '10px 0', color: '#333' }}>{r.title || 'No Title'}</h3>
            <p style={{ color: '#555' }}><strong>Owner:</strong> {r.owner?.name || 'N/A'}</p>
            <p style={{ color: '#555' }}><strong>Phone:</strong> {r.phone || 'N/A'}</p>
            <p style={{ color: '#555' }}><strong>Address:</strong> {r.address || 'N/A'}</p>
            {r.address && (
              <iframe
                title={`map-${r._id}`}
                width="100%"
                height="150"
                style={{ borderRadius: '8px', border: 'none', marginTop: '10px' }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(r.address)}&output=embed`}
              ></iframe>
            )}
            <p style={{ color: '#555' }}><strong>Rent Price:</strong> ₹{r.price || 'N/A'}</p>
            <p style={{ color: '#444', marginTop: 10 }}><strong>Description:</strong> {r.description || 'No description provided'}</p>

            {/* Landlord CRUD buttons */}
            {user && user.role === 'landlord' && user.id === r.owner?._id && (
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(r)}>Edit</button>
                <button onClick={() => handleDelete(r._id)}>Delete</button>
              </div>
            )}
          </div>
        )) : (
          <p style={{ textAlign: 'center', color: '#888' }}>No rentals match your search.</p>
        )}
      </div>
    </div>
    
  );
}
