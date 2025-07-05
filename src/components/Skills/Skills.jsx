import React, { useState, useEffect } from 'react';
import './Skills.css';
import skillsJson from '../../data/Skills.json';

import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import * as DiIcons from 'react-icons/di';
import * as GrIcons from 'react-icons/gr';
import AOS from 'aos';
import 'aos/dist/aos.css';

const categoryIcons = {
  'MERN Stack': <SiIcons.SiMongodb />,
  'Frontend Technologies': <FaIcons.FaHtml5 />,
  'Data Structures & Algorithms': <TbIcons.TbBinaryTree2 />,
  'Core CS Concepts': <FaIcons.FaUniversity />,
  'Tools & Platforms': <FaIcons.FaTools />
};

const Skills = () => {
  const [skillsData, setSkillsData] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
    setSkillsData(skillsJson);

    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveCategory(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const getIcon = (iconName) => {
    return (
      FaIcons[iconName] ||
      SiIcons[iconName] ||
      TbIcons[iconName] ||
      DiIcons[iconName] ||
      GrIcons[iconName] ||
      null
    );
  };

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="skills-title" data-aos="fade-up">💻 Technical Expertise</h2>
        <p className="projects-hint" data-aos="fade-up">✨ Select a category to explore my stack</p>

        <div className="category-tabs" data-aos="zoom-in">
          {Object.keys(skillsData).map((category) => (
            <div
              key={category}
              className={`tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveCategory(category)}
              aria-label={`Open ${category}`}
            >
              <span className="tab-icon">{categoryIcons[category] || <FaIcons.FaTags />}</span>
              <span className="tab-label">{category}</span>
            </div>
          ))}
        </div>

        {activeCategory && (
          <div className="modal-overlay" onClick={() => setActiveCategory(null)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              data-aos="zoom-in"
            >
              <button className="close-btn" onClick={() => setActiveCategory(null)} aria-label="Close Modal">✖</button>
              <h3 className="modal-title">
                {categoryIcons[activeCategory] || <FaIcons.FaTags />} {activeCategory}
              </h3>

              <div className="skills-grid">
                {skillsData[activeCategory]?.length > 0 ? (
                  skillsData[activeCategory].map((skill, idx) => {
                    const IconComponent = getIcon(skill.icon);
                    return (
                      <div className="skill-card" key={idx} data-aos="flip-left">
                        <div className="skill-icon">
                          {IconComponent ? <IconComponent /> : <FaIcons.FaQuestionCircle />}
                        </div>
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-desc">{skill.description}</div>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-skills">No skills found in this category.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
