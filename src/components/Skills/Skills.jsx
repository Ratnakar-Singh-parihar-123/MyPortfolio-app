import React from "react";
import { useInView } from "react-intersection-observer";
import "./Skills.css";

const SKILLS = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 85 },
      { name: "CSS / Tailwind CSS", level: 80 },
      { name: "JavaScript", level: 90 },
      { name: "Three.js / 3D Web", level: 75 },
      { name: "TypeScript", level: 70 },
      { name: "Redux", level: 65 },
      { name: "Vue.js", level: 60 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 70 },
      { name: "Express", level: 65 },
      { name: "MongoDB", level: 60 },
      { name: "SQL / PostgreSQL", level: 75 },
      { name: "GraphQL", level: 55 },
      { name: "Django", level: 50 },
    ],
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git & GitHub", level: 85 },
      { name: "Figma / UI Design", level: 70 },
      { name: "VS Code / Debugging", level: 90 },
      { name: "Docker", level: 60 },
      { name: "Jest / Testing", level: 50 },
      { name: "AWS / Cloud Services", level: 45 },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Communication", level: 90 },
      { name: "Teamwork", level: 85 },
      { name: "Problem Solving", level: 80 },
      { name: "Time Management", level: 75 },
    ],
  },
];

// Colors with alpha transparency
const COLORS = [
  "rgba(255, 107, 107, 0.85)", // Red
  "rgba(107, 203, 119, 0.85)", // Green
  "rgba(77, 150, 255, 0.85)",  // Blue
  "rgba(255, 217, 61, 0.85)",  // Yellow
  "rgba(255, 111, 145, 0.85)", // Pink
  "rgba(132, 94, 194, 0.85)",  // Purple
  "rgba(0, 201, 167, 0.85)",   // Teal
];

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="skills-section" id="skills" aria-label="Skills section" ref={ref}>
      <h2 className="skills-title">My Skills</h2>
      <div className="skills-container" aria-live="polite" aria-atomic="true">
        {SKILLS.map(({category, items}, catIndex) => (
          <div className="skills-category" key={category}>
            <h3 tabIndex={0}>{category}</h3>
            <ul>
              {items.map(({name, level}, index) => {
                const color = COLORS[(catIndex + index) % COLORS.length];
                return (
                  <li
                    key={name}
                    className="skill-item"
                    tabIndex={0}
                    aria-label={`${name} skill level ${level} percent`}
                  >
                    <div className="skill-top">
                      <span className="skill-name">{name}</span>
                      <span className="skill-level">{level}%</span>
                    </div>
                    <div className="skill-bar-bg" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={level} aria-label={`${name} skill proficiency`}>
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: inView ? `${level}%` : "0%",
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
