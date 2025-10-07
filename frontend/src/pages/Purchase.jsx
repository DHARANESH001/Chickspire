import React, { useState } from "react";
import "./Home.css";

const Purchase = () => {
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Product booked successfully! Delivery Address: ${address}`);
  };

  return (
    <div>
      <h2 className="section-title">🛍 Purchase Product</h2>
      <form onSubmit={handleSubmit} className="update-card" style={{ maxWidth: "500px", margin: "auto" }}>
        <label>Delivery Address:</label><br />
        <textarea
          rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address..."
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          required
        ></textarea>
        <button type="submit" className="cta-button">Book Product</button>
      </form>
    </div>
  );
};

export default Purchase;
