import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage'
import CandidatePortal from './pages/CandidatePortal';
import CompanyPortal from './pages/CompanyPortal';
import './App.css'
import InterviewReport from './pages/ReportPage';
import CompanyDetails from './components/CompanyDetails';
import CustomCursor from './components/Cursor';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyAccount from './pages/MyAccount';
import { AuthProvider } from './context/AuthContext';
import PastInterviews from './pages/PastInterviews';
import ReportPage from './pages/ReportPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <>
    <AuthProvider>
    {/* <CustomCursor/> */}
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/candidate" element={<CandidatePortal />} />
        <Route path="/company" element={<CompanyPortal />} />
        <Route path='/report' element={<InterviewReport/>}/>
        <Route path="/company-details/:name" element={<CompanyDetails />} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/myaccount' element={<MyAccount/>}/>
        <Route path='/pastinterviews' element={<PastInterviews/>}/>
        {/* <Route path="/report/:companyName" element={<ReportPage />} /> */}
        <Route path="/:userID/reports/:index" element={<InterviewReport/>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />

      </Routes>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
