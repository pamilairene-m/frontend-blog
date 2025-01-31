import React, { useState } from "react";
import "./Contact.css"; 
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="contactpage">
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Feel free to reach out anytime!</p>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
      <div className="contact-info">
        <h2>Reach Us At:</h2>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@example.com">contact@example.com</a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+123456789">+123456789</a>
          </li>
          <li>
            <strong>Address:</strong> 123, Tech Street, Coimbatore
          </li>
        </ul>
        <div className="contact-socials">
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;
