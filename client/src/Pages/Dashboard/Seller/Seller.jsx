import React from "react";
import Navigation from "./Navbar/Navigation.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";

import "./../../../assets/Style/Seller.css";

const Seller = () => {
  return (
    <div className="dashboard-container">
      <Navigation />
      <div className="content">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard-item product">
            <h2>Product Data</h2>
            <p>Here you can manage your products.</p>
          </div>
          <div className="dashboard-item categories">
            <h2>Categories Data</h2>
            <p>Manage your product categories here.</p>
          </div>
          <div className="dashboard-item report">
            <h2>Report</h2>
            <p>View your sales report here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
