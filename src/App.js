import React from 'react';
import Hero from './components/Hero';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About/>
      <Skills/>
    </div>
  );
}

export default App;
