import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/CompanyDetails.css';
import Navbar from './Navbar';
import axios from 'axios';
import QRCode from '../assets/logos/QR.jpg';
import { useAuth } from '../context/AuthContext';
import discount from '../assets/videos/discount90.gif';
import snowflakeImage from '../assets/logos/snowflake.png';
import Footer from './Footer';
import NewYearSale from './Sale';


function CompanyDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { company } = location.state || {};
    const { user, login } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [enteredKey, setEnteredKey] = useState('');
    const [keyError, setKeyError] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;


    const sanitizeString = (str) => str.replace(/[^\w\s]/gi, '');

    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }

        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get(`${API_URL}/api/users/${user.userID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
                const userData = response.data;
                // console.log("key : "+userData.key);
                setIsSubscribed(userData.subscription);
                setTransactions(userData.transactions);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data.');
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
    }, [user, location, login, navigate]);

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
            const response = await axios.get(`${API_URL}/api/users/${user.userID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Extracting key properly
            const fetchedKey = response.data.key; // Assuming key is directly under response.data
            // console.log(fetchedKey, ": fetched key");
            // console.log(enteredKey, ": entered key");
    
            // Compare keys after trimming spaces and normalizing case
            if (enteredKey.trim() === fetchedKey.trim()) {
                // Simulate download using the direct link
                const fileDownloadLink = process.env.REACT_APP_GDRIVE_LINK;
                window.open(fileDownloadLink, '_blank');
                alert('Software downloading...');
    
                // Clear the key in the backend
                await axios.put(
                    `${API_URL}/api/users/clearKey/${user.userID}`,
                    { key: enteredKey.trim() },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setEnteredKey('');
                setKeyError(null);
                setIsModalOpen(false);
                // alert('Key cleared successfully.');
            } else {
                setKeyError('Invalid key. Please try again.');
            }
        } catch (error) {
            console.error('Error validating key:', error);
            setKeyError('Failed to validate key. Please try again.');
        }
    };
    
    
    

    const handleModalClose = () => {
        setIsModalOpen(false);
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
                await axios.post(
                    `${API_URL}/api/users/addTransaction/${user.userID}`,
                    { transactionID: transactionId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
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
        <div className="company-details-container">
            <Navbar />
            {!isSubscribed && (
                <>
                <NewYearSale/>
                <div className="subscription-info">
                    {/* Snowflakes using image */}
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="snowflake">
                            <img src={snowflakeImage} alt="Snowflake" />
                        </div>
                    ))}
                    <div className="discount-section">
                        <div className="discount-content">
                            <h3 className="discount-title">Early Bird Discount + New Year Offer</h3>
                            <img src={discount} alt="Discount" />
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
                </>
            )}
            <div className="company-details-page">
                <div className="company-details">
                    <h2>{sanitizeString(company.name)}</h2>
                    <img
                        src={company.logo}
                        alt={`${sanitizeString(company.name)} logo`}
                        className="company-details-logo"
                    />
                    <p className="comp-p">
                        <strong className="comp-strong">Job Title:</strong> Software Engineer
                    </p>
                    <button
                        className="attend-btn"
                        onClick={handleAttend}
                        disabled={!isSubscribed}
                    >
                        {isSubscribed ? 'Attend' : 'Subscribe'}
                    </button>
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        Go Back
                    </button>
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
            <Footer/>
        </div>
    );
}

export default CompanyDetails;
