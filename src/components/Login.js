import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../stylesheets/Login.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const API_URL = process.env.REACT_APP_API_URL;
    console.log(API_URL);
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
            const endpoint = `${API_URL}/api/users/login`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login successful!");
                const userDetails = { name: data.name, email: data.email, userID: data.userID, isAdmin: data.isAdmin };
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("user", JSON.stringify(userDetails));
                login(userDetails);
                navigate("/");
            } else {
                setMessage(data.error || "Invalid credentials!");
            }
        } catch (error) {
            setMessage("Error connecting to server!");
        }
    };

    const handleAdminLoginClick = () => {
        navigate("/adminlogin");
    };

    return (
        <div className="login-section">
            <div className="login-container">
                <h2 className="login-title">User Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="login-input" />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="login-input" />
                    <button type="submit" className="login-btn">Login</button>
                    <button type="button" className="login-btn" onClick={handleAdminLoginClick}>Login as Admin</button>
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