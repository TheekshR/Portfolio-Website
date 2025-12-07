import React, { useState } from 'react';
import { Link } from 'react-scroll';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <div className="logo">Theekshana.</div>
      
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>

      <nav className={`dropdown ${isOpen ? 'open' : ''}`}>
        <Link to="home" smooth={true} offset={-70} duration={500} onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="about" smooth={true} offset={-70} duration={500} onClick={() => setIsOpen(false)}>About Me</Link>
        <Link to="experiences" smooth={true} offset={-70} duration={500} onClick={() => setIsOpen(false)}>Experiences</Link>
        <Link to="skills" smooth={true} offset={-70} duration={500} onClick={() => setIsOpen(false)}>Skills</Link>
        <Link to="projects" smooth={true} offset={-70} duration={500} onClick={() => setIsOpen(false)}>Projects</Link>
        <Link to="contact" smooth={true} offset={-70} duration={500} onClick={() => setIsOpen(false)}>Contact Me</Link>
      </nav>
    </header>
  );
};

export default Header;
