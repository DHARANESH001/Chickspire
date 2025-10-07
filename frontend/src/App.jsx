import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import Purchase from "./pages/Purchase";
import LiveReading from "./pages/LiveReading";
import History from "./pages/History";
import Sensors from "./pages/Sensors";
import Guideline from "./pages/Guideline";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="purchase" element={<Purchase />} />
          <Route path="live" element={<LiveReading />} />
          <Route path="history" element={<History />} />
          <Route path="sensors" element={<Sensors />} />
          <Route path="guideline" element={<Guideline />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
