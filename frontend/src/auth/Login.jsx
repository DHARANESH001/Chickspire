import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      localStorage.setItem('user', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="background-overlay"></div>

      {/* Left Info Section */}
      <div className="left-panel">
        <div className="left-content">
          <h1>CHICKSPIRE</h1>
          <h2>Welcome Back</h2>
          <p>
            Empower your poultry farm with intelligent monitoring and control.
            <b> CHICKSPIRE</b> helps you track temperature, humidity, and
            sensor activity in real-time — ensuring healthier livestock and smarter operations.
          </p>
        </div>
      </div>

      {/* Right Login Card */}
      <div className="right-panel">
        <div className="login-card">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit">Sign In</button>

            <p className="signup-text">
              Don’t have an account? <a href="/register">Create an Account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
