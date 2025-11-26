import React, { useEffect, useRef } from 'react';
import '../styles/Hero.css';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;

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
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-left">
        <div className="hero-content">
          <p className="hero1">Hey, It's me</p>
          <p className="hero2">Theekshana</p>
          <p className="hero3">Undergraduate BSc(Hons) in Information Technology | Specializing in Data Science</p>
        </div>
      </div>
      <div className="hero-right">
        <Spline scene="https://prod.spline.design/AZCQW9zVN6xJaAE0/scene.splinecode " />
      </div>
    </section>
  );
};

export default Hero;
