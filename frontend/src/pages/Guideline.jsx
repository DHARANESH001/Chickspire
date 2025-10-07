import React, { useState } from "react";
import { BookOpen, Wifi, Zap, Settings, AlertTriangle, CheckCircle2 } from "lucide-react";
import "./Home.css";
import "./Guideline.css";

const Guideline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Hardware Setup",
      icon: Zap,
      instructions: [
        "Connect LM35D temperature sensor to analog pin A0 of ESP32",
        "Connect YF-S201 water flow sensor output to digital pin D2",
        "Ensure proper grounding for all components",
        "Use quality jumper wires to avoid loose connections",
        "Double-check polarity before powering on",
      ],
      warning: "Always disconnect power before making any hardware changes",
    },
    {
      id: 2,
      title: "Power Supply",
      icon: Zap,
      instructions: [
        "Provide stable 5V DC supply to ESP32 board",
        "Ensure power supply can handle at least 500mA current",
        "Connect sensors to appropriate voltage pins (3.3V or 5V)",
        "Use decoupling capacitors near power pins",
        "Avoid using USB power for production deployment",
      ],
      warning: "Incorrect voltage can permanently damage your sensors",
    },
    {
      id: 3,
      title: "Software Configuration",
      icon: Settings,
      instructions: [
        "Download and install Arduino IDE with ESP32 board support",
        "Open the provided Arduino sketch file",
        "Update Wi-Fi SSID and password in the code",
        "Configure server endpoint URL if using custom backend",
        "Set appropriate baud rate (usually 115200) for serial monitor",
      ],
      warning: "Keep your Wi-Fi credentials secure and never commit them to public repositories",
    },
    {
      id: 4,
      title: "Upload & Testing",
      icon: Wifi,
      instructions: [
        "Connect ESP32 to computer via USB cable",
        "Select correct board and COM port in Arduino IDE",
        "Compile and upload the code to ESP32",
        "Open Serial Monitor to verify connection status",
        "Check if ESP32 successfully connects to Wi-Fi network",
      ],
      warning: "If upload fails, try pressing the BOOT button on ESP32 during upload",
    },
    {
      id: 5,
      title: "Calibration & Monitoring",
      icon: CheckCircle2,
      instructions: [
        "Calibrate LM35D sensor using known temperature reference",
        "Test water flow sensor with measured water volume",
        "Open dashboard and navigate to Live Reading page",
        "Verify real-time data is being received correctly",
        "Set up alert thresholds for temperature and flow rate",
      ],
      warning: "Regular calibration ensures accurate sensor readings",
    },
  ];

  return (
    <div className="guideline-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <BookOpen className="title-icon" />
            Hardware Connection Guide
          </h2>
          <p className="page-subtitle">Step-by-step setup instructions for your IoT system</p>
        </div>
      </div>

      <div className="steps-navigation">
        {steps.map((step, index) => (
          <button
            key={step.id}
            className={`step-nav-btn ${activeStep === index ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
            onClick={() => setActiveStep(index)}
          >
            <div className="step-number">{step.id}</div>
            <span>{step.title}</span>
          </button>
        ))}
      </div>

      <div className="step-content-card">
        <div className="step-header">
          <div className="step-icon">
            {React.createElement(steps[activeStep].icon, { size: 32 })}
          </div>
          <div>
            <h3>Step {steps[activeStep].id}: {steps[activeStep].title}</h3>
            <p>Follow these instructions carefully</p>
          </div>
        </div>

        <div className="instructions-list">
          {steps[activeStep].instructions.map((instruction, idx) => (
            <div key={idx} className="instruction-item">
              <div className="instruction-number">{idx + 1}</div>
              <p>{instruction}</p>
            </div>
          ))}
        </div>

        <div className="warning-box">
          <AlertTriangle size={24} />
          <div>
            <h4>Important Warning</h4>
            <p>{steps[activeStep].warning}</p>
          </div>
        </div>

        <div className="step-navigation">
          <button
            className="nav-btn prev"
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
          >
            ← Previous Step
          </button>
          <button
            className="nav-btn next"
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guideline;
