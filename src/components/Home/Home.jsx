// src/components/Home/Home.jsx

import React, { useState, useEffect } from 'react';
import './Home.css';
import profileImg from '../../assets/astronaut.jpeg';

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
  FaHome,
  FaUser,
  FaTools,
  FaProjectDiagram,
  FaEnvelope,
  FaRobot,
  FaCertificate,
} from 'react-icons/fa';
import { SiZoom } from 'react-icons/si';

const Home = () => {
  const [modal, setModal] = useState(null);
  const [showScrollTab, setShowScrollTab] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  const titles = [
    'Full Stack Developer',
    'React.js Enthusiast',
    'MERN Stack Developer',
    'Problem Solver',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(titles[0]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowScrollTab(currentY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    setCurrentText(titles[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [chat]);

  const openModal = (type) => {
    setModal(type);
    if (type === 'ai') setChat([]);
  };

  const closeModal = () => {
    setModal(null);
    setInput('');
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setChat((prev) => [...prev, userMsg]);
    setInput('');

    setChat((prev) => [...prev, { from: 'ai', text: 'Typing...' }]);

    setTimeout(() => {
      const response = generateAIResponse(input);
      setChat((prev) => [...prev.slice(0, -1), { from: 'ai', text: response }]);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const generateAIResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('name')) return "🤖 I'm your personal AI assistant.";
    if (lower.includes('skills')) return '🛠 I know HTML, CSS, React, Node.js, MongoDB & more!';
    if (lower.includes('project')) return "🚀 You can view my latest projects by clicking on 'View Projects'.";
    if (lower.includes('hello') || lower.includes('hi')) return '👋 Hello there! How can I assist you today?';
    return `🤖 I received: "${msg}". I’ll respond more smartly soon!`;
  };

  const accentColor =
    modal === 'whatsapp' ? '#25D366' :
    modal === 'zoom' ? '#2D8CFF' :
    modal === 'ai' ? '#6366f1' :
    '#4f46e5';

  return (
    <section className="home" id="home">
      <div className="home-left">
        <h1 className="home-title">
          Hi, I'm <span className="highlight">Ratnakar Singh Parihar</span>
        </h1>

        <h2 className="rotating-text rotating-text-glow">{currentText}</h2>

        <p className="home-desc">
          A passionate <strong>Full Stack Developer</strong> crafting modern, responsive web applications using the MERN stack. I love solving problems and building products that matter.
        </p>

        <div className="home-buttons">
          <a href="#projects" className="home-button">🚀 View Projects</a>
          <a href="#contact" className="home-button outline">📬 Contact Me</a>
        </div>

        <div className="social-icons">
          <a href="https://github.com/Ratnakar-Singh-parihar-123" className="github"  rel="noreferrer"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/" className="linkedin"  rel="noreferrer"><FaLinkedin /></a>
          <a href="https://www.instagram.com/krishna_parihar_42/" className="instagram"  rel="noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com/" className="twitter"  rel="noreferrer"><FaTwitter /></a>
          <a href="https://www.facebook.com/ratnakarsingh.parihar.75" className="facebook"  rel="noreferrer"><FaFacebook /></a>
        </div>
      </div>

      <div className="home-right">
        <img src={profileImg} alt="Profile" className="home-image" />
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-icons">
        <span onClick={() => openModal('whatsapp')} title="WhatsApp" style={{ '--accent': '#25D366' }}><FaWhatsapp /></span>
        <span onClick={() => openModal('zoom')} title="Zoom" style={{ '--accent': '#2D8CFF' }}><SiZoom /></span>
        <span onClick={() => openModal('ai')} title="Ask AI" style={{ '--accent': '#6366f1' }}><FaRobot /></span>
      </div>

      {/* AI Chat Modal */}
      {modal === 'ai' && (
        <div className="popup-overlay" onClick={closeModal}>
          <div className="popup-content ai-chat" onClick={(e) => e.stopPropagation()}>
            <span className="popup-close" onClick={closeModal}>&times;</span>
            <h3>🤖 AI Assistant</h3>
            <div className="chat-window" id="chat-window">
              {chat.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.from}`}>{msg.text}</div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Modal */}
      {modal === 'whatsapp' && (
        <div className="popup-overlay" onClick={closeModal}>
          <div className="popup-content" style={{ '--accent': accentColor }} onClick={(e) => e.stopPropagation()}>
            <span className="popup-close" onClick={closeModal}>&times;</span>
            <h3>Connect via WhatsApp</h3>
            <p>Click below to message me on WhatsApp.</p>
            <a href="https://wa.me/9399741051" rel="noreferrer" className="popup-button">Open WhatsApp</a>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {modal === 'zoom' && (
        <div className="popup-overlay" onClick={closeModal}>
          <div className="popup-content" style={{ '--accent': accentColor }} onClick={(e) => e.stopPropagation()}>
            <span className="popup-close" onClick={closeModal}>&times;</span>
            <h3>Join Zoom Meeting</h3>
            <p>Click below to join my Zoom room.</p>
            <a href="https://zoom.us/my/3045379026" rel="noreferrer" className="popup-button">Join Zoom</a>
          </div>
        </div>
      )}

      {/* Optional: Scroll Tab (Uncomment if needed) */}
      {/* {showScrollTab && (
        <div className="scroll-tab">
          <a href="/" title="Home"><FaHome /></a>
          <a href="/about" title="About"><FaUser /></a>
          <a href="/skills" title="Skills"><FaTools /></a>
          <a href="/certificate" title="Certificate"><FaCertificate /></a>
          <a href="/projects" title="Projects"><FaProjectDiagram /></a>
          <a href="/contact" title="Contact"><FaEnvelope /></a>
        </div>
      )} */}
    </section>
  );
};

export default Home;
