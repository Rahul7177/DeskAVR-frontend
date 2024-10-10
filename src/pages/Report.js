import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';
import '../stylesheets/Report.css';
import nokia from '../assets/logos/nokia.webp'

function InterviewReport() {
  // Sample data for company and candidate
  const companyLogo = nokia; // Replace with the actual company logo URL
  const companyName = 'Nokia';
  const jobRole = 'Software Engineer';
  const candidateName = 'John Doe';
  const candidateEmail = 'john.doe@email.com';

  const data = {
    labels: ['Correct Answers', 'Wrong Answers', 'Unanswered Questions'],
    datasets: [
      {
        label: 'Interview Performance',
        data: [18, 7, 0], // Sample data: 18 correct, 7 wrong, 0 unanswered
        backgroundColor: ['#4CAF50', '#FF5252', '#FFEB3B'],
        hoverBackgroundColor: ['#66BB6A', '#FF1744', '#FFD700'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Define questions arrays
  const correctQuestions = ['Q1', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'Q9', 'Q11', 'Q12', 'Q13', 'Q15', 'Q16', 'Q17', 'Q18', 'Q20', 'Q21', 'Q23', 'Q25'];
  const wrongQuestions = ['Q4', 'Q6', 'Q10', 'Q14', 'Q19', 'Q22', 'Q24'];
  const unansweredQuestions = []; // Adjust this if needed

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Interview Performance Report', 10, 10);
    doc.text(`Company: ${companyName}`, 10, 20);
    doc.text(`Job Role: ${jobRole}`, 10, 30);
    doc.text(`Candidate: ${candidateName}`, 10, 40);
    doc.text(`Email: ${candidateEmail}`, 10, 50);
    doc.text('Total Questions: 25', 10, 60);
    doc.text('Correct Answers: 18', 10, 70);
    doc.text('Wrong Answers: 7', 10, 80);
    doc.text('Unanswered Questions: 0', 10, 90);
    doc.text('Marking Scheme: 4 marks for correct answers, -1 for wrong answers', 10, 100);
    doc.text('Overall Score: 72%', 10, 110);
    doc.text('Suggestions for Improvement:', 10, 130);
    doc.text('- Improve time management for coding questions.', 10, 140);
    doc.text('- Brush up on data structures and algorithms.', 10, 150);
    doc.text('- Practice more system design problems.', 10, 160);
    doc.text('Correct Questions: ' + correctQuestions.join(', '), 10, 180);
    doc.text('Wrong Questions: ' + wrongQuestions.join(', '), 10, 190);
    doc.text('Unanswered Questions: ' + (unansweredQuestions.length ? unansweredQuestions.join(', ') : 'None'), 10, 200);
    doc.save('InterviewReport.pdf');
  };

  return (
    <div className='report-container'>
      <div className="interview-report">
        {/* Company and Candidate Details */}
        <div className="company-candidate-details">
          <div className="company-info">
            <img src={companyLogo} alt="Company Logo" className="report-company-logo" />
            <div>
              <h3>{companyName}</h3>
              <p><strong>Job Role:</strong> {jobRole}</p>
            </div>
          </div>
          <div className="candidate-info">
            <p><strong>Candidate Name:</strong> {candidateName}</p>
            <p><strong>Email:</strong> {candidateEmail}</p>
          </div>
        </div>

        <h2>Interview Performance Overview</h2>

        <div className="score-overview">
          <div>
            <h3>Total Questions: 25</h3>
            <p><strong>Correct Answers:</strong> 18</p>
            <p><strong>Wrong Answers:</strong> 7</p>
            <p><strong>Unanswered Questions:</strong> 0</p>
            <p><strong>Marking Scheme:</strong> 4 marks for correct answers, -1 for wrong answers</p>
            <p><strong>Overall Score:</strong> 72%</p>
          </div>
          <div className="pie-chart-container">
            <Pie data={data} options={options} />
          </div>
        </div>

        {/* Question Breakdown */}
        <div className="question-section">
          <h3>Question Breakdown:</h3>
          <div className="question-category">
            <h4>Correct Questions:</h4>
            <p>{correctQuestions.join(', ')}</p>
          </div>
          <div className="question-category">
            <h4>Wrong Questions:</h4>
            <p>{wrongQuestions.join(', ')}</p>
          </div>
          <div className="question-category">
            <h4>Unanswered Questions:</h4>
            <p>{unansweredQuestions.length > 0 ? unansweredQuestions.join(', ') : 'None'}</p>
          </div>
        </div>

        <div className="improvement-section">
          <h3>What You Could Do Better:</h3>
          <ul>
            <li>Improve time management for coding questions.</li>
            <li>Brush up on data structures and algorithms.</li>
            <li>Practice more system design problems.</li>
          </ul>
        </div>

        <div className="button-container">
          <button className="back-btn" onClick={() => window.history.back()}>Back to Candidate Portal</button>
          <button className="download-btn" onClick={handleDownloadPDF}>Download Report as PDF</button>
        </div>
      </div>
    </div>
  );
}

export default InterviewReport;
