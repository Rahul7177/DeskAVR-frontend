import React, { useState } from "react";
import '../stylesheets/Signup.css';
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#fad94b"); // Custom color for feedback messages

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;
    console.log("formData:", formData);
    // Validate form fields
    if (!name || !email || !phone || !password || !confirmPassword) {
      setMessage("All fields are required!");
      setMessageColor("#ff4d4f"); // Error color
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageColor("#ff4d4f");
      return;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setMessage("Phone number must be 10 digits!");
      setMessageColor("#ff4d4f");
      return;
    }

    // Submit data to the backend
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password }), // Send form data to backend
      });
      
      console.log("response:", response);
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Signup successful!");
        setMessageColor("#4caf50"); // Success color
        setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" }); // Reset form
      } else {
        setMessage(data.error || "Error during signup!");
        setMessageColor("#ff4d4f");
      }
    } catch (error) {
      setMessage("Error connecting to server!");
      setMessageColor("#ff4d4f");
    }
  };

  return (
    <div className="signup-section">
      <div className="signup-container">
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name" className="input-label">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="signup-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="signup-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone" className="input-label">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="signup-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="signup-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="signup-input"
            />
          </div>

          <button type="submit" className="signup-btn">Signup</button>
          <div className="signup-links">
            <Link to="/">Need help?</Link>
            <Link to="/login">Login Instead</Link>
          </div>
          {message && (
            <p style={{ color: messageColor, fontWeight: "bold" }}>{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
