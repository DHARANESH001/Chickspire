import React, { useState, useEffect, useRef } from "react";
import { Thermometer, Droplets, Activity, Wifi, RefreshCw } from "lucide-react";
import "./Home.css";
import "./LiveReading.css";
import LineChart from "../components/LineChart";

const THINGSPEAK_CHANNEL_ID = "3123713";
const THINGSPEAK_READ_KEY = "534F28U0J41AGJ5E";

const PRODUCT_ID = "KIT-001"; 

const LiveReading = () => {
  const [temperature, setTemperature] = useState(0);
  const [waterFlow, setWaterFlow] = useState(0);
  const [hardwareStatus, setHardwareStatus] = useState("Disconnected");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [chartData, setChartData] = useState({
    labels: [],
    tempData: [],
    flowData: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchChartData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_READ_KEY}&results=20`
      );
      const data = await response.json();
      
      if (data.feeds && data.feeds.length > 0) {
        const feeds = data.feeds.filter(feed => feed.field3 === PRODUCT_ID);
        
        if (feeds.length > 0) {
          const labels = feeds.map(feed => new Date(feed.created_at).toLocaleTimeString()).reverse();
          const tempData = feeds.map(feed => parseFloat(feed.field1)).reverse();
          const flowData = feeds.map(feed => parseFloat(feed.field2)).reverse();
          
          setChartData({
            labels,
            tempData,
            flowData
          });
          const latestFeed = feeds[feeds.length - 1];
          setTemperature(parseFloat(latestFeed.field1));
          setWaterFlow(parseFloat(latestFeed.field2));
          setLastUpdate(new Date(latestFeed.created_at));
          setHardwareStatus("Connected");
        } else {
          setHardwareStatus("No data available");
        }
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setHardwareStatus("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
    const interval = setInterval(fetchChartData, 30000); 
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
            Live Sensor Readings ({PRODUCT_ID})
          </h2>
          <p className="page-subtitle">
            Real-time monitoring for specific hardware unit
          </p>
        </div>

        <div className="hardware-status">
          <Wifi
            size={20}
            color={hardwareStatus === "Connected" ? "green" : "red"}
          />
          <span
            className={`status-badge ${hardwareStatus.toLowerCase()}`}
          >
            {hardwareStatus}
          </span>
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
          </div>
        </div>
      </div>

      {/* Graph Analysis Section */}
      <div className="graph-section">
        <div className="section-header">
          <h3>Sensor Data Analysis</h3>
          <button 
            onClick={fetchChartData} 
            className="refresh-btn"
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'spin' : ''} />
            {isLoading ? 'Updating...' : 'Refresh Data'}
          </button>
        </div>
        
        <div className="chart-container">
          <div className="chart-card">
            <LineChart 
              title="Temperature Trend"
              labels={chartData.labels}
              data={chartData.tempData}
              dataLabel="Temperature (°F)"
              borderColor="rgb(255, 99, 132)"
              backgroundColor="rgba(255, 99, 132, 0.2)"
            />
          </div>
          
          <div className="chart-card">
            <LineChart 
              title="Water Flow Trend"
              labels={chartData.labels}
              data={chartData.flowData}
              dataLabel="Flow Rate (L/min)"
              borderColor="rgb(54, 162, 235)"
              backgroundColor="rgba(54, 162, 235, 0.2)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveReading;
