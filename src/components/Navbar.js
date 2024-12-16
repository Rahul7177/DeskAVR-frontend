import React, { useState, useEffect } from 'react';
import '../stylesheets/Navbar.css'; // Import the CSS for styling
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle the dropdown menu

  // Check if the user is logged in by checking a token in local storage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  
  // Handle logout by removing token from local storage
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token to log out the user
    setIsLoggedIn(false); // Set logged-in state to false
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
