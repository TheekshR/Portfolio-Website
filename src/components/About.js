import React, { useEffect, useRef } from 'react'; 
import '../styles/About.css';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const el = aboutRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate left side (3D model)
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );

    // Animate right side (About Me text)
    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
    );
  }, []);

  return (
    <section className="about" id="about" ref={aboutRef}>
      <div className="about-left" ref={leftRef}>
        <Spline scene="https://prod.spline.design/10noATBfLGwhCwrh/scene.splinecode" />
      </div>

      <div className="about-right" ref={rightRef}>
        <h2>About Me</h2>
        <p>
          I’m Theekshana, an udergraduate student with a strong interest in Software Engineering, Data Science
          and UI/UX designing. Over the past few years, i've done some projects using ReactJS, NodeJS, Java and Kotlin.
        </p>
        <p>
          My mission is to design and develop applications that balanced functionality with great user experience. 
        </p>
      </div>
    </section>
  );
};

export default About;
