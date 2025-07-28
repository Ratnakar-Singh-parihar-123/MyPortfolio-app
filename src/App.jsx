import React, { useState, useEffect } from "react";
import ThreeBackground from "./ThreeBackground";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import ProjectsCertificates from "./components/Projects/ProjectsCertificates";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <ThreeBackground />
      <Navbar />

      <main style={{ scrollBehavior: "smooth" }}>
        <Hero id="hero" />
        <About id="about" />
        <Skills id="skills" />
        <ProjectsCertificates id="projects" />
        <Contact id="contact" />
      </main>

      <Footer />
    </>
  );
}
