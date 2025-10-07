import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Menu, X } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Home.css";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src="/logo.jpg" alt="Logo" className="nav-logo" />
          <span className="logo-text">CHICKSPIRE</span>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={menuOpen ? "nav-active" : ""}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#updates">Updates</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/login" className="btn-login">Login</a></li>
            <li><a href="/register" className="btn-register">Register</a></li>
          </ul>
        </nav>
      </header>
      <section className="hero-slider">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="slide">
              <img src="chick.jpg" alt="ESP32 Monitoring" />
              <div className="slide-text">
                <h1>Welcome to ESP32 IoT Monitoring</h1>
                <p>Track temperature & water flow with real-time alerts.</p>
                <button className="cta-button">Get Started</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <img src="temperature.jpg" alt="Temperature Sensor" />
              <div className="slide-text">
                <h1>🌡 Temperature Monitoring</h1>
                <p>Real-time LM35D sensor tracking with alerts.</p>
                <button className="cta-button">Learn More</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <img src="water.jpg" alt="Water Flow" />
              <div className="slide-text">
                <h1>💧 Water Flow Measurement</h1>
                <p>Accurate usage tracking with YF-S201 sensor.</p>
                <button className="cta-button">Explore</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section id="features" className="features">
        <h2 className="section-title">Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon temp-icon">🌡️</div>
            <div className="feature-img">
              <img src="s1.jpg" alt="Temperature Monitoring" />
            </div>
            <div className="feature-content">
              <h3>Temperature Monitoring</h3>
              <p>
                Track and alert when temperature goes out of safe operating range.
                Using the LM35D sensor, readings are precise and monitored in real-time.
              </p>
              <div className="feature-stats">
                <span className="stat-badge">±0.5°C Accuracy</span>
                <span className="stat-badge">Real-time</span>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon water-icon">💧</div>
            <div className="feature-img">
              <img src="water.jpg" alt="Water Flow Monitoring" />
            </div>
            <div className="feature-content">
              <h3>Water Flow Measurement</h3>
              <p>
                Accurate measurement of water usage using the YF-S201 flow sensor.
                Perfect for poultry farms to track water supply efficiency.
              </p>
              <div className="feature-stats">
                <span className="stat-badge">1-30 L/min</span>
                <span className="stat-badge">±3% Accuracy</span>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon alert-icon">🔔</div>
            <div className="feature-img">
              <img src="alerts.jpg" alt="Alerts & Safety" />
            </div>
            <div className="feature-content">
              <h3>Alerts & Safety</h3>
              <p>
                Automatic LED and buzzer alerts ensure safe operation of the system.
                Stay informed of critical conditions instantly.
              </p>
              <div className="feature-stats">
                <span className="stat-badge">Instant Alerts</span>
                <span className="stat-badge">24/7 Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="updates" className="updates">
        <h2>Latest Updates</h2>
        <div className="update-grid">
          <div className="update-card">
            <h4>System Launch</h4>
            <p>Version 1.0 of ESP32 monitoring system released with real-time alerts.</p>
          </div>
          <div className="update-card">
            <h4>Water Usage Logging</h4>
            <p>Now you can track total water usage over time with integrated flow sensor.</p>
          </div>
          <div className="update-card">
            <h4>Cloud Integration (Coming Soon)</h4>
            <p>Future update will allow remote monitoring and control from anywhere.</p>
          </div>
        </div>
      </section>
      <footer className="footer" id="contact">
        <div className="footer-columns">
          <div>
            <h4>About</h4>
            <p>
              ESP32 IoT Monitoring Project for real-time tracking of temperature and water flow 
              with alerts for safety and efficiency.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#updates">Updates</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: dharaneshv001@gmail.com</p>
            <p>Phone: +91-7904846933</p>
          </div>
        </div>
        <p className="footer-bottom">© 2025 Poultry Farm | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
