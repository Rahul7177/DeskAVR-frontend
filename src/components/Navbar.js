import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import { useAuth } from '../context/AuthContext';
import '../stylesheets/Navbar.css'; // Import the CSS for styling

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate(); // Access the navigate function for redirecting

  // Check if the user is logged in by checking a token in local storage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout by removing token from local storage and clearing user data
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('authToken'); // Remove the token to log out the user
    
    // Clear sessionStorage (if any data is stored there)
    sessionStorage.removeItem('authToken');
    
    // Clear cookies related to the user session
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";  // Clear authToken cookie
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";        // Clear user cookie if you have one
    
    setIsLoggedIn(false); // Set logged-in state to false
    logout(); // Ensure that any context data is cleared as well
    
    // Redirect user to login page after logout
    navigate('/login');
  };
  
  

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    console.log('Auth Context - User:', user);
  }, [user]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to={'/'}><h1>DeskAVR</h1></Link>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li className="navbar-account" onClick={toggleDropdown}>
            <a href="#">
              Account
            </a>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {isLoggedIn ? (
                  <>
                    <li><Link to="/myaccount">My Account</Link></li>
                    <li><button onClick={handleLogout} className='button'>Logout</button></li>
                  </>
                ) : (
                  <li><Link to="/login">Login</Link></li>
                )}
              </ul>
            )}
          </li>
        </ul>
        <div className="navbar-toggle" id="navbar-toggle">
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
