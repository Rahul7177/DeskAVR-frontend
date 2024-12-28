import React from 'react';
import '../stylesheets/UserManual.css';
import localVideo from '../assets/videos/UserManual.mp4'; // Replace with your actual video path
import userManualPdf from '../assets/DeskAVR_manual.pdf'; // Replace with your actual PDF path

const UserManual = () => {
  return (
    <div className="user-manual-section">
      <div className="user-manual-container">
        <div className="user-manual-content">
          <div className="user-manual-video-container">
            <video 
              controls 
              className="user-manual-video" 
              poster="../assets/manual/video-thumbnail.jpg"
              autoPlay loop
            >
              <source src={localVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="user-manual-text-container">
            <h2 className="user-manual-title">User Manual</h2>
            <p className="user-manual-description">
              Need help getting started? Watch the video below for step-by-step instructions on operating the software, or download the detailed user manual in PDF format.
            </p>
            <a
              href={userManualPdf}
              download="User_Manual.pdf"
              className="user-manual-download"
            >
              Download PDF Manual
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManual;