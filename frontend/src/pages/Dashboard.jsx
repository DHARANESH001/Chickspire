import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src="logo.jpg" alt="Logo" className="nav-logo" />
        </div>
        <nav>
          <ul>
            <li><a href="/gamehome">Purchase</a></li>
            <li><a href="#sensors">Sensors</a></li>
            <li><a href="#analytics">Analytics</a></li>
            <li><a href="#settings">Settings</a></li>
            <li><button onClick={handleLogout} className="cta-button">Logout</button></li>
          </ul>
        </nav>
      </header>
      <section className="hero">
        <h1>Welcome, {user?.username || "User"} 👋</h1>
        <p>
          Manage your <b>CHICKSPIRE</b> with real-time insights on temperature, water flow, and alerts.
        </p>
        <button className="cta-button" onClick={() => navigate("/gamehome")}>Go to Live Data</button>
      </section>
      <section id="sensors" className="features">
        <h2 className="section-title">📊 Live Sensor Overview</h2>
        <div className="update-grid">
          <div className="update-card">
            <h4>Temperature Sensor (LM35D)</h4>
            <p>Current: <b>28.6°C</b></p>
            <p>Status: Stable</p>
          </div>
          <div className="update-card">
            <h4>Water Flow (YF-S201)</h4>
            <p>Flow Rate: <b>3.5 L/min</b></p>
            <p>Total Usage: 24.3 L</p>
          </div>
          <div className="update-card">
            <h4>Buzzer Alerts</h4>
            <p>Last Trigger: 2 mins ago</p>
            <p>Status: Active</p>
          </div>
        </div>
      </section>
      <section id="analytics" className="updates">
        <h2>Analytics & Reports</h2>
        <div className="update-grid">
          <div className="update-card">
            <h4>Temperature Trends</h4>
            <p>Average: 27.8°C | Max: 31.2°C</p>
          </div>
          <div className="update-card">
            <h4>Water Usage Stats</h4>
            <p>Today: 40L | Weekly Avg: 220L</p>
          </div>
          <div className="update-card">
            <h4>Alert Frequency</h4>
            <p>Triggered 5 times this week</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-columns">
          <div>
            <h4>About</h4>
            <p>
              CHICKSPIRE Dashboard for monitoring real-time ESP32 IoT farm data efficiently and securely with JWT authentication.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#sensors">Sensors</a></li>
              <li><a href="#analytics">Analytics</a></li>
              <li><a href="#settings">Settings</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: dharaneshv001@gmail.com</p>
            <p>Phone: +91-7904846933</p>
          </div>
        </div>
        <p className="footer-bottom">© 2025 CHICKSPIRE | Smart Poultry IoT System</p>
      </footer>
    </div>
  );
};

export default Dashboard;
