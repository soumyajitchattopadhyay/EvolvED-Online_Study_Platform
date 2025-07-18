import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaHome, FaGithub, FaLinkedin, FaUsers, FaComments, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/Home.css';


function HomePage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');  
  };

  const handleLoginClick = () => {
    navigate('/login');  
  };

  const handleGetStartedClick = () => {
    navigate('/register');  
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <a href="/" className="home-icon">
            <FaHome />
          </a>
          <div className="logo">
            <h1>EvolvED</h1>
          </div>
        </div>
        <div className="header-right">
          <Button variant="light" className="register-btn" onClick={handleRegisterClick}>Register</Button>
          <Button variant="light" className="login-btn" onClick={handleLoginClick}>Login</Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className="hero-section">
          <div className="hero-image">
            <FaGraduationCap size={120} className="hero-icon" />
            <p>Education Illustration</p>
          </div>
          <div className="hero-text">
            <h2>A continuously evolving educational space where students level up their skills together.</h2>
            <p className="tagline">Learn. Grow. Excel</p>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-text">
            <h3>Explore your Study Groups</h3>
            <p>Perfect for students looking for peer collaboration, structured learning and academic discussions!</p>
            <Button variant="warning" className="feature-btn">Explore</Button>
          </div>
          <div className="feature-image">
            <div className="image-container peach-bg">
              <FaUsers size={80} className="feature-icon" />
              <p>Study Groups</p>
            </div>
          </div>
        </div>

        <div className="features-section reverse">
          <div className="feature-image">
            <div className="image-container peach-bg">
              <FaComments size={80} className="feature-icon" />
              <p>Discussion Forum</p>
            </div>
          </div>
          <div className="feature-text">
            <h3>View Discussion Forum</h3>
            <p>Post answers, share insights and collaborate</p>
            <Button variant="warning" className="feature-btn">View</Button>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-text">
            <h3>View Scheduled meetings</h3>
            <p>Stay organized, manage schedules and attend learning sessions seamlessly</p>
            <Button variant="warning" className="feature-btn">View</Button>
          </div>
          <div className="feature-image">
            <div className="image-container peach-bg">
              <FaCalendarAlt size={80} className="feature-icon" />
              <p>Scheduled Meetings</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Begin your journey with us</h2>
          <Button variant="success" size="lg" className="get-started-btn" onClick={handleGetStartedClick}>Get Started</Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
  <div className="footer-content">
    <div className="footer-section">
      <h4>About us</h4>
      <ul className="footer-links">
        <li><Link to="/about">Group 105</Link></li>
        <li><Link to="/our-details">Our Profiles</Link></li>
      </ul>
    </div>
    <div className="footer-section">
      <h4>Important Links</h4>
      <ul className="footer-links">
        <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href="https://example.com/video" target="_blank" rel="noopener noreferrer">Video Link</a></li>
      </ul>
    </div>
    <div className="footer-section">
      <h4>Stay updated</h4>
      <Form className="subscribe-form">
        <Form.Control type="email" placeholder="Email ID" />
        <Button variant="primary" className="subscribe-btn">Subscribe</Button>
      </Form>
    </div>
  </div>
  <div className="footer-bottom">
    <div className="social-icons">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
    </div>
    <p className="copyright">Copyright © 2025</p>
  </div>
</footer>
    </div>
  );
}

export default HomePage;