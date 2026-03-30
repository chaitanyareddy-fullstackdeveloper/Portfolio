import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Wrench, GraduationCap, Briefcase } from 'lucide-react';
import './About.css';

const About = () => {
  const skills = [
    {
      category: 'Languages',
      icon: <Code2 size={24} />,
      items: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS']
    },
    {
      category: 'Frameworks & Libraries',
      icon: <Server size={24} />,
      items: ['React', 'Redux', 'Tailwind CSS', 'Vanilla CSS']
    },
    {
      category: 'Tools & Platforms',
      icon: <Wrench size={24} />,
      items: ['Git', 'GitHub', 'Netlify', 'Formspree', 'Framer']
    }
  ];

  const education = [
    {
      institution: 'NxtWave Institute of Advanced Technologies (NIAT)',
      degree: 'Computer Science program in Data Science & ML',
      period: 'August 2024 - August 2028',
      type: 'Currently Pursuing'
    },
    {
      institution: 'BITS Pilani, Goa / Hyderabad Campus',
      degree: 'Bachelor of Science in Software Engineering',
      period: 'August 2024 - August 2027',
      type: 'Currently Pursuing'
    },
    {
      institution: 'SR Junior College, Guntur',
      degree: 'Intermediate (MPC)',
      period: 'July 2022 - March 2024',
      type: 'Score: 78.5%'
    },
    {
      institution: 'Swami School',
      degree: 'High School',
      period: 'July 2021 - May 2022',
      type: 'Score: 81.5%'
    }
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display"><span className="text-gradient">About</span> Me</h2>
        </motion.div>

        <div className="about-grid">
          {/* Skills Column */}
          <motion.div
            className="skills-container"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Code2 className="text-gradient" size={32} />
              <h3 className="text-2xl m-0">Technical Skills</h3>
            </div>

            <div className="skills-list flex flex-col gap-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="skill-group glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="skill-icon">{skillGroup.icon}</span>
                    <h4 className="text-xl m-0">{skillGroup.category}</h4>
                  </div>
                  <div className="skill-tags flex flex-wrap gap-3">
                    {skillGroup.items.map((item, i) => (
                      <span key={i} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Column */}
          <motion.div
            className="education-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <GraduationCap className="text-gradient" size={32} />
              <h3 className="text-2xl m-0">Education & Background</h3>
            </div>

            <div className="timeline-container relative">
              <div className="timeline-line"></div>
              {education.map((edu, index) => (
                <div key={index} className="timeline-item flex gap-6 relative z-10">
                  <div className="timeline-dot mt-1 shadow-glow relative"></div>
                  <div className="timeline-content glass-card p-6 flex-1 hover-lift">
                    <h4 className="text-xl font-bold mb-1 text-primary">{edu.institution}</h4>
                    <div className="text-gradient font-medium mb-3">{edu.degree}</div>
                    <div className="flex justify-between items-center text-sm text-secondary">
                      <span>{edu.period}</span>
                      <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">{edu.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Declaration Section */}
        <motion.div
          className="declaration-container glass-card p-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">Declaration</h3>
          <p className="text-secondary leading-relaxed">
            I hereby declare that the information furnished above is true, complete, and correct to the best of my knowledge and belief.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
