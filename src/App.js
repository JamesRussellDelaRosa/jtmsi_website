import React, { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, useRef
import './App.css';
import logo from './logo.png'; // Importing the JTMSI logo
import teamPhoto1 from './team-photo-1.jpg'; // Team photo for hero background
import teamPhoto2 from './team-photo-2.jpg'; // Team photo for about section

// Material-UI Icons
import {
  Home,
  Business,
  Work,
  ContactMail,
  Menu,
  Close,
  Visibility,
  Rocket,
  Star,
  LocationOn,
  Phone,
  Facebook,
  Send,
  School,
  PersonAdd,
  Schedule
} from '@mui/icons-material';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(''); // To show success/error messages
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef(null);
  const headerRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections and animatable elements
    const elementsToObserve = document.querySelectorAll('.content-section, .service-item, .contact-form, .contact-details, .hero-content, .about-image');
    elementsToObserve.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (event) => {
    event.preventDefault();
    const clickedLink = event.currentTarget; // Store a reference to the clicked link
    const targetId = clickedLink.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });

      // Add class for jumpy animation and remove it after animation completes
      clickedLink.classList.add('nav-link-jump');
      setTimeout(() => {
        // Use the stored reference inside the timeout
        if (clickedLink) { // Add a null check for safety
          clickedLink.classList.remove('nav-link-jump');
        }
      }, 300); // Duration should match CSS animation duration
      
      // Close mobile menu after clicking
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('Sending...');

    try {
      const response = await fetch('/send_email.php', { // Path to your PHP script
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } 
      else {
        setFormStatus(`Error: ${result.message || 'Could not send message.'}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('Error: Could not send message. Please try again later.');
    }
  };

  return (
    <div className="App">
      <header className="App-header" ref={headerRef}>
        <div className="logo-container">
          <img src={logo} className="App-logo-graphic" alt="Jeannies Touch Manpower Services Inc. Logo" />
          <span className="logo-text">Jeannies Touch Manpower Services Inc.</span>
        </div>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <Close /> : <Menu />}
        </button>
        <nav className={`App-nav ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <a href="#home" onClick={handleNavClick}><Home className="nav-icon" /> Home</a>
          <a href="#about" onClick={handleNavClick}><Business className="nav-icon" /> About</a>
          <a href="#services" onClick={handleNavClick}><Work className="nav-icon" /> Services</a>
          <a href="#contact" onClick={handleNavClick}><ContactMail className="nav-icon" /> Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section" style={{backgroundImage: `url(${teamPhoto1})`}}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h2>Quality Manpower Solutions for Your Business Success</h2>
            <p>We provide reliable and skilled workforce solutions to help your business thrive. From recruitment to workforce management, we deliver excellence in human resource services.</p>
            <button className="cta-button">
              <ContactMail className="button-icon" />
              Connect With Us Today
            </button>
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="about-content-wrapper">
            <div className="about-text">
              <h2>About Our Company</h2>
              <p>
                We're committed in bringing the best system and technology to equip our services and provide the clients with the best people for their business operation.
              </p>
              
              <div className="company-values">
                <div className="value-item">
                  <div className="value-icon">
                    <Visibility />
                  </div>
                  <h3>Our Vision</h3>
                  <p>We aim to be the preferred and most trusted service provider in the job outsourcing industry nationwide.</p>
                </div>
                
                <div className="value-item">
                  <div className="value-icon">
                    <Rocket />
                  </div>
                  <h3>Our Mission</h3>
                  <p>We are committed to providing consistent and quality service by ensuring the competence of our employees, collaboration of our management, and compliance with our laws and regulations.</p>
                </div>
                
                <div className="value-item">
                  <div className="value-icon">
                    <Star />
                  </div>
                  <h3>Quality Policy</h3>
                  <p>Jeannie's Touch Manpower Solutions Inc. commits to the principle that Quality is everyone's responsibility, which generates Total Customer Satisfaction (TCS) in terms of Quality, Cost, Delivery, and Service (QCDS). We pledge to continually improve our Quality Management System (QMS), including commitment to satisfy applicable legal requirements and business processes, to produce services through dedicated implementation of our Quality Organization.</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src={teamPhoto2} alt="Our professional team at JTMSI" className="team-photo" />
            </div>
          </div>
        </section>

        <section id="services" className="content-section alt-background">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">
                <PersonAdd />
              </div>
              <h3>Staff Recruitment</h3>
              <p>Professional recruitment services to find the right talent for your organization's needs.</p>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <Schedule />
              </div>
              <h3>Workforce Management</h3>
              <p>Comprehensive workforce solutions including scheduling, compliance, and performance management.</p>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <School />
              </div>
              <h3>Training & Development</h3>
              <p>Skills development programs to enhance your team's capabilities and productivity.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="content-section alt-background"> {/* Added alt-background for alternating pattern */}
          <h2>Get in Touch</h2>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows="5" 
              value={formData.message} 
              onChange={handleInputChange} 
              required
            ></textarea>
            <button type="submit" className="cta-button">
              <Send className="button-icon" />
              Send Message
            </button>
          </form>
          {formStatus && <p className="form-status">{formStatus}</p>}
          <div className="contact-details">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <LocationOn className="contact-icon" />
              <div>
                <strong>Address:</strong><br />
                RL Building, Francisco Village, Brgy. Pulong Sta. Cruz,<br />
                Sta. Rosa City, Laguna
              </div>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <div>
                <strong>Phone:</strong> (049) 539-3575, (049) 539-0315
              </div>
            </div>
            <div className="contact-item">
              <Facebook className="contact-icon" />
              <div>
                <strong>Facebook:</strong> JeanniesTouch Jtmsi
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Jeannies Touch Manpower Services Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
