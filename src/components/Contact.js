import React, { useState } from 'react';
import vectorContact from '../assets/logos/conatct.png'; 
import '../stylesheets/Contact.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Your message has been sent!');
  };

  return (
    <div className="contactus-section" id='contact'>
      <div className="contactus-container">
        <h2 className="contactus-title">Contact Us</h2>
        <p className="contactus-description">
          Have any questions? We’d love to hear from you! Reach out to us via the form below, and our team will get back to you as soon as possible.
        </p>

        <div className="contactus-content">
          <div className="contactus-card">
            <img src={vectorContact} alt="Contact Us" className="contactus-image" />
            <h3 className="contactus-card-title">Get In Touch</h3>
            <p className="contactus-card-description">
              We’re here to help you with any questions or concerns. Don’t hesitate to contact us!
            </p>
          </div>

          <form className="contactus-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contactus-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contactus-input"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="contactus-textarea"
            />
            <button type="submit" className="contactus-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
