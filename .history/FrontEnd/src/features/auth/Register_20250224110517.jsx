import React, { useState } from "react";
import API from "../../Api/Api";
import {use } from "react-router-dom";

const Register = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registration successful");
      Navigate("/login");
    } catch (error) {
      setError("Registration failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="bg-gray-800 text-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
      />
      <button
        type="submit"
        className={`w-full p-2 mb-4 rounded ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"}`}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default Register;
