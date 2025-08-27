import React, { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <div className="logo">Theekshana</div>
      
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>

      <nav className={`dropdown ${isOpen ? 'open' : ''}`}>
        <a href="#about" onClick={() => setIsOpen(false)}>About Me</a>
        <a href="#Skills" onClick={() => setIsOpen(false)}>Skills</a>
        <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
      </nav>
    </header>
  );
};

export default Header;
