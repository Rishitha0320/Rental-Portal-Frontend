
import React, { useState } from 'react';
import API from '../api/api';

export default function RentalForm({ initial = {}, onSave }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    address: initial.address || '',
    phone: initial.phone || '',   // ✅ added phone
    price: initial.price || ''
  });
  const [images, setImages] = useState([]);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key of ['title','description','address','phone','price']) data.append(key, form[key]);
      images.forEach(img => data.append('images', img));
      let res;
      if (initial._id) res = await API.put(`/rentals/${initial._id}`, data);
      else res = await API.post('/rentals', data);
      onSave(res.data);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <input name="title" placeholder="Title" value={form.title} onChange={change} required /><br/>
      <textarea name="description" placeholder="Description" value={form.description} onChange={change} /><br/>
      <input name="address" placeholder="Address" value={form.address} onChange={change} /><br/>
      <input name="phone" placeholder="Phone Number" value={form.phone} onChange={change} /><br/>
      <input name="price" placeholder="Price" value={form.price} onChange={change} /><br/>
      <input type="file" multiple onChange={e => setImages(Array.from(e.target.files))} /><br/>
      <button type="submit">{initial._id ? 'Update' : 'Create'}</button>
    </form>
  );
}
