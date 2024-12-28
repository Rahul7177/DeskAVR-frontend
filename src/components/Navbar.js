import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { useAuth } from '../context/AuthContext';
import '../stylesheets/Navbar.css'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    sessionStorage.removeItem('authToken');
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";  
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";        
    
    setIsLoggedIn(false); 
    logout(); 
    
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
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
        <ul className={`navbar-menu ${isMenuActive ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link to="/blogs">Blogs</Link></li>

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
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
