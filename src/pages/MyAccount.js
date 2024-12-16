import React, { useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const MyAccount = () => {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [message, setMessage] = useState('');

  // Handle password change logic (Placeholder)
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage('Password change feature is coming soon.');
  };

  // Render fallback if user is not logged in
  if (!user) {
    return (
      <div>
        <h2>My Account</h2>
        <p>You are not logged in. Please log in to view your account details.</p>
      </div>
    );
  }

  return (
    <div className="my-account">
      <h2>My Account</h2>

      {/* Display user details */}
      <div className="account-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Password Change Section */}
      <button onClick={() => setIsPasswordChanging(!isPasswordChanging)}>
        {isPasswordChanging ? 'Cancel' : 'Change Password'}
      </button>
      {isPasswordChanging && (
        <form onSubmit={handlePasswordChange}>
          <input type="password" placeholder="Enter new password" required />
          <button type="submit">Save Password</button>
        </form>
      )}

      {/* Logout Button */}
      <button onClick={logout} style={{ marginTop: '20px', color: 'red' }}>
        Logout
      </button>

      {/* Optional message display */}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default MyAccount;
