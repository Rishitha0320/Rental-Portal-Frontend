


import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function ServiceForm({ initial = {}, onSave }) {
  const [form, setForm] = useState({
    serviceName: initial.serviceName || '',
    description: initial.description || '',
    date: initial.date ? initial.date.split('T')[0] : '',
    time: initial.time || '',
    availableDays: initial.availableDays || [],
    address: initial.address || '',
    phone: initial.phone || ''
  });
  const [images, setImages] = useState([]);
    
  const weekdays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  useEffect(() => {
    setForm({
      serviceName: initial.serviceName || '',
      description: initial.description || '',
      date: initial.date ? initial.date.split('T')[0] : '',
      time: initial.time || '',
      availableDays: initial.availableDays || [],
      address: initial.address || '',
      phone: initial.phone || ''
    });
    setImages([]);
  }, [initial]);

  

  const handleCheckbox = day => {
    const updated = form.availableDays.includes(day)
      ? form.availableDays.filter(d => d !== day)
      : [...form.availableDays, day];
    setForm({...form, availableDays: updated});
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('serviceName', form.serviceName);
      data.append('description', form.description);
      data.append('date', form.date);
      data.append('time', form.time);
      data.append('availableDays', JSON.stringify(form.availableDays));
      data.append('address', form.address);
      data.append('phone', form.phone);
      images.forEach(img => data.append('images', img));

      if (initial._id) {
        await API.put(`/services/${initial._id}`, data);
      } else {
        await API.post('/services', data);
      }

      onSave();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:10 }}>
      <input name="serviceName" placeholder="Service Name" value={form.serviceName} onChange={change} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={change} />
      <input type="date" name="date" value={form.date} onChange={change} required />
      <input type="time" name="time" value={form.time} onChange={change} required />
      
      <div>
        <strong>Available Days:</strong>
        {weekdays.map(day => (
          <label key={day} style={{ marginLeft: 8 }}>
            <input type="checkbox" checked={form.availableDays.includes(day)} onChange={() => handleCheckbox(day)} /> {day}
          </label>
        ))}
      </div>

      <input name="address" placeholder="Address" value={form.address} onChange={change} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={change} required />
      <input type="file" multiple onChange={e => setImages(Array.from(e.target.files))} />

      <button type="submit">{initial._id ? 'Update' : 'Add Service'}</button>
    </form>
  );
}
