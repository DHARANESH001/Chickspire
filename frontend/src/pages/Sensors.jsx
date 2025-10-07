import React from "react";
import "./Home.css";

const Sensors = () => {
  return (
    <div>
      <h2 className="section-title">🔍 Sensor Details</h2>
      <div className="feature-row">
        <div className="feature-img">
          <img src="lm35d.jpg" alt="LM35D Sensor" />
        </div>
        <div className="feature-text">
          <h3>🌡 LM35D Temperature Sensor</h3>
          <p>
            The LM35D sensor provides precise temperature readings in Celsius and is commonly used in IoT-based poultry farm systems.
          </p>
          <p><b>Advantages:</b> High accuracy, low power consumption, easy interface.</p>
          <p><b>Disadvantages:</b> Sensitive to noise, limited measurement range.</p>
        </div>
      </div>

      <div className="feature-row reverse">
        <div className="feature-img">
          <img src="yf-s201.jpg" alt="YF-S201 Sensor" />
        </div>
        <div className="feature-text">
          <h3>💧 YF-S201 Water Flow Sensor</h3>
          <p>
            The YF-S201 measures the rate of water flow using a Hall-effect sensor, ideal for water management in poultry environments.
          </p>
          <p><b>Advantages:</b> Accurate readings, durable, easy to install.</p>
          <p><b>Disadvantages:</b> Calibration required, depends on water pressure stability.</p>
        </div>
      </div>
    </div>
  );
};

export default Sensors;
