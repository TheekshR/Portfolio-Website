import React from 'react';
import AnimatedBackground from "./components/AnimatedBackground";
import Hero from './components/Hero';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';



function App() {
  return (
    <div className="App">
      <AnimatedBackground />
      <Header />
      <Hero />
      <About/>
      <Experience/>
      <Skills/>
      <Projects/>
      
    </div>
  );
}

export default App;
