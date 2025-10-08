import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

const FarmForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData || {};

  const [formData, setFormData] = useState({
    farmName: '',
    farmAddress: '',
    pincode: '',
    phone: '',
    numberOfFarms: '',
    chicksPerFarm: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.phone.length !== 10) {
      setError('Phone number must be 10 digits');
      return;
    }
    if (formData.pincode.length !== 6) {
      setError('Pincode must be 6 digits');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/farm/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          ...formData,
          numberOfFarms: parseInt(formData.numberOfFarms),
          chicksPerFarm: parseInt(formData.chicksPerFarm),
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Farm registration failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Farm Registration Response:', data);
      
      localStorage.setItem('farmData', JSON.stringify(data));
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Farm registration failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="background-overlay"></div>
      <div className="left-panel">
        <div className="left-content">
          <h1>Farm Details</h1>
          <h2>Complete Your Profile</h2>
          <p>
            Tell us about your farm to get personalized insights and recommendations. 
            This information helps us provide better monitoring and management solutions 
            tailored to your poultry farm's needs.
          </p>
        </div>
      </div>
      <div className="right-panel">
        <div className="login-card">
          <h2>Farm Information</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="farmName"
              value={formData.farmName}
              onChange={handleChange}
              placeholder="Farm Name"
              required
            />

            <input
              type="text"
              name="farmAddress"
              value={formData.farmAddress}
              onChange={handleChange}
              placeholder="Farm Address"
              required
            />

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode (6 digits)"
              pattern="[0-9]{6}"
              maxLength="6"
              required
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (10 digits)"
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />

            <input
              type="number"
              name="numberOfFarms"
              value={formData.numberOfFarms}
              onChange={handleChange}
              placeholder="Number of Farms"
              min="1"
              required
            />

            <input
              type="number"
              name="chicksPerFarm"
              value={formData.chicksPerFarm}
              onChange={handleChange}
              placeholder="Number of Chicks per Farm"
              min="1"
              required
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit">Complete Registration</button>

            <p className="signup-text">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FarmForm;
