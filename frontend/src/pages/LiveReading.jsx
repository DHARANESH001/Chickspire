import React, { useState, useEffect } from "react";
import { Thermometer, Droplets, Activity, Wifi, RefreshCw, AlertTriangle } from "lucide-react";
import "./Home.css";
import "./LiveReading.css";
import LineChart from "../components/LineChart";

const THINGSPEAK_CHANNEL_ID = "3123713";
const THINGSPEAK_READ_KEY = "534F28U0J41AGJ5E";

const LiveReading = () => {
  const [temperature, setTemperature] = useState(0);
  const [waterFlow, setWaterFlow] = useState(0);
  const [hardwareStatus, setHardwareStatus] = useState("Disconnected");
  const [lastUpdate, setLastUpdate] = useState(new Date(0));
  const [chartData, setChartData] = useState({
    labels: [],
    tempData: [],
    flowData: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchChartData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_READ_KEY}&results=20`,
        { cache: "no-store" }
      );
      const data = await response.json();

      if (data.feeds && data.feeds.length > 0) {
        const feeds = data.feeds;

        const labels = feeds
          .map(feed =>
            new Date(feed.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          )
          .reverse();

        const tempData = feeds.map(feed => parseFloat(feed.field1) || 0).reverse();
        const flowData = feeds.map(feed => parseFloat(feed.field2) || 0).reverse();

        setChartData({ labels, tempData, flowData });

        const latestFeed = feeds[feeds.length - 1];
        const latestTemp = parseFloat(latestFeed.field1) || 0;
        const latestFlow = parseFloat(latestFeed.field2) || 0;
        const latestTime = new Date(latestFeed.created_at);
        const now = new Date();

        const timeDifference = (now - latestTime) / 1000; // seconds

        // Check if data is recent (less than 90s old)
        if (timeDifference < 35) {
          setTemperature(latestTemp);
          setWaterFlow(latestFlow);
          setLastUpdate(latestTime);
          setHardwareStatus("Connected");
        } else {
          // Hardware likely disconnected
          setTemperature(0);
          setWaterFlow(0);
          setHardwareStatus("Disconnected");
        }
      } else {
        setHardwareStatus("No Data");
        setTemperature(0);
        setWaterFlow(0);
      }
    } catch (error) {
      console.error("Error fetching live data:", error);
      setHardwareStatus("Connection Error");
      setTemperature(0);
      setWaterFlow(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
    const interval = setInterval(fetchChartData, 30000); // every 30 seconds
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
            Real-time monitoring of your poultry environment
          </p>
        </div>

        <div className="hardware-status">
          <Wifi
            size={20}
            color={hardwareStatus === "Connected" ? "green" : "red"}
          />
          <span className={`status-badge ${hardwareStatus.toLowerCase()}`}>
            {hardwareStatus}
          </span>
        </div>

        <div className="last-update">
          <span className="update-dot"></span>
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* ⚠️ Disconnection Alert */}
      {hardwareStatus === "Disconnected" && (
        <div className="alert-box">
          <AlertTriangle color="red" size={20} />
          <p>
            Hardware is disconnected. Showing zero readings until connection is
            restored.
          </p>
        </div>
      )}

      {/* Sensor Cards */}
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
            <span className="reading-value">{temperature.toFixed(1)}</span>
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
            <span className="reading-value">{waterFlow.toFixed(2)}</span>
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
            <RefreshCw size={16} className={isLoading ? "spin" : ""} />
            {isLoading ? "Updating..." : "Refresh Data"}
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
