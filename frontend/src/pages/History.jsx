import React, { useState } from "react";
import "./Home.css";

const History = () => {
  // Sample historical data (replace later with API or database data)
  const [historyData] = useState([
    { date: "2025-10-01", batch: "B-1021", avgTemp: "28.6°C", waterIntake: "40 L" },
    { date: "2025-10-02", batch: "B-1022", avgTemp: "29.1°C", waterIntake: "43 L" },
    { date: "2025-10-03", batch: "B-1023", avgTemp: "27.8°C", waterIntake: "38 L" },
    { date: "2025-10-04", batch: "B-1024", avgTemp: "30.2°C", waterIntake: "45 L" },
    { date: "2025-10-05", batch: "B-1025", avgTemp: "28.9°C", waterIntake: "42 L" },
  ]);

  return (
    <div>
      <h2 className="section-title">📅 Historical Data Analysis</h2>

      {/* ---- Historical Data Table ---- */}
      <div className="update-card">
        <h4>📋 Past Days Sensor Data</h4>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "15px",
              fontSize: "1rem",
            }}
          >
            <thead style={{ background: "#0077cc", color: "white" }}>
              <tr>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Batch Number</th>
                <th style={tableHeaderStyle}>Average Temperature</th>
                <th style={tableHeaderStyle}>Water Intake</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#f9f9f9" : "#eef7ff",
                    textAlign: "center",
                  }}
                >
                  <td style={tableCellStyle}>{row.date}</td>
                  <td style={tableCellStyle}>{row.batch}</td>
                  <td style={tableCellStyle}>{row.avgTemp}</td>
                  <td style={tableCellStyle}>{row.waterIntake}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---- Comparison Section ---- */}
      <div className="update-card" style={{ marginTop: "40px" }}>
        <h4>🔍 Compare Two Days</h4>
        <div>
          <label>Date 1: </label>
          <input type="date" /> &nbsp;
          <label>Date 2: </label>
          <input type="date" /> &nbsp;
          <button className="cta-button">Compare</button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <canvas id="compareChart"></canvas>
        </div>
      </div>
    </div>
  );
};
const tableHeaderStyle = {
  padding: "12px 10px",
  border: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

export default History;
