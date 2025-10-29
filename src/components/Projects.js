import React, { useEffect, useRef } from "react";
import { FaReact, FaNodeJs, FaGithub, FaExternalLinkAlt, FaAndroid, FaCss3 } from "react-icons/fa";
import { SiMongodb, SiFirebase, SiKotlin, SiAndroidstudio, SiMui } from "react-icons/si";
import gsap from "gsap";
import "../styles/Projects.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const projects = [
  {
    title: "FutureWatt",
    description: "A Solar Energy Management System using React, MaterialUI,  Node.js, and MongoDB.",
    tech: [<FaReact />, <FaCss3/>, <SiMui />, <FaNodeJs/>, <SiMongodb />],
    img: "/images/FutureWatt.jpg",
    live: "#",
    github: "#",
  },
  {
    title: "StatTrack",
    description: "A personal finance tracker app built with Kotlin, Room Database and modern Android architecture.",
    tech: [<SiKotlin />, <SiAndroidstudio />, ],
    img: "/images/StatTrackFlyer.png",
    live: "#",
    github: "#",
  },
  {
    title: "Piano Web App",
    description: "A React-based piano app with recording and playback using Tone.js and Firebase Firestore.",
    tech: [<FaReact />, <FaCss3/>,  <SiFirebase />],
    img: "/images/TuneDeckFlyer.png",
    live: "#",
    github: "#",
  },
  {
    title: "Portfolio Website",
    description: "A 3D animated portfolio site built with React, GSAP, and Spline for immersive visuals.",
    tech: [<FaReact />, <FaNodeJs />],
    img: "/images/portfolio.jpg",
    live: "#",
    github: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
  const cards = sectionRef.current.querySelectorAll(".project-card");
  gsap.fromTo(
    cards,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 50%",
        toggleActions: "play none none reverse",
      },
    }
  );
}, []);


  return (
    <section className="projects-section" ref={sectionRef}>
      <h2 className="projects-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.img} alt={project.title} className="project-image" />
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((icon, i) => (
                  <span key={i} className="tech-icon">{icon}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.live} target="_blank" rel="noreferrer" className="btn">
                  <FaExternalLinkAlt /> Live
                </a>
                <a href={project.github} target="_blank" rel="noreferrer" className="btn">
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
