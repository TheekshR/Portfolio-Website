import React from 'react';
import Hero from './components/Hero';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About/>
      <Skills/>
      <Projects/>
    </div>
  );
}

export default App;
