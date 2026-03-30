import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="app-container relative">
      <div className="bg-grid"></div>
      <div className="glow-blob primary"></div>
      <div className="glow-blob secondary"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <footer className="py-8 border-t border-white/5 text-center text-sm text-[#a0a4b8]">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Venkata Chaitanya Kumar Reddy Bijjam.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
