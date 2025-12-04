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
                <h4>UI Designer - DynamicBiz</h4>
                <p className="period">2024 Nov - Present</p>
                <p>Designing user friendly interfaces for web applications.</p>
              </div>
            </div>

            <div className="timeline-item" ref={(el) => (itemRefs.current[1] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>UI Designer - Freelance</h4>
                <p className="period">2024 - Present</p>
                <p>Creating modern UI designs and prototypes using Figma.</p>
              </div>
            </div>

            <div className="timeline-item" ref={(el) => (itemRefs.current[2] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Graphic Designer - Freelance</h4>
                <p className="period">2023 - 2024</p>
                <p>Designed flyers and posters for clients.</p>
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
                <h4>BSc (Hons) in Data Science</h4>
                <p className="period">2023 July - Present</p>
                <p>Undergraduate student specializing in Data Science.</p>
              </div>
            </div>

            <div className="timeline-item" ref={(el) => (itemRefs.current[4] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>GCE A/L - Ranabima Royal College</h4>
                <p className="period">2018 - 2020</p>
                <p>Completed GCE A/Ls in the Physical Science stream with 2Cs and 1S.</p>
              </div>
            </div>

            <div className="timeline-item" ref={(el) => (itemRefs.current[5] = el)}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>GCE O/L - Ranabima Royal College</h4>
                <p className="period">2017</p>
                <p>Completed GCE O/Ls with 8As and 1B.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}