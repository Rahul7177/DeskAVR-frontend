import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styling
import '../stylesheets/CompanyPortal.css'; // Import your custom CSS
import Navbar from '../components/Navbar';
import business from '../assets/logos/business.png';
import timer from '../assets/videos/timer.gif'

const CompanyPortal = () => {
  const [step, setStep] = useState(1); // Step progression
  const [hrDetails, setHrDetails] = useState({ name: '', companyName: '' });
  const [jobDetails, setJobDetails] = useState({ location: '', jobTitle: '', jobDescription: '' });
  const [interviewDetails, setInterviewDetails] = useState({ csvFile: null, interviewTime: null });

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleHrChange = (e) => setHrDetails({ ...hrDetails, [e.target.name]: e.target.value });
  const handleJobChange = (e) => setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  const handleInterviewChange = (date) => setInterviewDetails({ ...interviewDetails, interviewTime: date });
  const handleFileUpload = (e) => setInterviewDetails({ ...interviewDetails, csvFile: e.target.files[0] });

  const handleSubmit = () => {
    console.log('HR Details:', hrDetails);
    console.log('Job Details:', jobDetails);
    console.log('Interview Details:', interviewDetails);
    alert('Registered successfully! We will soon reach out to you.');
  };

  return (
    <div className="company-portal">
      <Navbar />
      <div className="portal-content">
        {/* <div className="welcome-section">
          <h1>Welcome to the DeskAVR's Business Portal</h1>
          <p>We would be soon launching this portal. You can pre-register now.</p>
          <img src={business} className='business-vector'></img>
        </div>
        <div className="form-container">
          {step === 1 && (
            <div className="form-box">
              <legend>Your Details</legend>
              <label>
                Name:
                <input type="text" name="name" value={hrDetails.name} onChange={handleHrChange} required />
              </label>
              <label>
                Company Name:
                <input type="text" name="companyName" value={hrDetails.companyName} onChange={handleHrChange} required />
              </label>
              <div className="form-buttons">
                <button onClick={handleNextStep}>Continue</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="form-box">
              <legend>Job Details</legend>
              <label>
                Location:
                <input type="text" name="location" value={jobDetails.location} onChange={handleJobChange} required />
              </label>
              <label>
                Job Title:
                <input type="text" name="jobTitle" value={jobDetails.jobTitle} onChange={handleJobChange} required />
              </label>
              <label>
                Job Description:
                <textarea name="jobDescription" value={jobDetails.jobDescription} onChange={handleJobChange} required />
              </label>
              <div className="form-buttons">
                <button onClick={handlePreviousStep}>Go Back</button>
                <button onClick={handleNextStep}>Continue</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="form-box">
              <legend>Interview Details</legend>
              <label>
                Upload CSV file containing candidate details:
                <input type="file" name="csvFile" onChange={handleFileUpload} required />
              </label>
              
              <div className="form-buttons">
                <button onClick={handlePreviousStep}>Go Back</button>
                <button onClick={handleSubmit}>Pre Register</button>
              </div>
            </div>
          )}
        </div> */}

        <div className='welcome-section'>
        <h1>Thanks for your valuable interest.<br></br> DeskAVR for Business launching soon..</h1>
        <img src={timer}></img>
        </div>
      </div>
    </div>
  );
};

export default CompanyPortal;
