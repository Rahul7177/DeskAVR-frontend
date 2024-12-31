import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import the Navbar component
import '../stylesheets/Homepage.css'; 
import trailer from '../assets/videos/trailer.mp4';
import AboutUs from '../components/About';
import ContactUs from '../components/Contact';
import Founders from '../components/Founders';
import UserManual from '../components/UserManual';
import NewYearSale from '../components/Sale';
import Footer from '../components/Footer';
import logo from '../assets/logos/logo1.jpeg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="homepage-container">
        <div className="hero-section">
          <div className="hero-video">
            <video src={trailer} autoPlay loop muted playsInline preload="auto"></video>
          </div>
          <div className="hero-overlay"></div> {/* Dark overlay */}
          <div className="hero-content">
            <div className="hero-text">
            {/* <div className='logo-container'>
              <img src={logo} alt='logo' className='brand-logo'></img>
            </div> */}
              <h1 className='title'>Welcome To DeskAVR</h1>
              <p>A comprehensive online interview portal designed to streamline interview assessments, offering real-time performance insights and a smooth experience for both recruiters and applicants.</p>
            </div>
            <div className="hero-buttons">
              <button onClick={() => navigate('/company')} className="hero-btn">
                Business
              </button>
              <button onClick={() => navigate('/candidate')} className="hero-btn">
                Candidate
              </button>
            </div>
          </div>
        </div>
      </div>
      <NewYearSale/>
      <AboutUs/>
      <UserManual/>
      <Founders/>
      <ContactUs/>
      <Footer/>
    </>
  );
};
export default HomePage; 