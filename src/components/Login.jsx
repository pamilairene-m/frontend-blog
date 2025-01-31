import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://backend-blog-2-0fo9.onrender.com/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);  
      localStorage.setItem("userEmail", res.data.user.email);  // Store email
      onLogin(res.data.user.id);
      navigate("/profile");  // Redirect to Profile Page
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  

  return (
    
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>

      <div className="or-separator"><span>OR</span></div>

      <button onClick={() => navigate("/signup")} className="create-account-btn">
        Create Account
      </button>
    </div>
    
  );
};

export default Login;  