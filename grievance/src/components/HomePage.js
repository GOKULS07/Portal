import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 


const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <img src="college logo.jpg" alt="College Logo" className="college-logo" />
        <h1>BIT GRIEVANCE PORTAL</h1>
        <div className="button-container">
          <Link to="/admin-login">
            <button className="home-button admin-button">Admin Login</button>
          </Link>
          <Link to="/faculty-login">
            <button className="home-button faculty-button">Faculty Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
