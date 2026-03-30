import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container flex items-center justify-between h-full">
        <a href="#home" className="logo text-display text-gradient">
          CB.
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links Desktop */}
        <div className="social-links-desktop flex items-center gap-4">
          <a href="https://github.com/chaitanyareddy-fullstackdeveloper" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="icon" size={20} />
          </a>
          <a href="https://linkedin.com/in/bijjam-venkata-chaitanya-kumar-reddy" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="icon" size={20} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="nav-link mobile" onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/chaitanyareddy-fullstackdeveloper" target="_blank" rel="noreferrer">
              <Github className="icon" size={24} />
            </a>
            <a href="https://linkedin.com/in/bijjam-venkata-chaitanya-kumar-reddy" target="_blank" rel="noreferrer">
              <Linkedin className="icon" size={24} />
            </a>
            <a href="mailto:chaitanyakumarreddybijjum@gmail.com">
              <Mail className="icon" size={24} />
            </a>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
