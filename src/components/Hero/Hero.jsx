import React from "react";
import { color, motion } from "framer-motion";

import "./Hero.css";
import HeroImg from "../../assets/krishna.jpeg";
import Resume from "../../assets/ratnakar.pdf"

const SKILLS = [
  { name: "React JS", color: "#61dafb" },
  { name: "Tailwind CSS", color: "#6e94ff" },
  {name: "HTML", color:"#ea1818ff"},
  { name: "CSS", color: "#2965f1" },
  { name: "JavaScript", color: "#f0db4f", darkText: true },
  { name: "UI/UX", color: "#ff6f61" },
  {name: "Node JS", color: "#8add0eff"},
  {name: "Express JS", color: "#e0cb13ff"},
  {name: "MongoDB", color: "#3b8762ff"},
  {name: "MySQL", color: "#1f85c5ff"},
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.65, type: "spring", stiffness: 60 },
  }),
};

export default function Hero() {
  return (
    <section className="hero-section" aria-label="Hero section showcasing skills and call to actions">
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          tabIndex={0}
        >
          <div>
            <span className="greeting">Hello I'm </span>
            <span className="name">Ratnakar Singh Parihar</span>
          </div>

        </motion.h1>

        <motion.p
          className="hero-desc"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          tabIndex={0}
        >
          Create a stunning online presence with a modern, responsive, animated portfolio.
          Make your first impression unforgettable.
        </motion.p>

        <motion.div className="hero-skills" initial="hidden" animate="visible" aria-label="Skills badges">
          {SKILLS.map((skill, i) => (
            <motion.span
              key={skill.name}
              className={`skill-badge${skill.darkText ? " dark-text" : ""}`}
              style={{ backgroundColor: skill.color }}
              whileHover={{ scale: 1.15, boxShadow: "0 6px 30px rgba(0,0,0,0.24)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + 0.06 * i, duration: 0.4, type: "tween" }}
              tabIndex={0}
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="hero-buttons"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          role="group"
          aria-label="Hero call to action buttons"
        >
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{ scale: 1.07, boxShadow: "0 12px 40px rgba(56,123,243,0.15)" }}
            whileTap={{ scale: 0.96 }}
            tabIndex={0}
            aria-label="View Projects"
          >
            View Projects
          </motion.a>

          <motion.a
            href={Resume}
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.07, borderColor: "#38a3d1", background: "#6e94ff", color: "#fff" }}
            whileTap={{ scale: 0.96 }}
            tabIndex={0}
            aria-label="View Resume"
          >
            View Resume
          </motion.a>
        </motion.div>

        <motion.div
          className="hero-socials"
          aria-label="Social media links"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-link"
            whileHover={{ scale: 1.22, color: "#38a3d1" }}
            whileTap={{ scale: 0.88 }}
            tabIndex={0}
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7 0h4.8v2.3h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.65V24H17v-7.76c0-1.85-.04-4.23-2.58-4.23-2.58 0-2.98 2.02-2.98 4.1V24H7V8z" />
            </svg>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/9399741051"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="social-link"
            whileHover={{ scale: 1.22, color: "#28cd65" }}
            whileTap={{ scale: 0.88 }}
            tabIndex={0}
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.52 3.48A11.778 11.778 0 0 0 12.04 0 11.998 11.998 0 0 0 0 12c0 2.11.55 4.08 1.52 5.79L0 24l5.81-1.48A11.91 11.91 0 0 0 12 24a11.998 11.998 0 0 0 8.52-20.52zm-6 16.2h-.01a7.897 7.897 0 0 1-4.02-1.1l-.29-.17-2.68.7.71-2.61-.19-.27a7.889 7.889 0 0 1 1.22-10.44 7.914 7.914 0 0 1 11.24 2.58 7.889 7.889 0 0 1-6.49 11z" />
            </svg>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/Ratnakar-Singh-parihar-123"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-link"
            whileHover={{ scale: 1.22, color: "#333" }}
            whileTap={{ scale: 0.88 }}
            tabIndex={0}
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61C4.422 17.07 3.633 16.7 3.633 16.7c-1.086-.742.084-.727.084-.727 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.996.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.333-5.466-5.932 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.005-.403c1.02.005 2.045.138 3.005.403 2.29-1.553 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.48 5.922.429.37.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .32.216.694.826.576C20.565 21.796 24 17.3 24 12c0-6.628-5.372-12-12-12z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="hero-illustration"
        initial={{ opacity: 0, scale: 0.98, x: 60 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.15, type: "spring", stiffness: 38 }}
        aria-hidden="true"
      >
        <img src={HeroImg} alt="3D Hero" />
      </motion.div>
    </section>
  );
}
