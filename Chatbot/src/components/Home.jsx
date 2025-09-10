// src/components/Home.jsx
import React, { useState } from 'react';
import './Home.css';

const Home = ({ setShowChatbot }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">🤖</div>
            <div>
              <h1>MassAi</h1>
              <p>Your Homework Helper & Study Buddy</p>
            </div>
          </div>
          <div className="stats">
            <span className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available</span>
            </span>
            <span className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Students Helped</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-main">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h2>Get Homework Help Anytime, Anywhere</h2>
            <p>MassAi is your personal study assistant that helps you with math, science, history, and more. Whether you're stuck on a problem or need help understanding concepts, I'm here to help!</p>
            <div className="cta-buttons">
              <button className="modal-primary-btn" onClick={() => {
                setShowModal(false);
                setShowChatbot(true);
              }}>
                Start Chatting Now
              </button>
              <button 
                className="secondary-btn" 
                onClick={() => setShowModal(true)}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="mockup-chat">
              <div className="chat-bubble user-bubble">How do I solve this quadratic equation?</div>
              <div className="chat-bubble bot-bubble">Let me break this down for you step by step...</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h3>How MassAi Helps You Learn</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h4>Homework Assistance</h4>
              <p>Get step-by-step help with math, science, history, and more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h4>Clear Explanations</h4>
              <p>Complex topics broken down into easy-to-understand concepts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h4>Study Support</h4>
              <p>Essay writing tips, research help, and study strategies</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h4>Always Available</h4>
              <p>24/7 support whenever you need help with your studies</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonials-section">
          <h3>What Students Say</h3>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"MassAi helped me understand calculus concepts that I was struggling with. The step-by-step explanations made everything clear!"</p>
              </div>
              <div className="testimonial-author">
                <span className="author-name">Sarah J.</span>
                <span className="author-role">High School Student</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"I use MassAi every day for my homework. It's like having a tutor available 24/7. Saved me so much time!"</p>
              </div>
              <div className="testimonial-author">
                <span className="author-name">Michael T.</span>
                <span className="author-role">College Student</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>About MassAi</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Our Mission</h3>
                <p>MassAi is designed to make learning accessible and enjoyable for every student. We believe that quality education should be available anytime, anywhere, and at any level.</p>
              </div>
              <div className="modal-section">
                <h3>How It Works</h3>
                <ul>
                  <li>Ask any homework question in natural language</li>
                  <li>Receive instant, step-by-step explanations</li>
                  <li>Get personalized learning recommendations</li>
                  <li>Track your progress over time</li>
                </ul>
              </div>
              <div className="modal-section">
                <h3>Supported Subjects</h3>
                <div className="subjects-grid">
                  <span className="subject-tag">Mathematics</span>
                  <span className="subject-tag">Science</span>
                  <span className="subject-tag">History</span>
                  <span className="subject-tag">Literature</span>
                  <span className="subject-tag">Chemistry</span>
                  <span className="subject-tag">Physics</span>
                  <span className="subject-tag">Biology</span>
                  <span className="subject-tag">Writing</span>
                </div>
              </div>
              <div className="modal-section">
                <h3>Why Choose MassAi?</h3>
                <ul>
                  <li>24/7 availability for your learning needs</li>
                  <li>AI-powered explanations tailored to your level</li>
                  <li>Safe and secure learning environment</li>
                  <li>Free to use for all students</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-primary-btn" onClick={() => {
                setShowModal(false);
                setShowChatbot(true);
              }}>
                Start Chatting Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <p>© 2024 MassAi - Your Personal Study Assistant</p>
          <p>Ready to make learning easier and more fun!</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;