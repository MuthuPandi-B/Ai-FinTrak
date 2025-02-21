import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/auth/reset-password/${resetToken}`, { password: newPassword });
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
