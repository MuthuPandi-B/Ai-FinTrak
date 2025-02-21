import React, { useState } from "react";
import API from "../../Api/Api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch =useDispatch();
  const navigate=useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      const user=response.data;
      dispatch(setUser(user));
      alert("Login successful");
      navigate
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
