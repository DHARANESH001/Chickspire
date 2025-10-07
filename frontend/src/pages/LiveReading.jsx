import React from "react";
import "./Home.css";

const LiveReading = () => {
  return (
    <div>
      <h2 className="section-title">📈 Live Sensor Readings</h2>
      <div className="update-grid">
        <div className="update-card">
          <h4>Temperature (LM35D)</h4>
          <p>Current Reading: <b>28.5°C</b></p>
          <canvas id="tempChart"></canvas>
        </div>
        <div className="update-card">
          <h4>Water Flow (YF-S201)</h4>
          <p>Flow Rate: <b>3.2 L/min</b></p>
          <canvas id="flowChart"></canvas>
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: "30px" }}>
        Real-time data fetched from ESP32 board every few seconds.
      </p>
    </div>
  );
};

export default LiveReading;
