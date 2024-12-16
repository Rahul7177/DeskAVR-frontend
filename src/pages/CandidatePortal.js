import React, { useState } from 'react';
import '../stylesheets/CandidatePortal.css';
import nokia_logo from '../assets/logos/nokia.webp';
import google_logo from '../assets/logos/google.jpg';
import microsoft_logo from '../assets/logos/microsoft.jpg';
import ey_logo from '../assets/logos/ey.webp';
import deloitte_logo from '../assets/logos/deloitte.png';
import adobe_logo from '../assets/logos/adobe.webp';
import bofa_logo from '../assets/logos/bofa.png';
import tcs_logo from '../assets/logos/tcs.webp';
import infosys_logo from '../assets/logos/infosys.png';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const topCompanies = [
  { id: 1, name: "Nokia", requirements: "Figma, Sketch, Prototyping", logo: nokia_logo },
  { id: 2, name: "Google", requirements: "Adobe XD, Wireframing, User Testing", logo: google_logo },
  { id: 3, name: "Microsoft", requirements: "Adobe XD, Wireframing, User Testing", logo: microsoft_logo },
  { id: 4, name: "Deloitte", requirements: "Python, SQL, Data Visualization", logo: deloitte_logo },
  { id: 5, name: "EY", requirements: "R, Machine Learning, Data Cleaning", logo: ey_logo },
  { id: 6, name: "Bank of America", requirements: "C++, SQL, Data Analytics", logo: bofa_logo },
  { id: 7, name: "Adobe", requirements: "Python, Django, REST APIs", logo: adobe_logo },
  { id: 8, name: "TCS", requirements: "Python, Django, REST APIs", logo: tcs_logo },
  { id: 9, name: "Infosys", requirements: "Python, Django, REST APIs", logo: infosys_logo },
];

const pastInterviews = [
  { name: "Bank of America", logo: bofa_logo, date: "2024-10-12" },
  { name: "Google", logo: google_logo, date: "2024-09-10" },
  { name: "Microsoft", logo: microsoft_logo, date: "2024-09-12" },
];

function CandidatePortal() {
  const [showPastInterviews, setShowPastInterviews] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleModalSubmit = () => {
    alert(`Submitted ID: ${userId}, Password: ${password}`);
    setIsModalOpen(false);
  };

  const togglePastInterviews = () => {
    setShowPastInterviews(!showPastInterviews);
  };

  const filteredCompanies = topCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompanySelect = (company) => {
    navigate(`/company-details/${company.name}`, { state: { company } });
  };

  return (
    <div className="candidate-portal">
      <Navbar />

      {showPastInterviews ? (
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

          

          <div className="search-container">
            <label htmlFor="company-search">Search Companies:</label>
            <input
              type="text"
              id="company-search"
              placeholder="Type company name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
          </div>

          <div className="header-actions">
            <button className="view-past-btn" onClick={togglePastInterviews}>
              {showPastInterviews ? "Back to Apply" : "View Past Interviews"}
            </button>
          </div>

          {/* <div className="dropdown-container">
            <button className="dropdown-btn" onClick={() => setShowDropdown(!showDropdown)}>
              Top Companies
            </button>
            {showDropdown && (
              <div className="dropdown-list">
                {topCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="dropdown-item"
                    onClick={() => handleCompanySelect(company)}
                  >
                    {company.name}
                  </div>
                ))}
              </div>
            )}
          </div> */}

          <div className="company-list">
            <h3>Available Companies</h3>
            <div className="company-tiles">
              {filteredCompanies.map((company) => (
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
        </>
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
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidatePortal;
