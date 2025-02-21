import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Add your registration logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
