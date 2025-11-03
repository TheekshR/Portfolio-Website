import React, { useEffect, useRef } from "react";
import "../styles/Experience.css";

export default function Experience() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    itemRefs.current.forEach((item) => {
      if (!item) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            // Only remove if scrolling up (boundingRect.top > viewport top)
            if (entry.boundingClientRect.top > entry.rootBounds.top + 100) {
              entry.target.classList.remove("visible");
            }
          }
        },
        {
          threshold: [0, 0.3, 1], // Multiple thresholds for finer control
          rootMargin: "0px 0px -150px 0px" // Trigger earlier on entry, later on exit
        }
      );

      observer.observe(item);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section className="dual-timeline-section">
      <h2 className="section-title">EDUCATION & EXPERIENCE</h2>
      <div className="dual-timeline-container">
        {/* LEFT SIDE - EXPERIENCE */}
        <div className="timeline-column">
          <h3 className="timeline-heading">Experience</h3>
          <div className="timeline">
            <div className="timeline-item" ref={(el) => (itemRefs.current[0] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Frontend Developer - Freelance</h4>
                <p className="period">2023 - Present</p>
                <p>Building interactive web apps using React, GSAP, and Firebase.</p>
              </div>
            </div>

            <div className="timeline-item" ref={(el) => (itemRefs.current[1] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Mobile App Developer - StatTrack</h4>
                <p className="period">2024</p>
                <p>Developed a personal finance tracker using Kotlin and Room DB.</p>
              </div>
            </div>

            <div className="timeline-item" ref={(el) => (itemRefs.current[2] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>UI/UX Designer - Freelance</h4>
                <p className="period">2022 - 2023</p>
                <p>Created modern UI designs and prototypes using Figma.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - EDUCATION */}
        <div className="timeline-column">
          <h3 className="timeline-heading">Education</h3>
          <div className="timeline">
            <div className="timeline-item" ref={(el) => (itemRefs.current[3] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>BSc (Hons) in Computer Science</h4>
                <p className="period">2022 - Present</p>
                <p>Undergraduate student specializing in software engineering and AI.</p>
              </div>
            </div>

            <div className="timeline-item" ref={(el) => (itemRefs.current[4] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Diploma in Web Development</h4>
                <p className="period">2021 - 2022</p>
                <p>Learned front-end and back-end technologies for full-stack development.</p>
              </div>
            </div>

            <div className="timeline-item" ref={(el) => (itemRefs.current[5] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>High School Education</h4>
                <p className="period">2015 - 2020</p>
                <p>Completed GCE A/Ls in the Physical Science stream.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}