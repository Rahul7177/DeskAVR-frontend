import React, { useState } from "react";
import "../stylesheets/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import Auth Context

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login function from AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = formData;
  
    if (!email || !password) {
      setMessage("All fields are required!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage("Login successful!");
        const userDetails = { name: data.name, email: data.email }; // Extract user details
        localStorage.setItem("authToken", data.token); // Save token
        localStorage.setItem("user", JSON.stringify(userDetails)); // Save user details
        login(userDetails); // Update AuthContext with user details
        navigate("/"); // Redirect after login
      } else {
        setMessage(data.error || "Invalid credentials!");
      }
    } catch (error) {
      setMessage("Error connecting to server!");
    }
  };
  

  return (
    <div className="login-section">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          <div className="login-links">
            <Link to="/">Forgot Password?</Link>
            <Link to="/signup">Signup Instead</Link>
          </div>
          {message && <p style={{ color: "#fad94b" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
