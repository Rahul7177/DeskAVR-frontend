import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/CompanyDetails.css';
import Navbar from './Navbar';
import axios from 'axios';
import QRCode from '../assets/logos/QR.png';
import { useAuth } from '../context/AuthContext';
import discount from '../assets/videos/discount.gif';
import snowflakeImage from '../assets/logos/snowflake.png'

function CompanyDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { company } = location.state || {};
    const { user, login } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [key, setKey] = useState('');
    const [enteredKey, setEnteredKey] = useState('');
    const [userKey, setUserKey] = useState(null);
    const [email, setEmail] = useState('');
    const [resume, setResume] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keyError, setKeyError] = useState(null);

    const sanitizeString = (str) => str.replace(/[^\w\s]/gi, '');

    useEffect(() => {
      if (!user) {
          navigate('/login', { state: { from: location } });
          return;
      }
  
      if (user && !location.state?.fromLogin) { // Use location instead of navigate.state
          const fetchUserData = async () => {
              setLoading(true);
              setError(null);
              try {
                  const token = localStorage.getItem('authToken');
                  if (!token) {
                      throw new Error("No token found");
                  }
                  const response = await axios.get(`http://localhost:5000/api/users/${user.userID}`, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  });
                  const userData = response.data;
                  setIsSubscribed(userData.subscription);
                  setTransactions(userData.transactions);
              } catch (err) {
                  console.error('Error fetching user data:', err);
                  setError("Failed to load user data.");
                  if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                      localStorage.removeItem('authToken');
                      login(null);
                      navigate('/login', { state: { from: location } });
                  }
              } finally {
                  setLoading(false);
              }
          };

          fetchUserData();

          
      }
  }, [user, location, login]); // Removed navigate from dependency array

    if (!company) {
        return <div>No company details available.</div>;
    }

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleAttend = () => {
        if (isSubscribed) {
            setIsModalOpen(true);
        } else {
            alert('Please subscribe to Desk AVR to attend practice interviews.');
        }
    };

    const handleModalSubmit = async () => {
        if (!enteredKey) {
            setKeyError('Please enter your key.');
            return;
        }
    
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(`http://localhost:5000/api/users/clearKey/${user.userID}`, { key: enteredKey }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                console.log('Download complete.');
                setEnteredKey('');
                setUserKey('');
                setKeyError(null);
                setIsModalOpen(false);
                alert('Software downloaded successfully!');
            }
        } catch (error) {
            console.error('Error downloading software:', error);
            if (error.response && error.response.status === 400) {
                setKeyError('Enter a valid key');
            } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                localStorage.removeItem('authToken');
                login(null);
                navigate('/login', { state: { from: location } });
            } else {
                setKeyError('Failed to download software. Please try again.');
            }
        }
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
                const token = localStorage.getItem('authToken');
                await axios.post(`http://localhost:5000/api/users/addTransaction/${user.userID}`, { transactionID: transactionId },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                setTransactions((prevTransactions) => [...prevTransactions, transactionId]);
                alert('Transaction ID added successfully');
                setTransactionId(''); // Clear the input field after successful submission
            } catch (error) {
                console.error('Error submitting transaction ID:', error);
                alert('Failed to add transaction ID. Please try again.');
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem('authToken');
                    login(null);
                    navigate('/login', { state: { from: location } });
                }
            }
        } else {
            alert('Please enter a transaction ID.');
        }
    };

    return (
        <div className='company-details-container'>
            <Navbar />
            {!isSubscribed && (
                <div className="subscription-info">
                     {/* Snowflakes using image */}
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                <div className="snowflake"><img src={snowflakeImage} alt="Snowflake" /></div>
                    <div className="discount-section">
                        <div className="discount-content">
                            <h3 className="discount-title">Early Bird Discount + Christmas Offer</h3>
                            <img src={discount} alt="Discount"/>
                            <p className="discount-price">
                                <span className="original-price">₹4999</span> ₹499 Only
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
      <h3>Enter Key to Download</h3>
      <p>To get your key: Go to Accounts - you can find your key in the My Account page.</p>
      <label htmlFor="key">Key:</label>
      <input
        type="text"
        id="key"
        value={enteredKey}
        onChange={(e) => setEnteredKey(e.target.value)}
      />
      {keyError && <p className="error-text">{keyError}</p>}
      <div className="modal-buttons">
        <button className="modal-submit" onClick={handleModalSubmit}>
          Download Software
        </button>
        <button className="modal-close" onClick={handleModalClose}>
          Close
        </button>
      </div>
    </div>
  </div>
)}


            </div>
        </div>
    );
}

export default CompanyDetails;