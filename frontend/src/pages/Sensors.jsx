import React from "react";
import { Cpu, Thermometer, Droplets, CheckCircle, XCircle } from "lucide-react";
import "./Home.css";
import "./Sensors.css";

const Sensors = () => {
  const sensors = [
    {
      id: 1,
      name: "LM35D Temperature Sensor",
      icon: Thermometer,
      image: "/lm35d.jpg",
      description: "The LM35D sensor provides precise temperature readings in Celsius and is commonly used in IoT-based poultry farm systems.",
      specs: [
        { label: "Accuracy", value: "±0.5°C" },
        { label: "Range", value: "-55°C to 150°C" },
        { label: "Output", value: "10mV/°C" },
        { label: "Power", value: "4V to 30V" },
      ],
      advantages: [
        "High accuracy temperature measurement",
        "Low power consumption",
        "Easy interface with microcontrollers",
        "Linear output voltage",
        "No external calibration required",
      ],
      disadvantages: [
        "Sensitive to electrical noise",
        "Limited measurement range",
        "Requires proper heat sinking",
        "Slow response time",
      ],
    },
    {
      id: 2,
      name: "YF-S201 Water Flow Sensor",
      icon: Droplets,
      image: "/yf-s201.jpg",
      description: "The YF-S201 measures the rate of water flow using a Hall-effect sensor, ideal for water management in poultry environments.",
      specs: [
        { label: "Flow Range", value: "1-30 L/min" },
        { label: "Accuracy", value: "±3%" },
        { label: "Pressure", value: "≤1.75 MPa" },
        { label: "Voltage", value: "5V-18V DC" },
      ],
      advantages: [
        "Accurate flow rate measurement",
        "Durable construction",
        "Easy to install and maintain",
        "Wide operating voltage range",
        "Digital pulse output",
      ],
      disadvantages: [
        "Requires calibration for accuracy",
        "Depends on water pressure stability",
        "May accumulate debris over time",
        "Not suitable for very low flow rates",
      ],
    },
  ];

  return (
    <div className="sensors-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Cpu className="title-icon" />
            Sensor Details
          </h2>
          <p className="page-subtitle">Technical specifications and information</p>
        </div>
      </div>

      {sensors.map((sensor, index) => (
        <div key={sensor.id} className={`sensor-detail-card ${index % 2 === 1 ? 'reverse' : ''}`}>
          <div className="sensor-image-section">
            <img src={sensor.image} alt={sensor.name} />
          </div>

          <div className="sensor-content-section">
            <h3 className="sensor-title">{sensor.name}</h3>
            <p className="sensor-description">{sensor.description}</p>

            <div className="specs-grid">
              {sensor.specs.map((spec, idx) => (
                <div key={idx} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="pros-cons-grid">
              <div className="pros-section">
                <h4>
                  <CheckCircle size={20} />
                  Advantages
                </h4>
                <ul>
                  {sensor.advantages.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div className="cons-section">
                <h4>
                  <XCircle size={20} />
                  Disadvantages
                </h4>
                <ul>
                  {sensor.disadvantages.map((dis, idx) => (
                    <li key={idx}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sensors;
