// src/components/Footer/Footer.jsx

import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <h2 className="footer-title">Ratnakar Singh Parihar</h2>
        <p className="footer-subtext">Crafting clean and modern web experiences.</p>

        <div className="social-icons">
          <a
            className="icon"
            href="https://github.com/Ratnakar-Singh-parihar-123"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            className="icon"
            href="https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            className="icon"
            href="https://x.com/RatnakarSi85551"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ratnakar Singh Parihar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
