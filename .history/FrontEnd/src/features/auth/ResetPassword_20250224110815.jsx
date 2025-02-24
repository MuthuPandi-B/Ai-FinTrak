import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../Api/Api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const Navigate = useNavigate(); 
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post(`/auth/reset-password/${resetToken}`, { newPassword });
      alert("Password reset successful");
    } catch (error) {
      setError("Error resetting password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="bg-gray-800 text-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Reset Password</h2>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
        className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
      />
      <button
        type="submit"
        className={`w-full p-2 mb-4 rounded ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"}`}
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ResetPassword;
