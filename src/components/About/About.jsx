import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./About.css";

const skills = [
  "Full Stack Web Development (MERN)",
  "Data Structures & Algorithms (DSA)",
  "LeetCode 300+ Problems Solved",
  "Responsive & Accessible Design",
  "Unique Project Development & UI/UX",
];

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.45,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  // Scroll handler
  const handleScrollToEnd = () => {
    const target = document.getElementById("contact"); // Change "contact" to the target section's ID
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      className="about-section"
      id="about"
      aria-labelledby="about-heading"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariant}
    >
      <div className="about-container">
        <motion.h2 className="about-title" id="about-heading" variants={itemVariant}>
          About Me
        </motion.h2>

        <motion.p className="about-intro" variants={itemVariant}>
          I’m a <span className="highlight">final-year Computer Science student</span> with a strong foundation in
          <strong> Data Structures & Algorithms</strong>, regularly practicing on <strong>LeetCode</strong> and
          participating in coding challenges. My focus lies in <span className="highlight">Full Stack Web Development</span>,
          where I build <em>unique, real-world projects</em> using the <strong>MERN stack</strong>, backed by clean architecture
          and optimized logic. I enjoy solving complex problems and creating intuitive user interfaces that not only look great
          but also perform efficiently.
        </motion.p>

        <motion.ul
          className="about-skills"
          role="list"
          aria-label="Skills list"
          variants={containerVariant}
        >
          {skills.map((skill) => (
            <motion.li
              key={skill}
              className="skill-item"
              tabIndex="0"
              variants={itemVariant}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 6px 22px rgba(62,139,255,0.43)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              whileFocus={{
                scale: 1.08,
                boxShadow: "0 6px 22px rgba(62,139,255,0.43)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {skill}
            </motion.li>
          ))}
        </motion.ul>

        {/* Scroll Button */}
        <a href="https://linked-in-developer-card.vercel.app/">
          <motion.button
            className="btn btn-primary"
            onClick={handleScrollToEnd}
            variants={itemVariant}
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            type="button"
            aria-label="Scroll to contact section"
            style={{ marginTop: "2rem", alignSelf: "center" }}
          >
            More then.
          </motion.button>
        </a>
      </div>
    </motion.section>
  );
}
