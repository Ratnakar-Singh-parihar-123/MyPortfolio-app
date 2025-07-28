import React, { useEffect, useState, useRef } from "react";
import "./LoadingScreen.css";
import logoImg from '../../assets/logo.jpeg'

export default function LoadingScreen({ onFinish }) {
  const [visible, setVisible] = useState(false);
  const finishedRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setVisible(true);

    // Ensures finish is called only once
    const finishOnce = () => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setVisible(false);
        // Delay to allow fade out animation to complete
        timeoutRef.current = setTimeout(() => {
          onFinish();
        }, 400);
      }
    };

    if (prefersReducedMotion) {
      // Skip speech and animate for a short duration only
      timeoutRef.current = setTimeout(finishOnce, 1100);
      return () => clearTimeout(timeoutRef.current);
    }

    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    // Create the utterance
    const utterance = new SpeechSynthesisUtterance(
      "Welcome to ratnakar portfolio"
    );
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    // Set callbacks
    utterance.onstart = () => setVisible(true);
    utterance.onend = finishOnce;
    utterance.onerror = finishOnce;

    // Speak
    window.speechSynthesis.speak(utterance);

    // Cleanup on unmount
    return () => {
      window.speechSynthesis.cancel();
      clearTimeout(timeoutRef.current);
    };
  }, [onFinish]);

  return (
    <div
      className={`loading-container${visible ? " visible" : ""}`}
      role="alert"
      aria-live="assertive"
      aria-busy={visible}
      aria-label="Loading portfolio welcome screen"
    >
      {/* Branding or logo */}
      <img src={logoImg} alt="Ratnakar portfolio logo" className="loading-logo" />

      <div className="spinner" aria-hidden="true" />

      <h1 className="loading-text" aria-label="Loading Portfolio...">
        Loading Portfolio...
      </h1>

      {/* Screen reader only fallback */}
      <span className="sr-only">Welcome to ratnakar portfolio</span>
    </div>
  );
}
