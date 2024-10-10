import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage'
import CandidatePortal from './pages/CandidatePortal';
import CompanyPortal from './pages/CompanyPortal';
import './App.css'
import InterviewReport from './pages/Report';
import CompanyDetails from './components/CompanyDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/candidate" element={<CandidatePortal />} />
        <Route path="/company" element={<CompanyPortal />} />
        <Route path='/report' element={<InterviewReport/>}/>
        <Route path="/company-details/:name" element={<CompanyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
