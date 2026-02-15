
import React from 'react';

export default function ServiceCard({ service, user, onEdit, onDelete }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 12,
      padding: 15,
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '10px 0' }}>{service.serviceName}</h3>
      <p>{service.description}</p>
      <p><strong>Date:</strong> {service.date ? new Date(service.date).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Time:</strong> {service.time || 'N/A'}</p>
      <p><strong>Days:</strong> {service.availableDays?.join(', ') || 'N/A'}</p>
      <p><strong>Address:</strong> {service.address}</p>
      <p><strong>Phone:</strong> {service.phone}</p>

      {service.images?.length > 0 && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginTop: 5 }}>
          {service.images.map((img, i) => (
            <img
              key={i}
              src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/uploads/${img}`}
              alt={`Service ${i+1}`}
              style={{ width: 250, height: 180, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }}
            />
          ))}
        </div>
      )}

      {user?.role === 'serviceprovider' && user.id === service.createdBy?._id && (
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button onClick={() => onEdit(service)}>Edit</button>
          <button onClick={() => onDelete(service._id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
