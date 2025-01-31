import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ userId, isAuthenticated }) => {
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    localStorage.removeItem("userId"); // Remove userId from localStorage
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          My Stories
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
              <Link to={`/profile/${userId}`}>My Thoughts</Link>


              </li>
              <li>
                <Link to="/add-story">Create Thoughts</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
