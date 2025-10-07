import React from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import "./Home.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src="logo.jpg" alt="Logo" className="nav-logo" />
        </div>
        <nav>
          <ul>
            <li><NavLink to="/dashboard/purchase">Purchase</NavLink></li>
            <li><NavLink to="/dashboard/live">Live Reading</NavLink></li>
            <li><NavLink to="/dashboard/history">History</NavLink></li>
            <li><NavLink to="/dashboard/sensors">Sensors</NavLink></li>
            <li><NavLink to="/dashboard/guideline">Guideline</NavLink></li>
            <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
            <li>
              <button onClick={handleLogout} className="cta-button">Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="features">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-columns">
          <div>
            <h4>About</h4>
            <p>
              Smart Poultry Dashboard for monitoring real-time ESP32 IoT farm data efficiently and securely.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><NavLink to="/dashboard/live">Live Reading</NavLink></li>
              <li><NavLink to="/dashboard/history">History</NavLink></li>
              <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: dharaneshv001@gmail.com</p>
            <p>Phone: +91-7904846933</p>
          </div>
        </div>
        <p className="footer-bottom">© 2025 Smart Poultry | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
