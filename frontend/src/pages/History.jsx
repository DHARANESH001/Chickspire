import React, { useState } from "react";
import { Calendar, Search, Filter, TrendingUp, BarChart3 } from "lucide-react";
import "./Home.css";
import "./History.css";

const History = () => {
  const [historyData] = useState([
    { date: "2025-10-01", batch: "B-1021", avgTemp: "28.6°C", waterIntake: "40 L", status: "normal" },
    { date: "2025-10-02", batch: "B-1022", avgTemp: "29.1°C", waterIntake: "43 L", status: "normal" },
    { date: "2025-10-03", batch: "B-1023", avgTemp: "27.8°C", waterIntake: "38 L", status: "normal" },
    { date: "2025-10-04", batch: "B-1024", avgTemp: "30.2°C", waterIntake: "45 L", status: "warning" },
    { date: "2025-10-05", batch: "B-1025", avgTemp: "28.9°C", waterIntake: "42 L", status: "normal" },
    { date: "2025-10-06", batch: "B-1026", avgTemp: "27.5°C", waterIntake: "39 L", status: "normal" },
    { date: "2025-10-07", batch: "B-1027", avgTemp: "29.8°C", waterIntake: "44 L", status: "normal" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredData = historyData.filter((row) => {
    const matchesSearch = row.batch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? row.date === dateFilter : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="history-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Calendar className="title-icon" />
            Historical Data Analysis
          </h2>
          <p className="page-subtitle">View and analyze past sensor readings</p>
        </div>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by batch number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="date-filter">
          <Filter size={20} />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="data-table-card">
        <div className="table-header">
          <h3>📋 Sensor Data Records</h3>
          <span className="record-count">{filteredData.length} records</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Batch Number</th>
                <th>Avg Temperature</th>
                <th>Water Intake</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td><span className="batch-badge">{row.batch}</span></td>
                  <td>{row.avgTemp}</td>
                  <td>{row.waterIntake}</td>
                  <td>
                    <span className={`status-pill ${row.status}`}>
                      {row.status === "normal" ? "✓ Normal" : "⚠ Warning"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="comparison-section">
        <div className="comparison-card">
          <div className="card-header">
            <BarChart3 size={24} />
            <h3>Compare Data</h3>
          </div>
          <div className="comparison-inputs">
            <div className="input-group">
              <label>Start Date</label>
              <input type="date" />
            </div>
            <div className="input-group">
              <label>End Date</label>
              <input type="date" />
            </div>
            <button className="compare-btn">
              <TrendingUp size={18} />
              Compare
            </button>
          </div>
          <div className="chart-area">
            <div className="chart-placeholder">
              <BarChart3 size={48} />
              <p>Select dates to view comparison chart</p>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-summary">
        <div className="summary-card">
          <h4>Average Temperature</h4>
          <p className="summary-value">28.7°C</p>
        </div>
        <div className="summary-card">
          <h4>Total Water Usage</h4>
          <p className="summary-value">291 L</p>
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
