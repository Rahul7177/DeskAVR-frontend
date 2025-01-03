import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to access Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State for the authenticated user

  // Load user and token from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken'); // Check for authToken
    if (savedUser && authToken) {
      try {
        setUser(JSON.parse(savedUser)); // Parse and set user from localStorage
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user'); // Clear corrupted user data
        localStorage.removeItem('authToken'); // Clear token
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken'); // Ensure clean state
    }
  }, []);

  // Login function
  const login = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Save user in localStorage
      localStorage.setItem('authToken', userData.token); // Save token in localStorage
    }
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear the user data
    localStorage.removeItem('user'); // Remove user from localStorage
    localStorage.removeItem('authToken'); // Remove the token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
