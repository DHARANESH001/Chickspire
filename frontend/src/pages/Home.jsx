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
        <div className="features-zigzag">
          <div className="feature-card zigzag-left">
            <div className="feature-img">
              <img src="tempmeaurement.jpg" alt="Temperature Monitoring" />
            </div>
            <div className="feature-content">
              <h3>Temperature Monitoring</h3>
              <p>
                The system continuously tracks and alerts users when the temperature deviates from the safe operating range. Utilizing the LM35D temperature sensor, it ensures highly accurate and reliable readings. The data is monitored in real time and detection of abnormal temperature variations. This approach enhances system safety, efficiency, and performance by allowing immediate corrective actions whenever environmental conditions exceed predefined thresholds.
              </p>
              <div className="feature-stats">
                <span className="stat-badge">±0.5°C Accuracy</span>
                <span className="stat-badge">Real-time</span>
              </div>
            </div>
          </div>

          <div className="feature-card zigzag-right">
            <div className="feature-img">
              <img src="nipple.jpg" alt="Water Flow Monitoring" />
            </div>
            <div className="feature-content">
              <h3>Water Flow Measurement</h3>
              <p>
                The system provides accurate measurement of water usage through the YF-S201 flow sensor, ensuring precise monitoring of water flow in real time. This feature is particularly beneficial for poultry farms, where maintaining optimal water supply is essential for livestock health and productivity. By tracking water usage efficiency, the system helps in identifying wastage and promoting sustainable farming practices.
              </p>
              <div className="feature-stats">
                <span className="stat-badge">1-30 L/min</span>
                <span className="stat-badge">±3% Accuracy</span>
              </div>
            </div>
          </div>

          <div className="feature-card zigzag-left">
            <div className="feature-img">
              <img src="alerts.jpg" alt="Alerts & Safety" />
            </div>
            <div className="feature-content">
              <h3>Alerts & Safety</h3>
              <p>
               The system features automatic LED and buzzer alerts to ensure safe and reliable operation. These indicators provide immediate notifications whenever critical conditions arise, allowing users to take prompt action. By combining visual and audible alerts, the system enhances safety awareness and minimizes the risk of damage or malfunction through real-time feedback.
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
        </div>
      </section>
      <footer className="footer" id="contact">
        <div className="footer-columns">
          <div className="logo">
          <img src="/logo.jpg" alt="Logo" className="nav-logo" />
          <span className="logo-text">CHICKSPIRE</span>
        </div>
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
