import React from "react";
import "./Home.css";

const Guideline = () => {
  return (
    <div>
      <h2 className="section-title">🧠 Hardware Connection Guide</h2>
      <div className="update-card">
        <ol>
          <li>Connect LM35D sensor to analog pin A0 of ESP32.</li>
          <li>Connect YF-S201 sensor output to digital pin D2.</li>
          <li>Provide stable 5V supply to ESP32 and sensors.</li>
          <li>Upload Arduino code with your Wi-Fi credentials.</li>
          <li>Open the dashboard → Live Reading to monitor values.</li>
        </ol>
        <p style={{ marginTop: "15px" }}>
          💡 Tip: Ensure sensors are calibrated before recording live data.
        </p>
      </div>
    </div>
  );
};

export default Guideline;
