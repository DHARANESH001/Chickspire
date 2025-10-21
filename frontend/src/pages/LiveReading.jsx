import React, { useState, useEffect } from "react";
import { Thermometer, Droplets, Activity } from "lucide-react";
import "./Home.css";
import "./LiveReading.css";

const THINGSPEAK_CHANNEL_ID = "3123713"; 
const THINGSPEAK_READ_KEY = "534F28U0J41AGJ5E"; 

const LiveReading = () => {
  const [temperature, setTemperature] = useState(0);
  const [waterFlow, setWaterFlow] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_READ_KEY}&results=1`
        );
        const data = await response.json();
        if (data.feeds && data.feeds.length > 0) {
          const feed = data.feeds[0];
          setTemperature(parseFloat(feed.field1));
          setWaterFlow(parseFloat(feed.field2));
          setLastUpdate(new Date(feed.created_at));
        }
      } catch (error) {
        console.error("Error fetching ThingSpeak data:", error);
      }
    };

    fetchData(); 
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, []);

  const tempStatus =
    temperature > 92 ? "high" : temperature < 90 ? "low" : "normal";
  const flowStatus = waterFlow < 1 ? "low" : waterFlow > 3 ? "high" : "normal";

  return (
    <div className="live-reading-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Activity className="title-icon" />
            Live Sensor Readings
          </h2>
          <p className="page-subtitle">
            Real-time monitoring from ESP32 IoT sensors
          </p>
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
            <span className="reading-unit">°F</span>
          </div>
          <div className="sensor-status">
            <span className={`status-badge ${tempStatus}`}>
              {tempStatus === "normal" ? "✓ Normal" : "⚠ Alert"}
            </span>
            <span className="status-range">Safe: 90-92°F</span>
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
            <span className="status-range">Normal: 1-3 L/min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveReading;
