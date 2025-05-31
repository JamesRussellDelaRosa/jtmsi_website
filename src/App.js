import React, { useState } from 'react'; // Import useState
import './App.css';
import logo from './logo.svg'; // Importing the logo

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(''); // To show success/error messages

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
      } else {
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
          <img src={logo} className="App-logo-graphic" alt="TechSolutions Pro Graphic" />
          <span className="logo-text">TechSolutions Pro</span>
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
            <h2>Innovative Technology Solutions for Modern Business</h2>
            <p>We deliver cutting-edge technology solutions that transform your business operations and drive sustainable growth in the digital era.</p>
            <button className="cta-button">Get Started Today</button>
          </div>
        </section>

        <section id="about" className="content-section">
          <h2>About Our Company</h2>
          <p>
            We are a passionate team dedicated to delivering excellence. Our mission is to empower clients through technology and creative strategies.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </section>

        <section id="services" className="content-section alt-background">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Web Development</h3>
              <p>Creating responsive and high-performing websites tailored to your needs.</p>
            </div>
            <div className="service-item">
              <h3>UI/UX Design</h3>
              <p>Crafting intuitive and engaging user experiences that delight users.</p>
            </div>
            <div className="service-item">
              <h3>Digital Marketing</h3>
              <p>Boosting your online presence and connecting you with your target audience.</p>
            </div>
          </div>
        </section>

        <section id="team"  className="content-section"> {/* Added className for consistent styling */}
          <h2>Our Team</h2>
          <div className="team-member">
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <h3>Jane Smith</h3>
            <p>Chief Technology Officer</p>
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
            <p>Email: contact@companyname.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 TechSolutions Pro. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
