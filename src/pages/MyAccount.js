import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from 'axios'; // Import axios
import "../stylesheets/MyAccount.css";

const MyAccount = () => {
  const { user, logout } = useAuth();
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [message, setMessage] = useState("");
  const [key, setKey] = useState(null); // State to store user's key

  
  useEffect(() => {
    const fetchUserKey = async () => {
      if (!user) return; // Don't fetch if no user
  
      try {
        if (user && user.userID) { // Check if user and userID exist
          const response = await axios.get(`http://localhost:5000/api/users/${user.userID}`);
          console.log(response.data);
          setKey(response.data.key); // Set the key in state
        }
      } catch (error) {
        console.error('Error fetching user key:', error);
        setMessage('Failed to retrieve key. Please try again later.');
      }
    };
  
    fetchUserKey();
  }, [user]);

  // Handle password change logic (Placeholder)
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage("Password change feature is coming soon.");
  };

  console.log(user);

  // Render fallback if user is not logged in
  if (!user) {
    return (
      <div className="my-account-page">
        <div className="my-account-container">
          <h2 className="my-account-title">My Account</h2>
          <p className="my-account-message">
            You are not logged in. Please log in to view your account details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-account-page">
      <div className="my-account-container">
        <h2 className="my-account-title">My Account</h2>

        {/* Display user details */}
        <div className="account-details">
          <p>
            <strong>User ID:</strong> {user.userID}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {key && ( // Conditionally render key only if fetched
            <p>
              <strong>Key:</strong> {key}
            </p>
          )}
        </div>

        {/* Password Change Section */}
        <button
          className="toggle-password-btn"
          onClick={() => setIsPasswordChanging(!isPasswordChanging)}
        >
          {isPasswordChanging ? "Cancel" : "Change Password"}
        </button>
        {isPasswordChanging && (
          <form className="password-change-form" onSubmit={handlePasswordChange}>
            <input
              type="password"
              className="password-input"
              placeholder="Enter new password"
              required
            />
            <button type="submit" className="submit-password-btn">
              Save Password
            </button>
          </form>
        )}

        {/* Logout Button */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        {/* Optional message display */}
        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
};

export default MyAccount;