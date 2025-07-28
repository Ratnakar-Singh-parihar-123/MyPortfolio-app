import React, { useEffect, useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate fade-in on mount
    setVisible(true);
  }, []);

  return (
    <section
      className={`contact-section ${visible ? "visible" : ""}`}
      id="contact"
      aria-label="Contact section"
    >
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="contact-title">Contact Me</h2>
          <p className="contact-desc">
            Feel free to reach out for project collaborations, freelance
            opportunities, or just to connect!
          </p>

          <form
            className="contact-form"
            action="mailto:youremail@example.com"
            method="POST"
            encType="text/plain"
            noValidate
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                className="form-input"
                placeholder=" "
                required
                aria-required="true"
                aria-describedby="name-error"
              />
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <span id="name-error" className="input-error" />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                className="form-input"
                placeholder=" "
                required
                aria-required="true"
                aria-describedby="email-error"
              />
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <span id="email-error" className="input-error" />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                id="message"
                className="form-textarea"
                placeholder=" "
                required
                aria-required="true"
                rows={5}
                aria-describedby="message-error"
              />
              <label htmlFor="message" className="form-label">
                Your Message
              </label>
              <span id="message-error" className="input-error" />
            </div>

            <button type="submit" className="form-btn" aria-label="Send Message">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-map-wrapper" aria-label="Location map">
          <iframe
            className="contact-map"
            title="Location Map"
            src="https://maps.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen=""
            loading="lazy"
            aria-hidden="false"
          />
        </div>
      </div>
    </section>
  );
}
