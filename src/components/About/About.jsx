import React from 'react';
import './About.css';
import profileImage from '../../assets/developer.png';
import resumeFile from '../../assets/RSP.pdf'; // ✅ No space in filename
import { FaDownload } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        
        {/* Profile Image */}
        <div className="about-left">
          <img src={profileImage} alt="Developer Ratnakar Singh" className="about-img" />
        </div>

        {/* Text and Resume */}
        <div className="about-right">
          <h2 className="about-title">About Me</h2>
          <div className="about-content">
            <p>
              Hello! I'm <strong>Ratnakar Singh</strong>, a passionate and detail-oriented <strong>Full-Stack Web Developer</strong> building efficient and modern web applications with the <strong>MERN stack</strong>.
            </p>
            <p>
              I work with <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong>. I enjoy writing clean code, solving problems, and optimizing performance.
            </p>
            <p>
              I also love exploring new tech and contributing to meaningful projects that make an impact.
            </p>

            <a
              href={resumeFile}
              download="Ratnakar_Singh_Resume.pdf"
              className="resume-button"
              aria-label="Download Resume PDF"
            >
              <FaDownload /> Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
