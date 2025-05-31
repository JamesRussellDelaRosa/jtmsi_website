import React, { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, useRef
import './App.css';
import logo from './logo.png'; // Importing the JTMSI logo

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(''); // To show success/error messages
  const observerRef = useRef(null);

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
    const elementsToObserve = document.querySelectorAll('.content-section, .service-item, .team-member, .contact-form, .contact-details, .hero-content');
    elementsToObserve.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
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
    }
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
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo-graphic" alt="Jeannies Touch Manpower Services Inc. Logo" />
          <span className="logo-text">Jeannies Touch Manpower Services Inc.</span>
        </div>
        <nav className="App-nav">
          <a href="#home" onClick={handleNavClick}>Home</a>
          <a href="#about" onClick={handleNavClick}>About</a>
          <a href="#services" onClick={handleNavClick}>Services</a>
          <a href="#team" onClick={handleNavClick}>Team</a>
          <a href="#contact" onClick={handleNavClick}>Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-content">
            <h2>Quality Manpower Solutions for Your Business Success</h2>
            <p>We provide reliable and skilled workforce solutions to help your business thrive. From recruitment to workforce management, we deliver excellence in human resource services.</p>
            <button className="cta-button">Connect With Us Today</button>
          </div>
        </section>

        <section id="about" className="content-section">
          <h2>About Our Company</h2>
          <p>
            Jeannies Touch Manpower Services Inc. is a trusted partner in workforce solutions. We specialize in connecting skilled professionals with businesses that need quality talent. Our commitment to excellence and personalized service has made us a leader in the manpower industry, helping both employers and job seekers achieve their goals.
          </p>
        </section>

        <section id="services" className="content-section alt-background">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Staff Recruitment</h3>
              <p>Professional recruitment services to find the right talent for your organization's needs.</p>
            </div>
            <div className="service-item">
              <h3>Workforce Management</h3>
              <p>Comprehensive workforce solutions including scheduling, compliance, and performance management.</p>
            </div>
            <div className="service-item">
              <h3>Training & Development</h3>
              <p>Skills development programs to enhance your team's capabilities and productivity.</p>
            </div>
          </div>
        </section>

        <section id="team" className="content-section">
          <h2>Our Team</h2>
          <div className="team-member">
            <h3>Jeannie Santos</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <h3>Maria Rodriguez</h3>
            <p>HR Director</p>
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
            <button type="submit" className="cta-button">Send Message</button>
          </form>
          {formStatus && <p className="form-status">{formStatus}</p>}
          <div className="contact-details">
            <p>Email: info@jtmsi.com</p>
            <p>Phone: +63 (02) 8123-4567</p>
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
