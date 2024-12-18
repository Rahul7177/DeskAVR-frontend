import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/AdminDashboard.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get('http://localhost:5000/api/users', {
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

    const handleCategoryChange = (e) => { // Correct placement of the function
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

    const handleApproveSubscription = async (userId) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${userId}`, { subscription: true }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedUsers = users.map(user => (user._id === userId ? response.data : user));
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers.filter(user => selectedCategory === 'all' || (selectedCategory === 'subscribed' && user.subscription)));
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
            const response = await axios.put(`http://localhost:5000/api/users/${userId}`, { subscription: false }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedUsers = users.map(user => (user._id === userId ? response.data : user));
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers.filter(user => selectedCategory === 'all' || (selectedCategory !== 'subscribed' && !user.subscription)));
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
        <Navbar/>
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
        </>
    );
};

export default AdminDashboard;