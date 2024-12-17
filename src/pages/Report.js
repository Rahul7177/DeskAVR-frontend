// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import 'chart.js/auto';
// import jsPDF from 'jspdf';
// import '../stylesheets/Report.css';
// import bofa from '../assets/logos/bofa.png';

// function InterviewReport() {
//   const companyLogo = bofa; // Replace with the actual company logo URL
//   const companyName = 'Bank of America';
//   const jobRole = 'Software Engineer';
//   const candidateName = 'John Doe';
//   const candidateEmail = 'john.doe@email.com';
  
//   // Sample questions with answers and scores
//   const questions = [
//     { question: '1) Introduce yourself.', answer: 'I am a software engineer with a passion for coding.', score: 8 },
//     { question: '2) What is your experience with JavaScript?', answer: 'I have worked on several projects using JavaScript.', score: 7 },
//     { question: '3) Explain closure in JavaScript.', answer: 'A closure is a function that retains access to its lexical scope.', score: 9 },
//     { question: '4) What are promises in JavaScript?', answer: 'Promises are objects representing the eventual completion of an asynchronous operation.', score: 6 },
//     { question: '5) Describe the concept of inheritance in OOP.', answer: 'Inheritance allows a class to inherit properties and methods from another class.', score: 8 },
//     { question: '6) What is your experience with React?', answer: 'I have built several applications using React.', score: 9 },
//     { question: '7) How do you handle state management in React?', answer: 'I use Context API and Redux for state management.', score: 7 },
//     { question: '8) Explain the concept of RESTful APIs.', answer: 'RESTful APIs allow communication between client and server using HTTP requests.', score: 8 },
//     { question: '9) What is your experience with version control systems?', answer: 'I regularly use Git for version control.', score: 9 },
//     { question: '10) How do you approach debugging?', answer: 'I use console logs and debugging tools to troubleshoot issues.', score: 6 },
//   ];

//   // Calculate marks for the pie chart
//   const correctAnswers = questions.filter(q => q.score >= 6).length;
//   const wrongAnswers = questions.filter(q => q.score < 6).length;
//   const unansweredQuestions = questions.filter(q => !q.answer).length;

//   const totalMarks = questions.reduce((acc, q) => acc + (q.score > 0 ? q.score : 0), 0);
//   const totalQuestions = questions.length;
//   const maxMarksPerQuestion = 10; // Assuming each question is out of 10
//   const overallScore = (totalMarks / (totalQuestions * maxMarksPerQuestion)) * 100;

//   const data = {
//     labels: ['Marks Scored', 'Marks Lost'],
//     datasets: [
//       {
//         label: 'Interview Performance',
//         data: [totalMarks, (totalQuestions * maxMarksPerQuestion) - totalMarks],
//         backgroundColor: ['#4CAF50', '#FF5252'],
//         hoverBackgroundColor: ['#66BB6A', '#FF1744'],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//     },
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Interview Performance Report', 10, 10);
//     doc.text(`Company: ${companyName}`, 10, 20);
//     doc.text(`Job Role: ${jobRole}`, 10, 30);
//     doc.text(`Candidate: ${candidateName}`, 10, 40);
//     doc.text(`Email: ${candidateEmail}`, 10, 50);
//     doc.text(`Total Questions: ${totalQuestions}`, 10, 60);
//     doc.text(`Marks Scored: ${totalMarks}`, 10, 70);
//     doc.text(`Overall Score: ${overallScore.toFixed(2)}%`, 10, 80);
//     doc.text('Question Breakdown:', 10, 100);

//     questions.forEach((q, index) => {
//       doc.text(`${index + 1}) ${q.question}`, 10, 110 + (index * 10));
//       doc.text(`Answer: ${q.answer}`, 20, 115 + (index * 10));
//       doc.text(`Marks: ${q.score}`, 20, 120 + (index * 10));
//     });

//     doc.save('InterviewReport.pdf');
//   };

//   return (
//     <div className='report-container'>
//       <div className="interview-report">
//         <div className="company-candidate-details">
//           <div className="company-info">
//             <img src={companyLogo} alt="Company Logo" className="report-company-logo" />
//             <div>
//               <h3>{companyName}</h3>
//               <p><strong>Job Role:</strong> {jobRole}</p>
//             </div>
//           </div>
//           <div className="candidate-info">
//             <p><strong>Candidate Name:</strong> {candidateName}</p>
//             <p><strong>Email:</strong> {candidateEmail}</p>
//             <p><strong>Date :</strong> 12/10/2024</p>
//           </div>
//         </div>

//         <h2>Interview Performance Overview</h2>

//         <div className="score-overview">
//           <div>
//             <h3>Total Questions: {totalQuestions}</h3>
//             <p><strong>Marks Scored:</strong> {totalMarks}</p>
//             <p><strong>Overall Score:</strong> {overallScore.toFixed(2)}%</p>
//           </div>
//           <div className="pie-chart-container">
//             <Pie data={data} options={options} />
//           </div>
//         </div>

//         {/* Question Breakdown */}
//         <div className="question-section">
//           <h3>Question Breakdown:</h3>
//           {questions.map((q, index) => (
//             <div className="question-category" key={index}>
//               <h4>{q.question}</h4>
//               <p><strong>Answer:</strong> {q.answer}</p>
//               <p><strong>Marks Scored:</strong> {q.score}</p>
//             </div>
//           ))}
//         </div>

//         <div className="button-container">
//           <button className="back-btn" onClick={() => window.history.back()}>Back to Candidate Portal</button>
//           <button className="download-btn" onClick={handleDownloadPDF}>Download Report as PDF</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InterviewReport;
