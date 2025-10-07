import React, { useState } from "react";
import "./Home.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    farmName: "Green Poultry Farm",
    location: "Tamil Nadu, India",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile details updated successfully!");
  };

  return (
    <div>
      <h2 className="section-title">👤 User Profile</h2>
      <form onSubmit={handleSave} className="update-card" style={{ maxWidth: "600px", margin: "auto" }}>
        <label>Name:</label>
        <input name="name" value={profile.name} onChange={handleChange} required style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
        <label>Email:</label>
        <input type="email" name="email" value={profile.email} onChange={handleChange} required style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
        <label>Farm Name:</label>
        <input name="farmName" value={profile.farmName} onChange={handleChange} style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
        <label>Farm Location:</label>
        <input name="location" value={profile.location} onChange={handleChange} style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
        <button type="submit" className="cta-button">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
