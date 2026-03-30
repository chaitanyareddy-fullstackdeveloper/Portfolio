import React from 'react';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero section flex items-center min-h-screen relative">
      <div className="container">
        <div className="hero-content flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full pt-20 pb-24">
          {/* Text Content */}
          <div className="hero-text flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="greeting text-accent text-lg font-medium tracking-wide">Hi there, I'm</span>
            </motion.div>

            <motion.h1
              className="name text-display mt-3 font-bold text-4xl sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Venakta Chaitanya Kumar Reddy <span className="text-gradient"> Bijjam.</span>
            </motion.h1>

            <motion.h2
              className="role text-xl sm:text-2xl md:text-3xl font-semibold mt-4 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              MERN Stack & AI Developer Intern
            </motion.h2>

            <motion.p
              className="summary mt-6 text-base sm:text-lg text-secondary leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I build responsive, Mern-stack web applications and AI-enabled solutions.
              Currently pursuing Software Engineering at BITS Pilani, with a passion for
              turning complex problems into elegant user experiences.
            </motion.p>


            <motion.div
              className="hero-actions flex flex-wrap justify-center md:justify-start gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a href="#projects" className="btn btn-primary flex items-center gap-2">
                View Work <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            className="hero-image flex-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border-4 border-white/10 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:border-purple-500/50 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              <img
                src="https://res.cloudinary.com/dss6kupcu/image/upload/v1774872102/IMG_20251220_170830_2-EDIT_n922o9.jpg"
                alt="Chaitanya Reddy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a href="#about" aria-label="Scroll Down">
            <ChevronDown className="bounce text-secondary hover:text-primary transition-colors" size={32} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
