import React, { useState } from "react";
import { BookOpen, UserPlus, LogIn, LayoutDashboard, Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import "./Home.css";
import "./Guideline.css";

const Guideline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Using the Dashboard",
      icon: LayoutDashboard,
      instructions: [
        "Navigate using the sidebar menu to access different features",
        "Live Reading: View real-time temperature and water flow data",
        "History: Check past sensor readings and trends",
        "Sensors: Manage and monitor your connected IoT sensors",
        "Profile: Update your personal and farm information",
        "Purchase: Order additional sensors or equipment",
      ],
      warning: "Regularly check the dashboard to stay updated on your farm conditions",
    },
    {
      id: 2,
      title: "Monitoring & Alerts",
      icon: Activity,
      instructions: [
        "Live readings update automatically every 3 seconds",
        "Temperature safe range is 30-32°C (alerts shown outside this range)",
        "Water flow normal range is 2-5 L/min",
        "Green badges indicate normal conditions",
        "Yellow/Red badges indicate alerts that need attention",
        "Check the 'Last Updated' timestamp to ensure data freshness",
      ],
      warning: "Respond promptly to alerts to maintain optimal farm conditions",
    },
  ];

  return (
    <div className="guideline-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <BookOpen className="title-icon" />
            How to Use CHICKSPIRE
          </h2>
          <p className="page-subtitle">Complete guide to using our website and IoT monitoring system</p>
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
