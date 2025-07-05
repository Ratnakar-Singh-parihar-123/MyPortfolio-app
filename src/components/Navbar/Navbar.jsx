// src/components/Navbar/Navbar.jsx

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  const navLinks = ['Home', 'About', 'Skills', 'Certificate', 'Projects', 'Contact'];

  // Handle theme toggle
  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  // Hide navbar on scroll down
  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setHideNavbar(current > lastScroll && current > 80);
      lastScroll = current;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  // Close menu on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <nav className={`nav ${hideNavbar ? 'hide-navbar' : ''}`}>
        <div className="nav-logo">RSP.</div>

        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-icons">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="side-menu-button"
            aria-label="Open Menu"
          >
            <FaBars className="menu-icon" />
          </button>
        </div>
      </nav>

      {/* Side menu for mobile */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMenuOpen(false)}
          className="close-btn"
          aria-label="Close Menu"
        >
          <FaTimes />
        </button>

        <ul>
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="side-theme-toggle">
          <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Close overlay"
        ></div>
      )}
    </>
  );
};

export default Navbar;
