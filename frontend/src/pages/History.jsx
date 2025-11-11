import React, { useState, useEffect } from "react";
import { Calendar, Search, Filter, TrendingUp, BarChart3, RefreshCw } from "lucide-react";
import "./Home.css";
import "./History.css";
import LineChart from "../components/LineChart";

// ThingSpeak channel info
const THINGSPEAK_CHANNEL_ID = "3123713"; // your channel ID
const THINGSPEAK_READ_KEY = "534F28U0J41AGJ5E"; // your read API key

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    tempData: [],
    flowData: [],
    dates: []
  });
  const [timeRange, setTimeRange] = useState("24h"); // 24h, 7d, 30d
  const [isLoading, setIsLoading] = useState(false);

  const fetchThingSpeakData = async () => {
    try {
      setIsLoading(true);

      // Calculate time range
      const now = new Date();
      let startDate = new Date();
      let results = 50;

      if (timeRange === "24h") {
        startDate.setDate(now.getDate() - 1);
        results = 100;
      } else if (timeRange === "7d") {
        startDate.setDate(now.getDate() - 7);
        results = 50;
      } else {
        startDate.setDate(now.getDate() - 30);
        results = 30;
      }

      const response = await fetch(
        `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_READ_KEY}&results=${results}`,
        { cache: "no-store" }
      );

      if (!response.ok) throw new Error(`Network error: ${response.status}`);
      const data = await response.json();

      if (!data.feeds || data.feeds.length === 0) {
        console.warn("No data from ThingSpeak yet.");
        return;
      }

      const filteredFeeds = data.feeds
        .filter(feed => {
          const feedDate = new Date(feed.created_at);
          return feedDate >= startDate;
        })
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      const formattedData = filteredFeeds.map((feed, index) => {
        const temp = parseFloat(feed.field1);
        const flow = parseFloat(feed.field2);

        return {
          date: new Date(feed.created_at).toLocaleDateString(),
          time: new Date(feed.created_at).toLocaleTimeString(),
          batch: `B-${1000 + index}`,
          avgTemp: `${isNaN(temp) ? "—" : temp.toFixed(1)} °F`,
          waterIntake: `${isNaN(flow) ? "—" : flow.toFixed(2)} L/min`,
          status: temp < 90 || temp > 92 || flow < 1 || flow > 3 ? "warning" : "normal",
          rawTemp: temp,
          rawFlow: flow,
          timestamp: feed.created_at
        };
      });

      setHistoryData(formattedData.reverse());

      const labels = filteredFeeds.map(feed => {
        const date = new Date(feed.created_at);
        if (timeRange === "24h") {
          return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        } else {
          return date.toLocaleDateString();
        }
      });

      setChartData({
        labels,
        tempData: filteredFeeds.map(feed => parseFloat(feed.field1)),
        flowData: filteredFeeds.map(feed => parseFloat(feed.field2)),
        dates: filteredFeeds.map(feed => feed.created_at)
      });
    } catch (error) {
      console.error("❌ Error fetching ThingSpeak data:", error);
      alert("Unable to fetch latest sensor data. Please check Wi-Fi or ThingSpeak connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch data every 30 seconds
  useEffect(() => {
    fetchThingSpeakData(); // initial load
    const interval = setInterval(fetchThingSpeakData, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  const filteredData = historyData.filter(row => {
    const matchesSearch = row.batch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? row.date === dateFilter : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="history-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <BarChart3 className="title-icon" />
            Historical Data
          </h2>
          <p className="page-subtitle">Past sensor readings and analysis</p>
        </div>

        <div className="filters">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search batches..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="date-filter">
            <Calendar size={18} className="calendar-icon" />
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="time-range-selector"
              disabled={isLoading}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          <button
            className={`refresh-btn ${isLoading ? "loading" : ""}`}
            onClick={fetchThingSpeakData}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? "spin" : ""} />
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Graph Section */}
      <div className="graph-section">
        <div className="section-header">
          <h3>Historical Trends</h3>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color temp"></span>
              <span>Temperature (°F)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color flow"></span>
              <span>Flow Rate (L/min)</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-card">
            <LineChart
              title="Temperature Over Time"
              labels={chartData.labels}
              data={chartData.tempData}
              dataLabel="Temperature (°F)"
              borderColor="rgb(255, 99, 132)"
              backgroundColor="rgba(255, 99, 132, 0.2)"
            />
          </div>

          <div className="chart-card">
            <LineChart
              title="Water Flow Over Time"
              labels={chartData.labels}
              data={chartData.flowData}
              dataLabel="Flow Rate (L/min)"
              borderColor="rgb(54, 162, 235)"
              backgroundColor="rgba(54, 162, 235, 0.2)"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="data-table-card">
        <div className="table-header">
          <h3> Sensor Data Records</h3>
          <span className="record-count">{filteredData.length} records</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Batch</th>
                <th>Avg Temperature</th>
                <th>Water Flow</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td>
                    <span className="batch-badge">{row.batch}</span>
                  </td>
                  <td>{row.avgTemp}</td>
                  <td>{row.waterIntake}</td>
                  <td>
                    <span className={`status-pill ${row.status}`}>
                      {row.status === "normal" ? "✓ Normal" : "⚠ Warning"}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="6" className="no-data">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="stats-summary">
        <div className="summary-card">
          <h4>Average Temperature</h4>
          <p className="summary-value">
            {(
              historyData.reduce((acc, r) => acc + parseFloat(r.rawTemp || 0), 0) /
              (historyData.length || 1)
            ).toFixed(1)}{" "}
            °F
          </p>
        </div>
        <div className="summary-card">
          <h4>Average Water Flow</h4>
          <p className="summary-value">
            {(
              historyData.reduce((acc, r) => acc + parseFloat(r.rawFlow || 0), 0) /
              (historyData.length || 1)
            ).toFixed(2)}{" "}
            L/min
          </p>
        </div>
        <div className="summary-card">
          <h4>Total Records</h4>
          <p className="summary-value">{historyData.length}</p>
        </div>
      </div>
    </div>
  );
};

export default History;
