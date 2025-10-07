import React, { useState } from "react";
import { User, Mail, MapPin, Building2, Save, Camera } from "lucide-react";
import "./Home.css";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    farmName: "Green Poultry Farm",
    location: "Tamil Nadu, India",
    phone: "+91-7904846933",
    memberSince: "January 2025",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile details updated successfully!");
  };

  return (
    <div className="profile-container">
      <div className="page-header">
        <h2 className="page-title">
          <User className="title-icon" />
          User Profile
        </h2>
        <p className="page-subtitle">Manage your account information</p>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="avatar-section">
            <div className="avatar">
              <User size={64} />
            </div>
            <button className="avatar-upload">
              <Camera size={18} />
              Change Photo
            </button>
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-card">
            <div className="card-header">
              <h3>Personal Information</h3>
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              ) : (
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <User size={18} />
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Mail size={18} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Building2 size={18} />
                    Farm Name
                  </label>
                  <input
                    name="farmName"
                    value={profile.farmName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <MapPin size={18} />
                    Location
                  </label>
                  <input
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <Mail size={18} />
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <button type="submit" className="save-btn">
                  <Save size={18} />
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
