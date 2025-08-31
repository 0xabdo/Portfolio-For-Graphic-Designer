import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './App.css';

// Wiggly Line Component
const WigglyLine = ({ className = "" }) => (
  <svg className={className} width="100" height="20" viewBox="0 0 100 20" fill="none">
    <path
      d="M0 10 Q25 0 50 10 T100 10"
      stroke="#3182ce"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    >
      <animate
        attributeName="d"
        dur="3s"
        repeatCount="indefinite"
        values="M0 10 Q25 0 50 10 T100 10;M0 10 Q25 20 50 10 T100 10;M0 10 Q25 0 50 10 T100 10"
      />
    </path>
  </svg>
);

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="logo-text">Creative</span>
            <WigglyLine className="logo-line" />
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            <a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a>
            <a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a>
            <a href="#services" className="nav-link" onClick={closeMobileMenu}>Services</a>
            <a href="#portfolio" className="nav-link" onClick={closeMobileMenu}>Portfolio</a>
            <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav 
          className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <a href="#home" className="mobile-nav-link" onClick={closeMobileMenu}>Home</a>
          <a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>About</a>
          <a href="#services" className="mobile-nav-link" onClick={closeMobileMenu}>Services</a>
          <a href="#portfolio" className="mobile-nav-link" onClick={closeMobileMenu}>Portfolio</a>
          <a href="#contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</a>
        </motion.nav>
      </div>
    </motion.header>
  );
};

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="hero">
      <motion.div 
        className="hero-bg"
        style={{ y, opacity }}
      />
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="hero-title">
              Creative
              <span className="highlight"> Designer</span>
            </h1>
            <p className="hero-subtitle">
              Transforming ideas into stunning visual experiences
            </p>
            <div className="hero-buttons">
              <motion.a
                href="#portfolio"
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="hero-image-container">
              <motion.img
                src="/img/me.jpg"
                alt="Creative Designer"
                className="hero-image"
                whileHover={{ scale: 1.20 }}
                transition={{ duration: 0.5  }}
              />
              
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Section
const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">About Me</h2>
          <WigglyLine className="section-line" />
        </motion.div>
        
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Passionate Creative Designer</h3>
            <p>
              With over 5 years of experience in graphic design, I specialize in creating 
              compelling visual stories that connect brands with their audiences. My work 
              spans across branding, digital design, print media, and user experience design.
            </p>
            <p>
              I believe in the power of thoughtful design to transform businesses and 
              create meaningful connections. Every project is an opportunity to innovate 
              and push creative boundaries.
            </p>
            
            <div className="skills">
              <h4>Skills & Tools</h4>
              <div className="skill-tags">
                <span className="skill-tag">Adobe Creative Suite</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Sketch</span>
                <span className="skill-tag">Branding</span>
                <span className="skill-tag">UI/UX Design</span>
                <span className="skill-tag">Typography</span>
                <span className="skill-tag">Illustration</span>
                <span className="skill-tag">Motion Graphics</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="about-image">
              <div className="image-placeholder">
                <span>Designer Photo</span>
              </div>
              <motion.div
                className="floating-dots"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const services = [
    {
      title: "Brand Identity",
      description: "Complete brand identity design including logos, color palettes, and brand guidelines.",
      icon: "🎨"
    },
    {
      title: "Digital Design",
      description: "Web design, social media graphics, and digital marketing materials.",
      icon: "💻"
    },
    {
      title: "Print Design",
      description: "Business cards, brochures, posters, and other print materials.",
      icon: "📄"
    },
    {
      title: "UI/UX Design",
      description: "User interface and experience design for web and mobile applications.",
      icon: "📱"
    },
    {
      title: "Illustration",
      description: "Custom illustrations and graphics for various applications.",
      icon: "✏️"
    },
    {
      title: "Motion Graphics",
      description: "Animated graphics and visual effects for digital content.",
      icon: "🎬"
    }
  ];

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Services</h2>
          <WigglyLine className="section-line" />
        </motion.div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const Portfolio = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const projects = [
    {
      title: "Brand Identity - Tech Startup",
      category: "Branding",
      image: "project1",
      description: "Complete brand identity for a modern tech startup"
    },
    {
      title: "E-commerce Website Design",
      category: "Web Design",
      image: "project2",
      description: "Modern e-commerce platform with focus on user experience"
    },
    {
      title: "Mobile App UI/UX",
      category: "UI/UX",
      image: "project3",
      description: "Intuitive mobile app interface design"
    },
    {
      title: "Marketing Campaign",
      category: "Digital Design",
      image: "project4",
      description: "Comprehensive digital marketing campaign materials"
    },
    {
      title: "Product Packaging",
      category: "Print Design",
      image: "project5",
      description: "Eye-catching product packaging design"
    },
    {
      title: "Social Media Graphics",
      category: "Digital Design",
      image: "project6",
      description: "Consistent social media branding and graphics"
    }
  ];

  return (
    <section id="portfolio" className="section portfolio-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Portfolio</h2>
          <WigglyLine className="section-line" />
        </motion.div>
        
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="portfolio-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="portfolio-image">
                <div className="image-placeholder">
                  <span>{project.title}</span>
                </div>
                <div className="portfolio-overlay">
                  <div className="portfolio-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <span className="category">{project.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <WigglyLine className="section-line" />
        </motion.div>
        
        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Let's Create Something Amazing Together</h3>
            <p>
              Ready to bring your vision to life? I'm always excited to work on 
              new projects and collaborate with creative minds.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>hello@creativedesigner.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>New York, NY</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <motion.button
              type="submit"
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">Creative</span>
            <WigglyLine className="footer-line" />
          </div>
          <p className="footer-text">
            © 2024 Creative Designer. All rights reserved.
          </p>
          <div className="social-links">
            <button type="button" className="social-link" aria-label="Phone">📱</button>
            <button type="button" className="social-link" aria-label="Portfolio">💼</button>
            <button type="button" className="social-link" aria-label="Instagram">📸</button>
            <button type="button" className="social-link" aria-label="Twitter">🐦</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
