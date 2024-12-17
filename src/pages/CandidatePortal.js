import React, { useState } from "react";
import "../stylesheets/CandidatePortal.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import nokia_logo from '../assets/logos/nokia.png';
import google_logo from '../assets/logos/google.png';
import microsoft_logo from '../assets/logos/microsoft.png';
import ey_logo from '../assets/logos/ey.png';
import deloitte_logo from '../assets/logos/deloitte.png';
import adobe_logo from '../assets/logos/adobe.png';
import bofa_logo from '../assets/logos/bofa.png';
import tcs_logo from '../assets/logos/tcs.png';
import infosys_logo from '../assets/logos/infosys.png';

function CandidatePortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const topCompanies = [
    { id: 1, name: "Nokia", requirements: "Figma, Sketch, Prototyping", logo: nokia_logo },
    { id: 2, name: "Google", requirements: "Adobe XD, Wireframing, User Testing", logo: google_logo },
    { id: 3, name: "Microsoft", requirements: "Adobe XD, Wireframing, User Testing", logo: microsoft_logo },
    { id: 4, name: "Deloitte", requirements: "Python, SQL, Data Visualization", logo: deloitte_logo },
    { id: 5, name: "EY", requirements: "R, Machine Learning, Data Cleaning", logo: ey_logo },
    { id: 6, name: "Bank of America", requirements: "C++, SQL, Data Analytics", logo: bofa_logo },
    { id: 7, name: "Adobe", requirements: "C++, Java, SQL", logo: adobe_logo },
    { id: 8, name: "TCS", requirements: "Java, Django, Networks", logo: tcs_logo },
    { id: 9, name: "Infosys", requirements: "Python, Django, REST APIs", logo: infosys_logo },
  ];
  

  const filteredCompanies = topCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompanySelect = (company) => {
    navigate(`/company-details/${company.name}`, { state: { company } });
  };

  const navigateToPastInterviews = () => {
    navigate("/pastinterviews");
  };

  return (
    <div className="candidate-portal">
      <Navbar />
      <h2 id="candidate-title">Candidate Portal</h2>

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
        <button
          className="view-past-btn"
          onClick={navigateToPastInterviews}
        >
          View Past Interviews
        </button>
      </div>

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
    </div>
  );
}

export default CandidatePortal;
