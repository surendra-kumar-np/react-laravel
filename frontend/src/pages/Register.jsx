// frontend/src/pages/Register.jsx
import { useState } from 'react';
import { register } from '../services/auth';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '', // 👈 required for Laravel
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered successfully!');
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
        <input name="password_confirmation" type="password" placeholder="Confirm Password" onChange={handleChange} /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
