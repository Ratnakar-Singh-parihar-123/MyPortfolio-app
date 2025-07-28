import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ProjectsCertificates.css";
// certificates
import c1 from "../../assets/c1.png"
import c2 from "../../assets/c2.png"

//projects
import p1 from "../../assets/TextUtils.png"
import p2 from "../../assets/MyPortfolio.png"

const PROJECTS = [
  {
    title: "TextUtils",
    subtitle: "React, BootStrap",
    image: p1,
    description:
      "A modern, animated portfolio built with React and Three.js for interactive 3D scene backgrounds.",
    link: "https://ratnakar-singh-parihar-123.github.io/TextUtils/",
    
  },
  {
    title: "MyPortfolio",
    subtitle: "React, Three Js, CSS",
    image: p2,
    description:
      "A modern, animated portfolio built with React and Three.js for interactive 3D scene backgrounds.",
    link: "#",
  },
  // Add more projects as needed...
];

const CERTIFICATES = [
  {
    title: "Problem Solving (Basic) ",
    issuer: "Coursera",
    image: c1,
    description:
      "Comprehensive course covering HTML, CSS, and JavaScript for responsive web applications.",
    link: "https://www.hackerrank.com/certificates/iframe/5ce289a1a111",
  },
  {
    title: "Problem Solving (Intermediate) ",
    issuer: "Udemy",
    image: c2,
    description: "Advanced React concepts covering hooks, context API, and performance optimization.",
    link: "https://www.hackerrank.com/certificates/iframe/cbf68707295d",
  },
  // Add more certificates as needed...
];

function Popup({ item, type, onClose }) {
  const overlayRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // Focus trap within popup for accessibility
  useEffect(() => {
    if (!overlayRef.current) return;

    const focusableElements = overlayRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length) {
      firstFocusableRef.current = focusableElements[0];
      lastFocusableRef.current = focusableElements[focusableElements.length - 1];
      firstFocusableRef.current.focus();
    }

    function handleTab(e) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current.focus();
        }
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", handleTab);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleTab);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Lock scroll when popup active
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="popup-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="popup-desc"
      ref={overlayRef}
      tabIndex={-1}
    >
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose} aria-label="Close popup" title="Close">
          &times;
        </button>

        <img src={item.image} alt={item.title} className="popup-img" />

        <h2 id="popup-title" className="popup-title">
          {item.title}
        </h2>

        <h4 className="popup-sub">{type === "project" ? item.subtitle : item.issuer}</h4>

        <p id="popup-desc" className="popup-desc">
          {item.description}
        </p>

        {item.link && (
          <a
            href={item.link}
            className="popup-link"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
          >
            {type === "project" ? "View Project" : "Show Certificate"}
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsCertificates() {
  const [popupItem, setPopupItem] = useState(null);
  const [popupType, setPopupType] = useState(null);

  // Keyboard accessibility: Escape key closes popup - handled in Popup component now

  // Handle keyboard "Enter" and "Space" for cards
  const handleKeyPress = useCallback((e, item, type) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPopupItem(item);
      setPopupType(type);
    }
  }, []);

  return (
    <section className="pc-section" id="projects-certs">
      <h2 className="pc-title">Projects & Certificates</h2>

      <div className="pc-list-container">
        <div className="pc-subtitle">Projects</div>
        <div className="pc-list" role="list">
          {PROJECTS.map((item) => (
            <div
              className="pc-card"
              key={item.title}
              onClick={() => {
                setPopupItem(item);
                setPopupType("project");
              }}
              tabIndex={0}
              role="button"
              aria-label={`Project: ${item.title}. Click or press Enter for details.`}
              onKeyDown={(e) => handleKeyPress(e, item, "project")}
            >
              <img src={item.image} alt={item.title} />
              <div className="pc-info">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pc-subtitle">Certificates</div>
        <div className="pc-list" role="list">
          {CERTIFICATES.map((item) => (
            <div
              className="pc-card"
              key={item.title}
              onClick={() => {
                setPopupItem(item);
                setPopupType("cert");
              }}
              tabIndex={0}
              role="button"
              aria-label={`Certificate: ${item.title} by ${item.issuer}. Click or press Enter for details.`}
              onKeyDown={(e) => handleKeyPress(e, item, "cert")}
            >
              <img src={item.image} alt={item.title} />
              <div className="pc-info">
                <h3>{item.title}</h3>
                <p>{item.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {popupItem && <Popup item={popupItem} type={popupType} onClose={() => setPopupItem(null)} />}
    </section>
  );
}
