import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import Navigation from "../Navbar/Navigation";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAdminCategory = () => {
  const [category, setCategory] = useState([]);
  const [icon, setIcon] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const endPoint = "http://localhost:3000/category-admin";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      category,
      icon,
    };

    console.log(categoryData);

    try {
      const response = await axios.post(endPoint, categoryData, { withCredentials: true });
      setResponseMessage(response.data.message);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate('/admin-category')
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setResponseMessage("Error: " + errorMessage);

      // Notifikasi menggunakan SweetAlert2 dengan pesan dari backend
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
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
                <div className="d-block rounded shadow bg-white p-3 mt-3">
                  <div className="cust-table">
                    <div className="d-flex justify-content-between flex-wrap gap-5 title-table w-100">
                      <h1>TAMBAH KATEGORI</h1>
                    </div>
                    <div className="table mt-5"></div>
                  </div>
                </div>
                <div className="d-block rounded shadow bg-white p-3 mt-3">
                  <div className="cust-table">
                    <div className="d-flex justify-content-between  flex-wrap gap-5 title-table w-100">
                      <form onSubmit={handleSubmit}>
                        <table>
                          <tr>
                            <td className="ps-5 pe-3 ">
                              <label for="nama" className="mb-3">
                                Nama Kategori
                              </label>
                            </td>
                            <td className="pe-3 ">
                              <p className="mb-3">:</p>
                            </td>

                            <td>
                              <input type="text" name="category" className="mb-3 form-control" onChange={(e) => setCategory(e.target.value)} placeholder="isi kategori..." />
                            </td>
                          </tr>
                          <tr>
                            <td className="ps-5 pe-3">
                              <label for="icon" className="ps-5 pe-3">
                                Icon
                              </label>
                            </td>
                            <td className="pe-3">:</td>

                            <td>
                              <input type="text" name="icon" className="form-control" onChange={(e) => setIcon(e.target.value)} placeholder="isi icon" />
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <button type="submit" name="submit" className="btn btn-primary mt-3">
                                Tambah
                              </button>
                            </td>
                          </tr>
                        </table>
                      </form>
                    </div>
                    <div className="table mt-5"></div>
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

export default AddAdminCategory;
