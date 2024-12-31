import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get(`${API_URL}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem('authToken');
                    navigate('/login');
                }
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        const filtered = users.filter((user) => {
            if (e.target.value === 'all') return true;
            if (e.target.value === 'subscribed') return user.subscription;
            if (e.target.value === 'pending') return !user.subscription && user.transactions.length > 0;
            if (e.target.value === 'not-subscribed') return !user.subscription && user.transactions.length === 0;
            return false;
        });
        setFilteredUsers(filtered);
    };

    const generateRandomKey = () => {
        let key = '';
        for (let i = 0; i < 12; i++) {
            key += Math.floor(Math.random() * 10);
        }
        return key;
    };

    const handleApproveSubscription = async (userId) => {
        const token = localStorage.getItem('authToken');
        const newKey = generateRandomKey();

        try {
            const response = await axios.put(`${API_URL}/api/users/${userId}`, {
                subscription: true,
                key: newKey,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the state with the new user data, including the key
            setUsers(users.map(user => user._id === userId ? response.data : user));
            setFilteredUsers(filteredUsers.map(user => user._id === userId ? response.data: user));

        } catch (error) {
            console.error('Error approving subscription:', error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                localStorage.removeItem('authToken');
                navigate('/login');
            }
        }
    };

    const handleRemoveSubscription = async (userId) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.put(`${API_URL}/api/users/${userId}`, { subscription: false, key: null }, { // Reset key to null
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.map(user => user._id === userId ? response.data : user));
            setFilteredUsers(filteredUsers.map(user => user._id === userId ? response.data: user));
        } catch (error) {
            console.error('Error removing subscription:', error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                localStorage.removeItem('authToken');
                navigate('/login');
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="admin-dashboard">
                <h2>Admin Dashboard</h2>
                <div className="user-categories">
                    <label htmlFor="category-select">Filter Users:</label>
                    <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="all">All Users</option>
                        <option value="subscribed">Subscribed</option>
                        <option value="pending">Pending Approval</option>
                        <option value="not-subscribed">Not Subscribed</option>
                    </select>
                </div>
                <div className="user-list">
                    {filteredUsers.map((user) => (
                        <div className="user-card" key={user._id}>
                            <div className="user-info">
                                <h3>{user.name}</h3>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone}</p>
                                {user.transactions && user.transactions.length > 0 && (
                                    <div>
                                        <p>Transactions:</p>
                                        <ul>
                                            {user.transactions.map((transaction, index) => (
                                                <li key={index}>Transaction ID: {transaction}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {user.key && <p>Key: {user.key}</p>} {/* Display the key */}
                            </div>
                            <div className="user-actions">
                                {user.subscription ? (
                                    <button className="remove-btn" onClick={() => handleRemoveSubscription(user._id)}>Remove Subscription</button>
                                ) : (
                                    <button className="approve-btn" onClick={() => handleApproveSubscription(user._id)}>Approve Subscription</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default AdminDashboard;