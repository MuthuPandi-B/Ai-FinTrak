import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API  from "../../Api/Api";

const ResetPassword = () => {
  const { resetToken } = useParams();
  console
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/auth/reset-password/${resetToken}`, { password: newPassword });
      alert("Password reset successful");
    } catch (error) {
      alert("Error resetting password");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <h2>Reset Password</h2>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
