import React, { useState, useEffect } from 'react';
import './Contact.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  // Auto-hide popup after 3 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs.send(
      'service_thj6ub7', // ✅ Check your actual EmailJS service ID
      'template_htq0n85', // ✅ Check template ID
      formData,
      '5l6AYQ05dqAW96AgA' // ✅ Public key
    )
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
      })
      .finally(() => setLoading(false));
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">📬 Let's Connect</h2>
      <p className="contact-subtext">
        I'd love to hear from you — whether it's a project idea or just a hello!
      </p>

      <div className="contact-container">
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-label="Your Name"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Your Email"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            aria-label="Your Message"
          ></textarea>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="popup success">✅ Your message has been sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="popup error">❌ Oops! Something went wrong. Please try again.</p>
          )}
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <div><FaEnvelope className="icon" /> ratnakarsinghparihar9399@gmail.com</div>
          <div><FaPhone className="icon" /> +91 9399741051</div>
          <div><FaMapMarkerAlt className="icon" /> Ashoka Garden, Bhopal (MP), India</div>

          {/* Enable this map section only if you have the Google Maps API key */}
          {/*
          <div className="map-container">
            <iframe
              title="My Location"
              src="https://www.google.com/maps/embed/v1/place?q=Ashoka+Garden,+Bhopal,+Madhya+Pradesh,+India&key=YOUR_GOOGLE_MAPS_API_KEY"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
