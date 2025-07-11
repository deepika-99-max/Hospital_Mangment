import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorForm = ({ fetchDoctors, editingDoctor, setEditingDoctor }) => {
  const [formData, setFormData] = useState({ Name: '', DOB: '', Designation: '' });

  useEffect(() => {
    if (editingDoctor) {
      setFormData(editingDoctor);
    }
  }, [editingDoctor]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDoctor?._id) {
        await axios.put(`http://localhost:3000/doctors/${editingDoctor._id}`, formData);
        setEditingDoctor(null);
      } else {
        await axios.post('http://localhost:3000/doctors', formData);
      }
      setFormData({ Name: '', DOB: '', Designation: '' });
      fetchDoctors();
    } catch (err) {
      alert('Error submitting form');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</h2>
      <input name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" required />
      <input name="DOB" value={formData.DOB} onChange={handleChange} placeholder="DOB (dd/mm/yyyy)" required />
      <input name="Designation" value={formData.Designation} onChange={handleChange} placeholder="Designation" required />
      <button type="submit">{editingDoctor ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default DoctorForm;
