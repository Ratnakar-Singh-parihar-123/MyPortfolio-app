import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    if (localStorage.theme) return localStorage.theme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);

  // Apply/remove dark mode class on <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Lock body scroll when menu is open (mobile)
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Focus trapping inside side menu
  useEffect(() => {
    if (!menuOpen) return;

    const focusableEls = sideMenuRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusableEls.length) focusableEls[0].focus();

    function trapFocus(e) {
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      } else if (e.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [menuOpen]);

  // Handler to toggle menu
  const toggleMenu = useCallback(() => {
    setMenuOpen((v) => !v);
  }, []);

  // Handler for nav link click: close menu
  const handleNavClick = useCallback(() => {
    if (menuOpen) setMenuOpen(false);
  }, [menuOpen]);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Primary navigation">
        <div className="navbar-container">
          <a href="/" className="navbar-logo" aria-label="Homepage">
            RSP
          </a>

          {/* Desktop Menu */}
          <ul className="navbar-links">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} onClick={handleNavClick}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Controls: DarkMode & Hamburger */}
          <div className="navbar-controls">
            <button
              className="darkmode-toggle"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setDarkMode((d) => !d)}
              title="Toggle light/dark mode"
            >
              {darkMode ? (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3.25a8.75 8.75 0 0 0 0 17.5 8.75 8.75 0 0 0 0-17.5zM12 0v3.25m0 17.5V24m-8.485-8.485H0m24 0h-3.515m-13.435-6.364-2.293-2.293M18.728 18.728l-2.293-2.293M4.222 18.728l2.293-2.293M18.728 4.222l-2.293 2.293" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                </svg>
              )}
            </button>

            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="side-menu"
              onClick={toggleMenu}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* Side Menu Overlay */}
      <div
        id="side-menu"
        className={`side-menu ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      >
        <nav
          className="side-menu-content"
          ref={sideMenuRef}
          onClick={(e) => e.stopPropagation()}
          aria-label="Mobile navigation"
        >
          <ul>
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} onClick={handleNavClick} tabIndex={menuOpen ? 0 : -1}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
