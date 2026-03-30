import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch("https://formspree.io/f/xreyvjjq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json().catch(() => null);
        if (data && Object.hasOwn(data, 'errors')) {
          setErrorMessage(data.errors.map(err => err.message).join(", "));
        } else {
          setErrorMessage("Formspree returned an error. Make sure your form is verified.");
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Formspree Fetch Error:", error);
      setErrorMessage("Network error! An ad-blocker might be blocking the submission, or you are offline.");
      setSubmitStatus('error');
    }
    
    // Dismiss message after 7 seconds
    setTimeout(() => {
      setSubmitStatus(null);
      setErrorMessage('');
    }, 7000);
  };

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: '+91 7981012359',
      href: 'tel:+917981012359'
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'chaitanyakumarreddybijjum@gmail.com',
      href: 'mailto:chaitanyakumarreddybijjum@gmail.com'
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      value: 'Chaitanya Reddy',
      href: 'https://linkedin.com/in/bijjam-venkata-chaitanya-kumar-reddy'
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: 'Naragayapalem, Andhra Pradesh',
      href: 'https://www.google.com/maps/place/Naragayapalem,+Andhra+Pradesh+522647/@16.0833184,79.6941565,14z/data=!3m1!4b1!4m6!3m5!1s0x3a4abd57c6a04ad3:0x2b249c1e3d5376ab!8m2!3d16.0925585!4d79.7343791!16s%2Fg%2F12hkt3j5l'
    }
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display mb-4">Get In <span className="text-gradient">Touch</span></h2>
          <p className="max-w-2xl mx-auto">
            I'm currently seeking internship opportunities in MERN stack and AI development. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="contact-container">
          <motion.div 
            className="contact-info glass-card p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-secondary mb-8">
              Open for opportunities. Let's build something amazing together.
            </p>
            
            <div className="info-list flex flex-col gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-item flex items-start gap-4">
                  <div className="info-icon flex items-center justify-center p-3 rounded-full bg-white/5 text-primary">
                    {info.icon}
                  </div>
                  <div>
                    <span className="block text-sm text-secondary mb-1">{info.label}</span>
                    {info.href ? (
                      <a href={info.href} target={info.label === 'LinkedIn' || info.label === 'Location' ? '_blank' : '_self'} rel="noreferrer" className="text-primary hover:text-accent-primary transition-colors font-medium">
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-primary font-medium">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-wrapper glass-card p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="contact-form flex flex-col gap-6">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-secondary">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-secondary">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-secondary">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  className="form-input textarea"
                  placeholder="Hello, I'd like to talk about..."
                  rows="5"
                ></textarea>
              </div>
              
               <button 
                type="submit" 
                disabled={submitStatus === 'submitting'}
                className="btn btn-primary flex items-center justify-center gap-2 mt-2 w-full"
                style={{ opacity: submitStatus === 'submitting' ? 0.7 : 1 }}
              >
                {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={18} />
              </button>
              
              {submitStatus === 'success' && (
                <div className="text-accent-tertiary mt-2 text-center text-sm font-medium">Message sent successfully! I'll get back to you soon.</div>
              )}
              {submitStatus === 'error' && (
                <div className="text-accent-secondary mt-2 text-center text-sm font-medium">
                  Oops! {errorMessage || "There was a problem sending your message."}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
