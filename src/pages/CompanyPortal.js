import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styling
import '../stylesheets/CompanyPortal.css'; // Import your custom CSS
import Navbar from '../components/Navbar';

const CompanyPortal = () => {
  const [step, setStep] = useState(1); // Step progression
  const [hrDetails, setHrDetails] = useState({ name: '', companyName: '' });
  const [jobDetails, setJobDetails] = useState({ location: '', jobTitle: '', jobDescription: '' });
  const [interviewDetails, setInterviewDetails] = useState({ csvFile: null, interviewTime: null });

  const handleNextStep = () => setStep(step + 1);

  const handleHrChange = (e) => setHrDetails({ ...hrDetails, [e.target.name]: e.target.value });
  const handleJobChange = (e) => setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  const handleInterviewChange = (date) => setInterviewDetails({ ...interviewDetails, interviewTime: date });
  const handleFileUpload = (e) => setInterviewDetails({ ...interviewDetails, csvFile: e.target.files[0] });

  const handleSubmit = () => {
    console.log('HR Details:', hrDetails);
    console.log('Job Details:', jobDetails);
    console.log('Interview Details:', interviewDetails);
    alert('Interview scheduled successfully!');
  };

  return (
    <div className="company-portal">
      <Navbar/>
      <div className="welcome-section">
        <h1>Welcome to the DeskAVR's Business Portal</h1>
        <p>Here, you can schedule interviews, manage job details, and upload necessary files.<br></br> Follow the steps to provide all required information to complete the scheduling process.</p>
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
            <button onClick={handleNextStep}>Continue</button>
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
            <button onClick={handleNextStep}>Continue</button>
          </div>
        )}
        {step === 3 && (
          <div className="form-box">
            <legend>Interview Details</legend>
            <label>
              Upload CSV file containig candidate details
              <input type="file" name="csvFile" onChange={handleFileUpload} required />
            </label>
            <label>
              Interview Time : 
              <DatePicker
                selected={interviewDetails.interviewTime}
                onChange={handleInterviewChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select interview time"
                required
                className='date_input'
              />
            </label>
            <button onClick={handleSubmit}>Schedule Interview</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPortal;
