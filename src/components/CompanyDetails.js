import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/CompanyDetails.css';
import Navbar from './Navbar';
import axios from 'axios';
import QRCode from '../assets/logos/QR.png';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import discount from '../assets/videos/discount.gif'

function CompanyDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { company } = location.state || {};
  const { user, login, logout } = useAuth(); // Access logged-in user from AuthContext
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Sanitize string to remove invalid characters
  const sanitizeString = (str) => {
    return str.replace(/[^\w\s]/gi, ''); // Clean non-alphanumeric characters
  };

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if the user is not logged in
    }
  }, [user, navigate]);

  // Fetch user data and check subscription status using the userID
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${user.userID}`);
          console.log(response.data); // Check response data
          const userData = response.data;
          setIsSubscribed(userData.subscription);
          setTransactions(userData.transactions);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  if (!company) {
    return <div>No company details available.</div>;
  }

  const handleAttend = () => {
    if (isSubscribed) {
      setIsModalOpen(true);
    } else {
      alert('Please subscribe to Desk AVR to attend practice interviews.');
    }
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

  const handleTransactionIdChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setTransactionId(value);
    } else {
      alert('Invalid Transaction ID');
    }
  };

  const handleRequestApproval = async () => {
    if (transactionId) {
      try {
        // Make a POST request to the backend with userID and transactionID
        console.log(user.userID);
        await axios.post(`http://localhost:5000/api/users/addTransaction/${user.userID}`, { transactionID: transactionId });
  
        // Update the transactions state to include the new transaction ID
        setTransactions((prevTransactions) => [...prevTransactions, transactionId]);
  
        // Notify the user of success
        alert('Transaction ID added successfully');
      } catch (error) {
        // Log the error and notify the user
        console.error('Error submitting transaction ID:', error);
        alert('Failed to add transaction ID. Please try again.');
      }
    } else {
      // Notify the user if no transaction ID is provided
      alert('Please enter a transaction ID.');
    }
  };
  

  return (
    <>
      <Navbar />
      

        {!isSubscribed && (
          <div className="subscription-info">
            <div className="discount-section">
              <div className="discount-content">
                {/* <video src={discount} autoPlay muted className='discount-video'/> */}
                <img src={discount}/>
                <h3 className="discount-title">Early Bird Discount!</h3>
                <p className="discount-price">
                  <span className="original-price">₹999</span> ₹499 Only
                </p>
                <p className="discount-description">Hurry, limited time offer!</p>
              </div>
            </div>

            <div className="qr-transaction-section">
              {transactions.length > 0 ? (
                <p>Your approval request is pending. It will be approved soon.</p>
              ) : (
                <>
                  <p>Subscribe to Desk AVR to attend practice interviews</p>
                  <img src={QRCode} alt="QR Code" />
                  <input
                    type="text"
                    placeholder="Enter Transaction ID"
                    value={transactionId}
                    onChange={handleTransactionIdChange}
                  />
                  <button onClick={handleRequestApproval}>Request Approval</button>
                </>
              )}
            </div>
          </div>
        )}
        <div className="company-details-page">
        <div className="company-details">
          <h2>{sanitizeString(company.name)}</h2>
          <img src={company.logo} alt={`${sanitizeString(company.name)} logo`} className="company-details-logo" />
          <p className='comp-p'><strong className='comp-strong'>Job Title:</strong> Software Engineer</p>

          <button className="attend-btn" onClick={handleAttend} disabled={!isSubscribed}>
            {isSubscribed ? 'Attend' : 'Subscribe Below'}
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
