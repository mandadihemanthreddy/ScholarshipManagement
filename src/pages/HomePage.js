import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Ensure this is correctly imported

const HomePage = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/how-to-apply">How to Apply</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/apply">Apply for Scholarships</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Scrolling message below the navbar */}
      <div className="scrolling-message">
        Make your scholarship ease today
      </div>

      <div className="welcome-section">
        <h1>Welcome to the Scholarship Management System</h1>
        <p>Here you can find various scholarships to apply for.</p>
      </div>

      <div className="scholarship-info">
        <h2>Available Scholarships</h2>
        {/* Here, you can list available scholarships fetched from your backend */}
        <ul>
          <li>Scholarship 1</li>
          <li>Scholarship 2</li>
          <li>Scholarship 3</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
