import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ token, password }); // Add password reset logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
