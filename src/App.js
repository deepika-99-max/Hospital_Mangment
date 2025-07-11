import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorForm from './components/DoctorForm';
import DoctorList from './components/DoctorList';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const fetchDoctors = async () => {
    const res = await axios.get('http://localhost:3000/doctors');
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="App">
      <h1>Hospital Management</h1>
      <DoctorForm fetchDoctors={fetchDoctors} editingDoctor={editingDoctor} setEditingDoctor={setEditingDoctor} />
      <DoctorList doctors={doctors} fetchDoctors={fetchDoctors} setEditingDoctor={setEditingDoctor} />
    </div>
  );
}

export default App;
