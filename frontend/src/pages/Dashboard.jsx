import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";
import "./Home.css";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      {/* ---- Navbar ---- */}
      <header className="top-navbar">
        <div className="nav-left">
          <div className="logo">
            <img src="/logo.jpg" alt="Logo" />
            <span className="logo-text">CHICKSPIRE</span>
          </div>
        </div>

        <nav className="nav-center">
          <NavLink to="/dashboard/live">Live</NavLink>
          <NavLink to="/dashboard/history">History</NavLink>
          <NavLink to="/dashboard/guideline">Guidelines</NavLink>
          <NavLink to="/dashboard/purchase">Purchase</NavLink>
          <NavLink to="/dashboard/sensors">Sensors</NavLink>
        </nav>

        <div className="nav-right">
          <button className="icon-btn">
            <Mail size={22} />
          </button>
          <div className="profile-icon" onClick={() => navigate("/dashboard/profile")}>
            <User size={24} />
          </div>
        </div>
      </header>

      {/* ---- Main Content ---- */}
      <main className="dashboard-content">
        <Outlet />
      </main>

      {/* ---- Footer ---- */}
      <footer className="footer">
        <div className="footer-columns">
          <div>
            <div className="logo">
              <img src="/logo.jpg" alt="Logo" />
              <span className="logo-text">CHICKSPIRE</span>
            </div>
            <p>
              ESP32 IoT Monitoring Project for real-time tracking of temperature
              and water flow with alerts for safety and efficiency.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/dashboard/live">Live</NavLink></li>
              <li><NavLink to="/dashboard/history">History</NavLink></li>
              <li><NavLink to="/dashboard/purchase">Purchase</NavLink></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <p>Email: dharaneshv011@gmail.com</p>
            <p>Phone: +91-7908468933</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Poultry Farm | All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
