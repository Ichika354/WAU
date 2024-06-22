import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SideBar from "../SideBar/SideBar";
import Navigation from "../Navbar/Navigation";

const Category = () => {
  const endPoint = "https://wirausahaanakulbi-server.vercel.app/category-admin";
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(endPoint);
      setCategories(response.data.data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div>
        <SideBar />
        <Navigation />
      </div>
      <div>
        <div className="main-pages">
          <div className="container-fluid">
            <div className="row g-2">
              <div className="col-12 col-lg-6 w-100">
                <div className="d-block rounded shadow bg-white p-3">
                  <div className="cust-table">
                    <div className="d-flex justify-content-between flex-wrap gap-5 title-table w-100">
                      <h1>DATA KATEGORI</h1>
                    </div>
                    <div className="table mt-5">
                      <table className="table ms-0">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Kategori</th>
                            <th scope="col">Icon</th>
                            <th scope="col">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((category, index) => (
                            <tr key={category.id_category_admin}>
                              <td>{index + 1}</td>
                              <td>{category.category}</td>
                              <td>{category.icon}</td>
                              <td>
                                <button className="btn btn-warning me-2" onClick={() => navigate(`/update-admin-category/${category.id_category_admin}`)}>
                                  EDIT
                                </button>
                                <button className="btn btn-danger">DELETE</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button className="btn btn-primary" onClick={() => navigate("/add-admin-category")}>
                        INPUT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
