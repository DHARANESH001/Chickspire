import React, { useState, useEffect } from "react";
import { User, Mail, MapPin, Building2, Save, Camera } from "lucide-react";
import "./Home.css";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    farmName: "",
    location: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in first!");
          return;
        }

        const response = await fetch("http://localhost:8080/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to load profile");

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Unable to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle field updates
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Save profile updates to backend
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updated = await response.json();
      setProfile(updated);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <p>Loading profile...</p>
      </div>
    );
  }

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
                    name="username"
                    value={profile.username}
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
                    disabled // ❌ Email shouldn't be editable
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
                    value={profile.farmName || ""}
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
                    value={profile.location || ""}
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
                  value={profile.phone || ""}
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
