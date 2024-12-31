import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../stylesheets/AdminLogin.css'; // Import the CSS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const endpoint = `${API_URL}/api/admin/adminlogin`;

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
                setMessage("Admin Login successful!");
                console.log("Admin Login successful!")
                const userDetails = { name: data.name, email: data.email, adminID: data.adminID, isAdmin: data.isAdmin };
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("user", JSON.stringify(userDetails));
                login(userDetails);
                navigate("/admin/dashboard");
            } else {
                setMessage(data.error || "Invalid credentials!");
            }
        } catch (error) {
            setMessage("Error connecting to server!");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="admin-login-section"> {/* Added class name */}
            <div className="admin-login-container"> {/* Added class name */}
                <h2 className="admin-login-title">Admin Login</h2> {/* Added class name */}
                <form className="admin-login-form" onSubmit={handleSubmit}> {/* Added class name */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="admin-login-input" // Added class name
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="admin-login-input" // Added class name
                    />
                    <button type="submit" className="admin-login-btn">Admin Login</button> {/* Added class name */}
                    {message && <p className = "admin-login-links">{message}</p>}
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default AdminLogin;