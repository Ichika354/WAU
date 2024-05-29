import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Your Company Name</div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/profile" className="sidebar-link">
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/products" className="sidebar-link">
            <i className="fas fa-box"></i> Products
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/categories" className="sidebar-link">
            <i className="fas fa-list"></i> Categories
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/reportselling" className="sidebar-link">
            <i className="fas fa-chart-line"></i> Report Selling
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
