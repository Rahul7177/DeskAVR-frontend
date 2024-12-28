import React, { useEffect, useRef } from 'react';
import '../stylesheets/Founders.css'; // Create a separate CSS file for Founders styling
import founder_img from '../assets/logos/founders_img.png'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Founders = () => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const contentEl = contentRef.current;
    const imageEl = imageRef.current;

    gsap.fromTo(
      contentEl,
      { opacity: 0, y: 50 }, // Initial state
      {
        opacity: 1,
        y: 0,
        duration: 2,
        scrollTrigger: {
          trigger: contentEl,
          start: 'top 60%',
          end: 'bottom 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      imageEl,
      { opacity: 0, x: -50 }, // Initial state
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: imageEl,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div className="founders-section">
      <div className="founders-container">
        <div className="founders-content" ref={contentRef}>
          <h2 className="founders-title">Founder's Note</h2>
          <p className="founders-description">
            <strong>Your success is our mission.</strong>
          </p>
          <p className="founders-description">
            At DeskAVR, we aim to transform interview preparation with immersive, real-world simulations. 
            Traditional methods lack the intensity and realism needed to build true confidence. That's why 
            we created a platform that uses AR/VR to help users practice, improve, and excel in interviews.
          </p>
          <p className="founders-description">
            With lifelike scenarios, detailed feedback, and actionable insights, DeskAVR ensures you're always a step ahead.
          </p>
        </div>
        <div className="founders-image-container" ref={imageRef}>
          <img 
            src={founder_img}
            alt="Founder" 
            className="founders-image" 
          />
        </div>
      </div>
    </div>
  );
};

export default Founders;
