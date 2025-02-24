import React, { useState } from "react";
import API from "../../Api/Api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await API.post("/auth/login", { email, password });
     const{user,token}=response.data;

      localStorage.setItem("token", token);
      dispatch(setUser({user,token}));
      alert("Login successful");
      navigate("/");
    } catch (error) {
      setError("Login failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-gray-800 text-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
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
        {loading ? "Logging in..." : "Login"}
      </button>
      <p>Don't have an account? <Link to ="/register">Register</Link></p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default Login;
