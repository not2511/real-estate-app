// src/components/ListingForm.js
import React, { useState } from 'react';

const ListingForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/listings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
      }),
    });

    const data = await response.json();
    onAdd(data); // update list in UI
    setFormData({ title: '', description: '', price: '', location: '' }); // reset
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <button type="submit">Add Listing</button>
    </form>
  );
};

export default ListingForm;
