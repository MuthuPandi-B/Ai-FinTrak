import React, { useState } from "react";
import API from "../../Api/Api";

const Register = () => {
  const[name,setName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name,email, password });
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>

      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
