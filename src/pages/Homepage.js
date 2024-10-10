import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import the Navbar component
import '../stylesheets/Homepage.css'; // Import the stylesheet
import trailer from '../assets/videos/trailer.mp4';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="homepage-container">
        <div className="hero-section">
          <div className="hero-video">
            <video src={trailer} autoPlay loop muted playsInline></video>
          </div>
          <div className="hero-content">
            <h1>Welcome To DeskAVR</h1>
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
    </>
  );
};

export default HomePage;
