

import React, { useState, useEffect } from 'react';
import API from '../api/api';
import ServiceForm from '../components/ServiceForm';

export default function Services({ user }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all services
  // const fetchServices = async () => {
  //   try {
  //     const res = await API.get('/services'); 
  //     setServices(res.data);
  //   } catch (err) {
  //     console.error('Error fetching services:', err);
  //     alert('Failed to fetch services');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchServices = async () => {
  try {
    const res = await API.get('/services'); 
    console.log('Services fetched:', res.data);  // <-- Add this
    setServices(res.data);
  } catch (err) {
    console.error('Error fetching services:', err);
    alert('Failed to fetch services');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => { fetchServices(); }, []);

  const handleCreateClick = () => { setEditing(null); setShowForm(true); };
  const handleEdit = (s) => { setEditing(s); setShowForm(true); };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await API.delete(`/services/${id}`);
      setServices(services.filter(s => s._id !== id));
      alert('Deleted');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const onSave = () => { setShowForm(false); fetchServices(); };

  // Filter services by serviceName, address, or phone
  const filteredServices = services.filter(s => {
    const nameMatch = s.serviceName?.toLowerCase().includes(searchTerm.toLowerCase());
    const addressMatch = s.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = s.phone?.includes(searchTerm);
    return nameMatch || addressMatch || phoneMatch;
  });

  if (loading) return <p style={{ textAlign:'center', marginTop:50 }}>Loading services...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign:'center', marginBottom: 20 }}>🛠️ Available Services</h2>

      {/* Service Provider: create button */}
      {user?.role === 'serviceprovider' && (
        <div style={{ textAlign:'center', marginBottom:15 }}>
          <button onClick={handleCreateClick} style={{ padding:'8px 12px', cursor:'pointer' }}>+ Add New Service</button>
        </div>
      )}

      {/* Search input */}
      <div style={{ textAlign:'center', marginBottom:20 }}>
        <input
          type="text"
          placeholder="Search by service, address, or phone..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding:'8px', width:'80%', maxWidth:400, borderRadius:6, border:'1px solid #ccc' }}
        />
      </div>

      {/* Service Form */}
      {showForm && (
        <div style={{ border:'1px solid #ccc', padding:15, marginBottom:20 }}>
          <ServiceForm initial={editing || {}} onSave={onSave} />
          <button onClick={() => setShowForm(false)} style={{ marginTop:10 }}>Cancel</button>
        </div>
      )}

      {/* Services Grid */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',
        gap:'20px'
      }}>
        {filteredServices.length > 0 ? filteredServices.map(s => (
          <div key={s._id} style={{
            border:'1px solid #ddd',
            borderRadius:'12px',
            padding:'15px',
            backgroundColor:'#f9f9f9',
            boxShadow:'0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {/* Images */}
            {s.images?.length > 0 && (
              <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:8 }}>
                {s.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:8000'}/uploads/${img}`}
                    alt={`Service ${idx + 1}`}
                    style={{ width:250, height:180, objectFit:'cover', borderRadius:10, flexShrink:0 }}
                  />
                ))}
              </div>
            )}

            {/* Service Info */}
            <h3 style={{ margin:'10px 0', color:'#333' }}>{s.serviceName || 'No Title'}</h3>
            <p style={{ color:'#555' }}><strong>Date:</strong> {s.date ? new Date(s.date).toLocaleDateString() : 'N/A'}</p>
            <p style={{ color:'#555' }}><strong>Time:</strong> {s.time || 'N/A'}</p>
            <p style={{ color:'#555' }}><strong>Days:</strong> {s.availableDays?.join(', ') || 'N/A'}</p>
            <p style={{ color:'#555' }}><strong>Address:</strong> {s.address || 'N/A'}</p>
            {s.address && (
              <iframe
                title={`map-${s._id}`}
                width="100%"
                height="150"
                style={{ borderRadius:'8px', border:'none', marginTop:'10px' }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(s.address)}&output=embed`}
              ></iframe>
            )}
            <p style={{ color:'#555' }}><strong>Phone:</strong> {s.phone || 'N/A'}</p>

            {/* Owner CRUD buttons */}
            {user && user.role === 'serviceprovider' && user.id === s.createdBy?._id && (
              <div style={{ marginTop:8, display:'flex', gap:8 }}>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </div>
            )}
          </div>
        )) : (
          <p style={{ textAlign:'center', color:'#888' }}>No services match your search.</p>
        )}
      </div>
    </div>
  );
}
