import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          withCredentials: true, // Send cookies with the request
        });

        if (response.data.success) {
          setUser(response.data.data[0]);
        } else {
          setError(response.data.message);
          navigate("/access"); // Redirect to /access if not authenticated
        }
      } catch (err) {
        setError("Failed to fetch user data");
        navigate("/access"); // Redirect to /access if error occurs
      }
    };

    fetchUser();
  }, [navigate]);

  if (error) {
    return <div>Redirecting...</div>; // Optional: Show a message while redirecting
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="sidebar">
      <div className="sidebar-header">{user.name}</div>
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
