import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Link, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import '../stylesheets/ReportPage.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function InterviewReport() {
  const { userID, index } = useParams();
  const [userData, setUserData] = useState(null);
  const [report, setReport] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userID}/reports/${index}`);
        console.log('Response data:', response.data);

        const { report, interview, user } = response.data;

        if (!report || !interview || !user) {
          setError("Report or interview data not found");
          setLoading(false);
          return;
        }

        setUserData(user);
        setReport(report);
        setInterview(interview);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching the report:", err);
        setError("Failed to fetch the report");
        setLoading(false);
      }
    };

    fetchReport();
  }, [userID, index]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!userData || !report || !interview) return <p>No data available</p>;

  const { name, email } = userData;
  const { Domain_knowledge, Quality_of_responses, Work_Experience, Well_revised_with_new_Technology, Project_Work, Final_Score, createdAt } = report;

  const data = {
    labels: [
      "Domain Knowledge",
      "Quality of Responses",
      "Work Experience",
      "Revised with New Tech",
      "Project Work",
    ],
    datasets: [
      {
        label: "Scores",
        data: [
          Domain_knowledge,
          Quality_of_responses,
          Work_Experience,
          Well_revised_with_new_Technology,
          Project_Work,
        ],
        backgroundColor: ["#4CAF50", "#FF5252", "#FFC107", "#3F51B5", "#009688"],
        hoverBackgroundColor: [
          "#66BB6A",
          "#FF1744",
          "#FFD54F",
          "#5C6BC0",
          "#26A69A",
        ],
      },
    ],
  };

  const reportGenerationTime = new Date(createdAt).toLocaleString();

  const handleDownloadReport = () => {
    const input = document.getElementById("report-content"); // The content of the report
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const doc = new jsPDF();

      // Add report title
      doc.setFontSize(16);
      doc.text("Interview Report", 20, 20);

      // Add text content (user details and scores)
      doc.setFontSize(12);
      doc.text(`Company: ${interview}`, 20, 40);
      doc.text(`Name: ${name}`, 20, 50);
      doc.text(`Email: ${email}`, 20, 60);
      doc.text(`Report Generated At: ${reportGenerationTime}`, 20, 70);

      doc.text(`Domain Knowledge: ${Domain_knowledge}`, 20, 80);
      doc.text(`Quality of Responses: ${Quality_of_responses}`, 20, 90);
      doc.text(`Work Experience: ${Work_Experience}`, 20, 100);
      doc.text(`Revised with New Technology: ${Well_revised_with_new_Technology}`, 20, 110);
      doc.text(`Project Work: ${Project_Work}`, 20, 120);

      // Add the pie chart as an image
      doc.addImage(imgData, "PNG", 20, 130, 180, 100); // Adjust position and size of the image

      // Save the PDF
      doc.save("interview_report.pdf");
    });
  };

  return (
    <>
    <Navbar/>
    <div className="report-container">
      <div className="interview-report" id="report-content">
        <h2>Interview Report</h2>
        <div className="company-candidate-details">
          <div className="company-info">
            <p><strong>Company:</strong> {interview}</p>
          </div>
          <div className="candidate-info">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Report Generated At:</strong> {reportGenerationTime}</p>
          </div>
        </div>

        <div className="score-overview">
          <div><strong>Domain Knowledge:</strong> {Domain_knowledge}</div>
          <div><strong>Quality of Responses:</strong> {Quality_of_responses}</div>
          <div><strong>Work Experience:</strong> {Work_Experience}</div>
          <div><strong>Revised with New Technology:</strong> {Well_revised_with_new_Technology}</div>
          <div><strong>Project Work:</strong> {Project_Work}</div>
        </div>

        <div className="pie-chart-container">
          <Pie data={data} />
        </div>

        <div className="improvement-section">
          <h3>Improvement Areas</h3>
          <ul>
            {Domain_knowledge < 8 && <li>Improve domain knowledge</li>}
            {Quality_of_responses < 8 && <li>Enhance response quality</li>}
            {Work_Experience < 8 && <li>Gain more work experience</li>}
            {Well_revised_with_new_Technology < 8 && <li>Stay updated with new technology</li>}
            {Project_Work < 8 && <li>Improve project work presentation</li>}
          </ul>
        </div>

        <div className="button-container">
          <Link to='/pastinterviews'><button className="download-btn">Back</button></Link>
          <button className="download-btn" onClick={handleDownloadReport}>Download Report</button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default InterviewReport;
