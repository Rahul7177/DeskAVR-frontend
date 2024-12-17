import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../stylesheets/CandidatePortal.css';
import Navbar from '../components/Navbar';

function PastInterviews() {
  const { user } = useAuth(); // Access user from context
  const [pastInterviews, setPastInterviews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userID = user.userID; // Access userId from user if logged in
      console.log('Fetching past interviews for userId:', userID);

      const fetchPastInterviews = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/pastinterviews/${userID}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log('Past interviews data:', data);
          setPastInterviews(data);
        } catch (error) {
          console.error('Error fetching past interviews:', error);
        } finally {
          setLoading(false); // Stop loading when data fetch completes
        }
      };

      fetchPastInterviews();
    } else {
      setLoading(false); // Stop loading if user is null
    }
  }, [user]);

  // Redirect to login if user is null and loading is done
  useEffect(() => {
    if (!loading && !user) {
      console.log('User is null. Redirecting to login...');
      navigate('/login'); // Adjust the path to your login page
    }
  }, [loading, user, navigate]);

  // Show loader while loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render past interviews
  return (
    <>
      <Navbar/>
    <div className="candidate-portal">
    <div className="past-interviews">
      <h2>Past Interviews</h2>
      <div className="past-company-container">
        {pastInterviews.length > 0 ? (
          pastInterviews.map((interview, index) => (
            <div key={index} className="interview-card">
              <img
                src={require(`../assets/logos/${interview.name.toLowerCase()}.png`)}
                alt={interview.name}
                className="past-company-logo"
              />
              <div className="interview-info">
                <h3>{interview.name}</h3>
                <p>
                  Date Attended:{' '}
                  {interview.createdAt ? interview.createdAt : 'Date not available'}
                </p>
                <button className="view-report-btn" onClick={() => navigate(`/${user.userID}/reports/${index}`)} >
                  View Detailed Report
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No past interviews available.</p>
        )}
      </div>
    </div>
    </div>
    </>
  );
}

export default PastInterviews;
