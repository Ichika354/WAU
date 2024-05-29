import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SideBar = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user', {
          withCredentials: true // Mengirimkan cookie bersama permintaan
        });

        if (response.data.success) {
          setUser(response.data.data[0]);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="slider" id="sliders">
        <div className="slider-head">
          <div className="d-block pt-4 pb-3 px-3">
            <p className="fw-bold mb-3 lh-4 text-white">{user.role}</p>
            <p className="fw-bold mb-0 lh-1 text-white">{user.name}</p>
            <small className="text-white">{user.numberPhone}</small>
          </div>
        </div>
        <div className="slider-body px-1">
          <nav className="nav flex-column">
            <a className="nav-link px-3 active" href="/admin">
              <i className="fa fa-home fa-lg box-icon" aria-hidden="true"></i>Home
            </a>
            <a className="nav-link px-3" href="">
              <i className="fa fa-user fa-lg box-icon" aria-hidden="true"></i>Profile
            </a>
            <hr className="soft my-1 bg-white" />
            <a className="nav-link px-3" href="/admin-category">
              <i className="fa fa-list fa-lg box-icon" aria-hidden="true"></i>Kategori
            </a>
            <a className="nav-link px-3" href="">
              <i className="fa fa-box fa-lg box-icon" aria-hidden="true"></i>Produk
            </a>
            <a className="nav-link px-3" href="">
              <i className="fa fa-users fa-lg box-icon" aria-hidden="true"></i>Penjual
            </a>
            <hr className="soft my-1 bg-white" />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
