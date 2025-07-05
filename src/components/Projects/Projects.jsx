import React, { useState } from 'react';
import './Projects.css';
import CharacterCounts from "../../assets/CharacterCounts.png";
import Notepad from "../../assets/Notepad.png";
import Calculator from "../../assets/Calculator.png";
import TextUtils from "../../assets/TextUtils.png";
import QRCodeGenerator from "../../assets/QR-Code Generator.png";
import DigitalClocks from "../../assets/Digital Clocks.png";

const projects = [
  {
    title: 'Character Counts',
    description: 'Counts characters in your text instantly.',
    tech: ['React.js'],
    image: CharacterCounts,
    liveLink: 'https://ratnakar-singh-parihar-123.github.io/Character-Count/',
    codeLink: 'https://github.com/Ratnakar-Singh-parihar-123/Character-Count'
  },
  {
    title: 'My Notepad',
    description: 'A lightweight notepad to write, save, and manage your notes easily.',
    tech: ['React.js'],
    image: Notepad,
    liveLink: 'https://ratnakar-singh-parihar-123.github.io/NotePad/',
    codeLink: 'https://github.com/Ratnakar-Singh-parihar-123/NotePad'
  },
  {
    title: 'Calculator',
    description: 'Clean, responsive calculator for basic operations.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: Calculator,
    liveLink: 'https://calculator-wheat-seven-14.vercel.app/',
    codeLink: 'https://github.com/Ratnakar-Singh-parihar-123/calculator'
  },
  {
    title: 'TextUtils',
    description: 'Convert, count, and clean text with this utility app.',
    tech: ['React.js', 'Bootstrap'],
    image: TextUtils,
    liveLink: 'https://ratnakar-singh-parihar-123.github.io/TextUtils/',
    codeLink: 'https://github.com/Ratnakar-Singh-parihar-123/TextUtils'
  },
  {
    title: 'QR-Code Generator',
    description: 'Generate QR codes from any text or link.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: QRCodeGenerator,
    liveLink: 'https://ratnakar-singh-parihar-123.github.io/QR-Code-Generator/',
    codeLink: 'https://github.com/Ratnakar-Singh-parihar-123/QR-Code-Generator'
  },
  {
    title: 'Digital Clocks',
    description: 'Real-time digital clock with live time display.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: DigitalClocks,
    liveLink: 'https://ratnakar-singh-parihar-123.github.io/Digital-clocks/',
    codeLink: 'https://github.com/Ratnakar-Singh-parihar-123/Digital-clocks'
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">📁 My Projects</h2>
      <p className="projects-hint">⬇ Click on a project to view details</p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() => openModal(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal(project)}
            aria-label={`View project ${project.title}`}
          >
            <img src={project.image} alt={`${project.title} screenshot`} className="project-thumbnail" />
            <h3>{project.title}</h3>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal} aria-label="Close modal">✕</button>

            <img
              src={selectedProject.image}
              alt={`${selectedProject.title} detailed view`}
              className="modal-img"
            />

            <h3>{selectedProject.title}</h3>
            <p>{selectedProject.description}</p>

            <div className="tech-stack">
              {selectedProject.tech.map((tech, i) => (
                <span key={i} className="tech">{tech}</span>
              ))}
            </div>

            <div className="project-links">
              <a href={selectedProject.liveLink}  rel="noreferrer">🔗 Live</a>
              <a href={selectedProject.codeLink}  rel="noreferrer">💻 Code</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
