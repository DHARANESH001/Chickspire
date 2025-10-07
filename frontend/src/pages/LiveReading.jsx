import React, { useState, useEffect } from "react";
import { Thermometer, Droplets, Activity } from "lucide-react";
import "./Home.css";
import "./LiveReading.css";

const LiveReading = () => {
  const [temperature, setTemperature] = useState(28.5);
  const [waterFlow, setWaterFlow] = useState(3.2);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => (prev + (Math.random() - 0.5) * 2).toFixed(1));
      setWaterFlow((prev) => (prev + (Math.random() - 0.5) * 0.5).toFixed(2));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tempStatus = temperature > 32 ? "high" : temperature < 20 ? "low" : "normal";
  const flowStatus = waterFlow < 2 ? "low" : waterFlow > 5 ? "high" : "normal";

  return (
    <div className="live-reading-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Activity className="title-icon" />
            Live Sensor Readings
          </h2>
          <p className="page-subtitle">Real-time monitoring from ESP32 IoT sensors</p>
        </div>
        <div className="last-update">
          <span className="update-dot"></span>
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      <div className="sensor-grid">
        <div className={`sensor-card temp-card`}>
          <div className="sensor-header">
            <div className="sensor-icon temp-icon">
              <Thermometer size={32} />
            </div>
            <div className="sensor-info">
              <h3>Temperature</h3>
              <p className="sensor-name">LM35D Sensor</p>
            </div>
          </div>
          <div className="sensor-reading">
            <span className="reading-value">{temperature}</span>
            <span className="reading-unit">°C</span>
          </div>
          <div className="sensor-status">
            <span className={`status-badge ${tempStatus}`}>
              {tempStatus === "normal" ? "✓ Normal" : "⚠ Alert"}
            </span>
            <span className="status-range">Safe: 20-32°C</span>
          </div>
        </div>

        <div className={`sensor-card flow-card`}>
          <div className="sensor-header">
            <div className="sensor-icon flow-icon">
              <Droplets size={32} />
            </div>
            <div className="sensor-info">
              <h3>Water Flow</h3>
              <p className="sensor-name">YF-S201 Sensor</p>
            </div>
          </div>
          <div className="sensor-reading">
            <span className="reading-value">{waterFlow}</span>
            <span className="reading-unit">L/min</span>
          </div>
          <div className="sensor-status">
            <span className={`status-badge ${flowStatus}`}>
              {flowStatus === "normal" ? "✓ Normal" : "⚠ Alert"}
            </span>
            <span className="status-range">Normal: 2-5 L/min</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Today's Average Temp</h4>
          <p className="stat-value">27.8°C</p>
        </div>
        <div className="stat-card">
          <h4>Total Water Usage</h4>
          <p className="stat-value">245 L</p>
        </div>
      </div>
    </div>
  );
};

export default LiveReading;
