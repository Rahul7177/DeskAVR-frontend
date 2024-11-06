import React from 'react';
import '../stylesheets/About.css';
import vectorImage1 from '../assets/logos/goal.png';
import vectorImage2 from '../assets/logos/console.png';
import vectorImage3 from '../assets/logos/result.png';


const AboutUs = () => {
  return (
    <div className="aboutus-section" id='about'>
      <div className="aboutus-container">
        <h2 className="aboutus-title">About Us</h2>
        <p className="aboutus-description">
        Welcome to Desk-AVR a unique online interview portal, designed to revolutionize traditional interviews.
        Powered by Unreal Engine, our platform delivers a gamified and realistic interview experience, immersing candidates in an interactive, virtual environment. We empower businesses with customizable interview setups and provide candidates with tools to practice through sample interviews, preparing them for real-world scenarios.
        </p>
        
        <div className="aboutus-content">
          <div className="aboutus-card">
            <img src={vectorImage1} alt="Our Mission" className="aboutus-image" />
            <h3 className="aboutus-card-title">Onboard</h3>
            <p className="aboutus-card-description">
              Give a try and empower yourself through innovative and personlized interview experience.
            </p>
          </div>

          <div className="aboutus-card">
            <img src={vectorImage2} alt="Our Vision" className="aboutus-image" />
            <h3 className="aboutus-card-title">Experience</h3>
            <p className="aboutus-card-description">
              Get an immersive, realistic and gamified interview experience, like never before.
            </p>
          </div>

          <div className="aboutus-card">
            <img src={vectorImage3} alt="Improve" className="aboutus-image" />
            <h3 className="aboutus-card-title">Improve</h3>
            <p className="aboutus-card-description">
              Get personlized interview report and recommended areas of improvement and level up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
