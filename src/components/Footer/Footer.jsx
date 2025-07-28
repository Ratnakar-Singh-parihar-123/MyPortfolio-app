import React from "react";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-brand">
          <a href="#top" className="footer-logo" aria-label="Back to top">
            RSP.
          </a>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Ratnakar Singh Parihar. All Rights Reserved.
          </p>
        </div>

        <nav className="footer-socials" aria-label="Social media links">
          <a
            href="https://github.com/Ratnakar-Singh-parihar-123"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="footer-social-link"
            tabIndex={0}
          >
            <svg
              aria-hidden="true"
              height="24"
              width="24"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.7 7.7 0 012.01-.27c.68 0 1.37.09 2.01.27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-2.87 3.75-5.49 3.95.43.37.81 1.09.81 2.21 0 1.59-.02 2.88-.02 3.27 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="footer-social-link"
            tabIndex={0}
          >
            <svg
              aria-hidden="true"
              height="24"
              width="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.3h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2v4.5h-3v-9h3v1.3c.41-.76 1.34-1.3 2.34-1.3 1.65 0 3 1.35 3 3v5z"/>
            </svg>
          </a>

          <a
            href="mailto:ratnakarsinghparihar9
            399@gmail.com"
            aria-label="Email"
            className="footer-social-link"
            tabIndex={0}
          >
            <svg
              aria-hidden="true"
              height="24"
              width="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z"/>
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
}
