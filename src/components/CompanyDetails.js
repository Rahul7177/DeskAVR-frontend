import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/CompanyDetails.css';

function CompanyDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { company } = location.state || {}; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  if (!company) {
    return <div>No company details available.</div>; // If no company data is passed, display a fallback
  }

  const handleAttend = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    alert(`Submitted ID: ${userId}, Password: ${password}`);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="company-details-page">
      <h1 className='comp-h1'>Company Details</h1>
      <div className="company-details">
        <h2>{company.name}</h2>
        <img src={company.logo} alt={`${company.name} logo`} className="company-details-logo" />
        <p className='comp-p'><strong className='comp-strong'>Job Title:</strong> Software Engineer</p>
        <p className='comp-p'><strong className='comp-strong'>Job Description:</strong> Developing web applications using React and Node.js</p>
        <p className='comp-p'><strong className='comp-strong'>Location:</strong> Remote</p>
        <p className='comp-p'><strong className='comp-strong'>Requirements:</strong></p>
        <div className="requirements">
          {company.requirements.split(', ').map((skill, index) => (
            <span key={index} className="skill-box">
              {skill}
            </span>
          ))}
        </div>
        <button className="attend-btn" onClick={handleAttend}>
          Attend
        </button>
        <button className="back-btn"onClick={() => navigate(-1)}>Go Back</button> {/* Navigates back to the previous page */}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Your Details</h3>
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="modal-submit" onClick={handleModalSubmit}>Submit</button>
              <button className="modal-close" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyDetails;
