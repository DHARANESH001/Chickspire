import React, { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { 
  ShoppingCart, Activity, History, Cpu, BookOpen, User, 
  LogOut, Menu, X
} from "lucide-react";
import "./Home.css";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { path: "/dashboard/purchase", icon: ShoppingCart, label: "Purchase" },
    { path: "/dashboard/live", icon: Activity, label: "Live Reading" },
    { path: "/dashboard/history", icon: History, label: "History" },
    { path: "/dashboard/sensors", icon: Cpu, label: "Sensors" },
    { path: "/dashboard/guideline", icon: BookOpen, label: "Guideline" },
    { path: "/dashboard/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="logo">
            <img src="/logo.jpg" alt="Logo" className="nav-logo" />
            <span className="logo-text">CHICKSPIRE</span>
          </div>
        </div>
        <div className="header-right">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>

      <footer className="dashboard-footer">
        <p>© 2025 CHICKSPIRE | Smart Poultry Monitoring System</p>
      </footer>
    </div>
  );
};

export default Dashboard;
