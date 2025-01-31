import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="about-header">
        <h1>About This App</h1>
        <p>
        This app is a space where creativity meets community. It’s designed to let you share your unique stories, connect with like-minded individuals, and explore an endless world of inspiration. Whether you're an aspiring writer, a curious reader, or someone looking to express their thoughts, this platform offers a seamless and secure way to make your voice heard. Dive into a sleek, user-friendly interface that adapts to your needs and join a thriving network of storytellers who are shaping conversations, one post at a time. This isn’t just an app—it’s your space to belong, create, and grow.
        </p>
      </div>

      {/* App Features Section */}
      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">🌟</div>
            <h3>Share Stories</h3>
            <p>
              Express your thoughts, share ideas, and connect with others in an
              inspiring way.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Fast & Secure</h3>
            <p>
              A smooth, fast, and secure platform to ensure a great user
              experience.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">🌍</div>
            <h3>Community Driven</h3>
            <p>
              Join a vibrant, supportive community where ideas and connections
              grow.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>
              A minimalist, clean, and intuitive design for an enjoyable
              experience.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">🚀</div>
            <h3>Constant Growth</h3>
            <p>
              The platform evolves constantly, with new features based on user
              feedback.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Data Privacy</h3>
            <p>
              Your data is kept secure with the latest privacy practices and
              security measures.
            </p>
          </div>
        </div>
      </div>

      {/* Author Section */}
      <div className="author-section">
        <h3>Created By</h3>
        <p>
          Pamila Irene M - A passionate developer who believes in the power of
          technology to connect people and create positive change.
        </p>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join our community and start exploring, sharing, and connecting today.</p>
        <a href="/signup">Join Us Now</a>
      </div>
    </div>
  );
};

export default AboutPage;
