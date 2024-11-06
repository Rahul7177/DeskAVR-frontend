import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/CompanyDetails.css';
import Navbar from './Navbar';

function CompanyDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { company } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const timeSlots = [
    '10 AM - 11 AM',
    '11 AM - 12 PM',
    '12 PM - 1 PM',
    '1 PM - 2 PM',
    '2 PM - 3 PM',
    '3 PM - 4 PM',
    '4 PM - 5 PM'
  ];

  if (!company) {
    return <div>No company details available.</div>;
  }

  const handleAttend = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
  };

  // Split job description into bullet points
  const jobDescriptionLines = [
    'Low latency electronic trading including algorithmic trading',
    'Complex derivatives and structured products trading',
    'Real time and intra-day risk including Monte Carlo simulations, climate risk valuations',
    'Auto-hedging and portfolio optimizations',
    'Intelligent automation of trade processing including applied robotics',
    'Intelligent anti-money laundering and fraud detection',
    'Real time cash flow predictive modelling',
    'Modernization of global real time payments',
    'Digital Banking Assistants and enhanced BOT capabilities',
    'Design and architect solutions based on requirements or based on your innovative ideas',
    'Develop software in agile and iterative cycles using continuous improvement tools and techniques',
    'Work with global development teams and business partners across USA, UK, Europe and Asia Pacific including quants, strategists, traders, and risk managers.',
    'Test software using test driven development and embedded QA teams'
  ];

  return (
    <>
      <Navbar />
      <div className="company-details-page">
        <div className="company-details">
          <h2>{company.name}</h2>
          <img src={company.logo} alt={`${company.name} logo`} className="company-details-logo" />
          <p className='comp-p'><strong className='comp-strong'>Job Title:</strong> Software Engineer</p>
          <p className='comp-p'><strong className='comp-strong'>Job Description:</strong></p>
<ul className='job-description'>
  <li>Build cutting FinTech solutions for banking, front office trading, and risk across all segments of the global market.</li>
  <li>Low latency electronic trading including algorithmic trading.</li>
  <li>Complex derivatives and structured products trading.</li>
  <li>Real time and intra-day risk including Monte Carlo simulations, climate risk valuations.</li>
  <li>Auto-hedging and portfolio optimizations.</li>
  <li>Intelligent automation of trade processing including applied robotics.</li>
  <li>Intelligent anti-money laundering and fraud detection.</li>
  <li>Real time cash flow predictive modelling.</li>
  <li>Modernization of global real time payments.</li>
  <li>Digital Banking Assistants and enhanced BOT capabilities.</li>
  <li>Design and architect solutions based on requirements or based on your innovative ideas.</li>
  <li>Develop software in agile and iterative cycles using continuous improvement tools and techniques.</li>
  <li>Work with global development teams and business partners across USA, UK, Europe and Asia Pacific including quants, strategists, traders, and risk managers.</li>
  <li>Test software using test driven development and embedded QA teams.</li>
</ul>

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
          <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Enter Your Details</h3>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="resume">Upload Resume:</label>
              <input
                type="file"
                id="resume"
                onChange={(e) => setResume(e.target.files[0])}
              />
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <label htmlFor="timeSlot">Choose Time Slot:</label>
              <select
                id="timeSlot"
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              >
                <option value="" disabled>Select a time slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
              <div className="modal-buttons">
                <button className="modal-submit" onClick={handleModalSubmit}>Submit</button>
                <button className="modal-close" onClick={handleModalClose}>Close</button>
              </div>
            </div>
          </div>
        )}

        {isConfirmationOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Interview Scheduled</h3>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Resume:</strong> {resume ? resume.name : 'Not uploaded'}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time Slot:</strong> {selectedTimeSlot}</p>
              <div className="modal-buttons">
                <button className="modal-close" onClick={handleConfirmationClose}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CompanyDetails;
