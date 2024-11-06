import React, { useState } from 'react';
import '../stylesheets/CandidatePortal.css';
import nokia_logo from '../assets/logos/nokia.webp';
import google_logo from '../assets/logos/google.jpg';
import microsoft_logo from '../assets/logos/microsoft.jpg';
import ey_logo from '../assets/logos/ey.webp';
import deloitte_logo from '../assets/logos/deloitte.png';
import adobe_logo from '../assets/logos/adobe.webp';
import bofa_logo from '../assets/logos/bofa.png';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const upcomingCompanies = [
  { id: 1, name: "Nokia", requirements: "Figma, Sketch, Prototyping", logo: nokia_logo },
    { id: 2, name: "Google", requirements: "Adobe XD, Wireframing, User Testing", logo: google_logo },
    { id: 3, name: "Microsoft", requirements: "Adobe XD, Wireframing, User Testing", logo: microsoft_logo },
  // { id: 6, name: "Bank of America", requirements: "C++, SQL, Data Analytics", logo: bofa_logo },
];

const companies = {
  "UI/UX": [
    { id: 1, name: "Nokia", requirements: "Figma, Sketch, Prototyping", logo: nokia_logo },
    { id: 2, name: "Google", requirements: "Adobe XD, Wireframing, User Testing", logo: google_logo },
    { id: 3, name: "Microsoft", requirements: "Adobe XD, Wireframing, User Testing", logo: microsoft_logo },
  ],
  "Data Analytics": [
    { id: 4, name: "Deloitte", requirements: "Python, SQL, Data Visualization", logo: deloitte_logo },
    { id: 5, name: "EY", requirements: "R, Machine Learning, Data Cleaning", logo: ey_logo },
  ],
  "Software Engineering": [
    { id: 6, name: "Bank of America", requirements: "C++, SQL, Data Analytics", logo: bofa_logo },
    { id: 7, name: "Nokia", requirements: "JavaScript, React, Node.js", logo: nokia_logo },
    { id: 8, name: "Adobe", requirements: "Python, Django, REST APIs", logo: adobe_logo },
  ],
};

const pastInterviews = [
  { name: "Bank of America", logo: bofa_logo, date: "2024-10-12" },
  { name: "Google", logo: google_logo, date: "2024-09-10" },
  { name: "Microsoft", logo: microsoft_logo, date: "2024-09-12" }
];

function CandidatePortal() {
  const [selectedField, setSelectedField] = useState('');  // Track the selected field
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [candidateSkills, setCandidateSkills] = useState('JavaScript, React');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPastInterviews, setShowPastInterviews] = useState(false);  // Toggle for past interviews

  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
    setSelectedCompany(null);
  };

  const handleCompanySelect = (company) => {
    navigate(`/company-details/${company.name}`, { state: { company } }); // Navigate to company details
  };

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

  const togglePastInterviews = () => {
    setShowPastInterviews(!showPastInterviews);
  };

  return (
    <div className="candidate-portal">
      <Navbar />  {/* Navigation bar */}
      
      {showPastInterviews ? (  // Show past interviews section
        <div className="past-interviews">
          <h2>Past Interviews</h2>
          <div className='past-company-container'>
            {pastInterviews.map((interview, index) => (
              <div key={index} className="interview-card">
                <img src={interview.logo} alt={interview.name} className="past-company-logo" />
                <div className="interview-info">
                  <h3>{interview.name}</h3>
                  <p>Date Attended: {interview.date}</p>
                  <Link to='/report'><button className="view-report-btn">View Detailed Report</button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2 id='candidate-title'>Candidate Portal</h2>

          <div className="field-select">
            <label htmlFor="field">Select Role you wish to apply for:</label>
            <select
              id="field"
              value={selectedField}
              onChange={handleFieldChange}
              className="dropdown"
            >
              <option value="">--Choose a Field--</option>
              {Object.keys(companies).map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>

          <div className="header-actions">
            <button className="view-past-btn" onClick={togglePastInterviews}>
              {showPastInterviews ? "Back to Apply" : "View Past Interviews"}
            </button>
          </div>

          {!selectedField ? ( // Show upcoming companies if no field is selected
            <div className="company-list">
              <h3>List Of Companies</h3>
              <div className="company-tiles">
                {upcomingCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="company-tile"
                    onClick={() => handleCompanySelect(company)}
                  >
                    <div className="logo-container">
                      <img src={company.logo} alt={company.name} className="company-logo" />
                      <div className="overlay">
                        <div className="overlay-text">{company.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="company-list">
              <h3>Companies hiring for {selectedField}</h3>
              <div className="company-tiles">
                {companies[selectedField].map((company) => (
                  <div
                    key={company.name}
                    className={`company-tile ${selectedCompany?.name === company.name ? 'selected' : ''}`}
                    onClick={() => handleCompanySelect(company)}
                  >
                    <div className="logo-container">
                      <img src={company.logo} alt={company.name} className="company-logo" />
                      <div className="overlay">
                        <div className="overlay-text">{company.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
        </>
      )}
    </div>
  );
}

export default CandidatePortal;
