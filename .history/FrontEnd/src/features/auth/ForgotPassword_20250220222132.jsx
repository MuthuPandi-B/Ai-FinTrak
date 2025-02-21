import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email); // Add logic for sending reset password link
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
