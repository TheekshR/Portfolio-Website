import React, { useState, useEffect } from "react";
import { FaGithub, FaReact, FaNodeJs, FaCss3 } from "react-icons/fa";
import { SiMongodb, SiFirebase, SiKotlin, SiAndroidstudio, SiMui } from "react-icons/si";
import "../styles/Projects.css";

const projects = [
  {
    title: "FutureWatt",
    description:
      "A Solar Energy Management System using React, MaterialUI, Node.js, and MongoDB.",
    tech: [<FaReact />, <FaCss3 />, <SiMui />, <FaNodeJs />, <SiMongodb />],
    img: "/images/FutureWatt.jpg",
    github: "#",
  },
  {
    title: "StatTrack",
    description:
      "A personal finance tracker app built with Kotlin, Room Database and modern Android architecture.",
    tech: [<SiKotlin />, <SiAndroidstudio />],
    img: "/images/StatTrackFlyer.png",
    github: "#",
  },
  {
    title: "TuneDeck",
    description:
      "A React-based piano app with recording and playback using Tone.js and Firebase Firestore.",
    tech: [<FaReact />, <FaCss3 />, <SiFirebase />],
    img: "/images/TuneDeckFlyer.png",
    github: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "A 3D animated portfolio site built with React, GSAP, and Spline for immersive visuals.",
    tech: [<FaReact />, <FaNodeJs />],
    img: "/images/portfolio.jpg",
    github: "#",
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProject = projects[currentIndex];

  return (
    <section className="projects-section">
      <h2>MY PROJECTS</h2>

      {/* ✅ Buttons should be outside .project-card but inside section */}
      <button onClick={prevSlide} className="nav-btn left">‹</button>
      <button onClick={nextSlide} className="nav-btn right">›</button>

      <div className="project-card">
        <div className="project-image">
          <img src={currentProject.img} alt={currentProject.title} />
        </div>

        <div className="project-content">
          <h3>{currentProject.title}</h3>
          <p>{currentProject.description}</p>

          <div className="project-tech">
            {currentProject.tech.map((icon, i) => (
              <span key={i} className="tech-icon">{icon}</span>
            ))}
          </div>

          <a
            href={currentProject.github}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
