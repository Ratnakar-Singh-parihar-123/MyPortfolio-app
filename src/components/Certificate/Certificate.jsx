// src/components/Certificate/Certificates.jsx

import React, { useState, useEffect } from 'react';
import './Certificate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCertificate } from 'react-icons/fa';

import img1 from '../../assets/certificatesProblemSolvingBasic.png';
import img2 from '../../assets/certificatesProblemSolvingIntermediate.png';
import img3 from '../../assets/AWS.png';


const Certificates = () => {
  const [activeCert, setActiveCert] = useState(null);

  const certificates = [
    {
      title: 'Problem Solving (Basic)',
      thumbnail: img1,
      image: img1,
    },
    {
      title: 'Problem Solving (Intermediate)',
      thumbnail: img2,
      image: img2,
    },
    {
      title: 'AWS',
      thumbnail: img3,
      image: img3,
    },
    // ✅ Add more certificate objects as needed
  ];

  // Initialize AOS animation
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Handle modal and ESC key
  useEffect(() => {
    document.body.classList.toggle('no-scroll', !!activeCert);

    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveCert(null);
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('no-scroll');
    };
  }, [activeCert]);

  return (
    <section className="certificate-section" id="certificates">
      <div className="certificate-container">
        <h2 className="certificate-title" data-aos="fade-up">
          <FaCertificate /> My Certificates
        </h2>
        <p className="certificate-subtitle" data-aos="fade-up">
          📜 Tap any certificate to view it in detail
        </p>

        <div className="cert-grid" data-aos="fade-up">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="cert-card"
              onClick={() => setActiveCert(cert)}
              data-aos="zoom-in"
            >
              <img
                src={cert.thumbnail}
                alt={cert.title}
                className="cert-thumb"
              />
              <div className="cert-name">{cert.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal popup */}
      {activeCert && (
        <div
          className="cert-modal-overlay"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}
            data-aos="zoom-in"
          >
            <button
              className="cert-close-btn"
              onClick={() => setActiveCert(null)}
              aria-label="Close"
            >
              ✖
            </button>
            <h3 className="cert-modal-title">{activeCert.title}</h3>
            <img
              src={activeCert.image}
              alt={activeCert.title}
              className="cert-modal-img"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
