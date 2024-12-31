import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import blog_img from '../assets/logos/blog.jpg'
import '../stylesheets/BlogPage.css';

const BlogDetail = () => {
  return (
    <>
      <Navbar />
      <div className="blog-detail-page">
        <div className="blog-detail-container">
          <h1 className="blog-title">
            DeskAVR: The Ultimate Virtual Interview Platform for Engineering Students!
          </h1>
          <p className="blog-tagline">DeskAVR: Your success is our mission!</p>
          <hr></hr>
          <section className="section">
            <h2>What is DeskAVR?</h2>
            <p>
              DeskAVR is a next-generation virtual interview platform designed specifically for engineering students aiming to crack interviews in top tech companies. Whether you’re aiming for a software engineering role, a data scientist position, or a machine learning developer role, DeskAVR is your go-to tool for perfecting your interview skills.
            </p>
            <h3>How DeskAVR redefines the traditional interview prep:</h3>
            <ul>
              <li>Choose Your Role, Company, and Difficulty Level</li>
              <li>Gamified Virtual Environment</li>
              <li>Practice Behavioral & Technical Questions</li>
              <li>AI-Powered Feedback</li>
              <li>Detailed Reports for Improvement</li>
            </ul>
          </section>

          <section className='section blogimg_section'>
              <img src={blog_img} className='blog-img' alt='Blog'/>
          </section>

          <section className="section">
            <h2>Why Engineering Students Need DeskAVR</h2>
            <p>
              If you’ve ever applied for jobs at top tech companies, you know that the interview process can be daunting. Even with solid knowledge of data structures, algorithms, and system design, many students fail to perform in the actual interview due to lack of real-world interview exposure. And that’s exactly where DeskAVR comes in.
            </p>
            <h3>Here’s why DeskAVR is your ultimate interview prep tool:</h3>
            <ul>
              <li>Real-World Experience</li>
              <li>Advanced AI</li>
              <li>Track Your Progress</li>
            </ul>
          </section>

          <section className="section">
            <h2>DeskAVR vs Traditional Interview Prep: Why It Works</h2>
            <p>
              Most students use textbooks, mock interviews, or YouTube videos to prepare. But there’s a fundamental flaw: none of them replicate the real interview experience. DeskAVR offers a unique immersive experience by combining:
            </p>
            <ul>
              <li>Technical Preparation</li>
              <li>Behavioral Interview Skills</li>
              <li>Real-Time Feedback</li>
            </ul>
          </section>

          <section className="section">
            <h2>How DeskAVR Works</h2>
            <ol>
              <li>Sign Up for DeskAVR and choose your plan.</li>
              <li>Select the company, role, and interview difficulty level.</li>
              <li>Start practicing in the virtual interview environment.</li>
              <li>Receive AI-driven feedback and a detailed performance report to improve.</li>
              <li>Go to your real interview armed with confidence and a solid track record of practice.</li>
            </ol>
          </section>

          <section className="section">
            <h2>The DeskAVR Advantage for Engineering Students</h2>
            <p>
              As an engineering student, you’ve likely heard the common complaints: "I know my stuff, but I can’t perform well in interviews." DeskAVR solves this problem by giving you unlimited practice opportunities in a stress-free virtual environment. From mastering coding problems to perfecting your public speaking, DeskAVR ensures you’re prepared for every part of the interview process.
            </p>
          </section>
          <hr></hr>
          <section className="cta-section">
            <h2>Ready to Level Up Your Interview Skills?</h2>
            <p>
              Why wait for your first real interview to be the ultimate test? With DeskAVR, you can practice, fail, and learn without any consequences. Your dream job is just one click away. Visit DeskAVR Demo or sign up today to start preparing for your next big interview!
            </p>
            <Link to="/candidate" className="cta-button">Experience Now</Link>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
