import React from 'react';
import axios from 'axios';

const DoctorList = ({ doctors, fetchDoctors, setEditingDoctor }) => {
  const deleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      await axios.delete(`http://localhost:3000/doctors/${id}`);
      fetchDoctors();
    }
  };

  return (
    <div>
      <h2>Doctor List</h2>
      <ul>
        {doctors.map(doc => (
          <li key={doc._id}>
            <strong>{doc.Name}</strong> — {doc.DOB} — {doc.Designation}
            <button onClick={() => setEditingDoctor(doc)}>Edit</button>
            <button onClick={() => deleteDoctor(doc._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
