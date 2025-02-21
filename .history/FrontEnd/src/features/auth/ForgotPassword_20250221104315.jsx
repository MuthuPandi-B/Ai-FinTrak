import React, { useState } from "react";
import API from "../../Api/Api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      alert("Password reset link sent");
    } catch (error) {
      alert("Error sending reset link");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <h2>Forgot Password</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
