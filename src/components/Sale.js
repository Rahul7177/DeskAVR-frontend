import React from 'react';
import '../stylesheets/Sale.css';
import { Link } from 'react-router-dom';

const NewYearSale = () => {
  return (
    <div className="new-year-sale-section">
      <div className="fireworks-container">
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
      </div>
      <div className="new-year-sale-container">
        <h1 className="new-year-sale-title">🎉 New Year Sale Live Now! 🎉</h1>
        <p className="new-year-sale-description">
          Kickstart the new year with exclusive discounts on DeskAVR! Get ready to elevate your interview preparation experience at a never-before-seen price.
        </p>
        <Link to='/candidate'><button className="new-year-sale-button">Grab the Offer Now</button></Link>
      </div>
      
    </div>
  );
};

export default NewYearSale;
