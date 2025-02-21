import React, { useState } from "react";
import API from "../../Api/Api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/forgot-password", { email });
      alert("Password reset link sent");
    } catch (error) {
      setError("Error sending reset link");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleForgotPassword} className="bg-gray-800 text-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Forgot Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
      />
      <button
        type="submit"
        className={`w-full p-2 mb-4 rounded ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"}`}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ForgotPassword;
