import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          withCredentials: true, // Mengirimkan cookie bersama permintaan
        });

        if (response.data.success) {
          setUser(response.data.data[0]);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const navigate = useNavigate();
    try {
      const response = await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });

      console.log(response.data);

      if (response.data.success) {
        Swal.fire({
          title: 'Logged Out',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirect to login page or home page
          navigate("/login")
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.response ? err.response.data.message : err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light py-1">
        <div className="container-fluid">
          <button className="btn btn-default" id="btn-slider" type="button">
            <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
          </button>
          <a className="navbar-brand me-auto text-danger" href="#">
            Dash<span className="text-warning">Board</span>
          </a>
          <ul className="nav ms-auto">
            <li className="nav-item dropstart">
              <a className="nav-link text-dark ps-3 pe-1" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                <p className="fw-bold m-0 lh-1">{user.name}</p>
              </a>

              <div className="dropdown-menu mt-2 pt-0" aria-labelledby="navbarDropdown">
                <div className="d-flex p-3 border-bottom mb-2">
                  <div className="d-block">
                    <p className="fw-bold m-0 lh-1">{user.name}</p>
                    <small>{user.numberPhone}</small>
                  </div>
                </div>
                <a className="dropdown-item" href="">
                  <i className="fa fa-user fa-lg me-3" aria-hidden="true"></i>Profile
                </a>
                <a className="dropdown-item" href="">
                  <i className="fa fa-cog fa-lg me-3" aria-hidden="true"></i>Detail Order
                </a>
                <hr className="dropdown-divider" />
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="fa fa-sign-out fa-lg me-3" aria-hidden="true"></i>Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
