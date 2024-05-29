import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../SideBar/SideBar";
import Navigation from "../Navbar/Navigation";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Pastikan Anda mengimpor Swal

const UpdateAdminCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const endPoint = `http://localhost:3000/category-admin/${id}`;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(endPoint);
        const categoryAdmin = response.data.data;
        console.log(categoryAdmin);
        // Pastikan struktur data respons sesuai dengan yang diharapkan
        setCategory(categoryAdmin.category || "");
        setIcon(categoryAdmin.icon || "");
      } catch (error) {
        console.log("Error Fetch Data:" + error);
      }
    };
    fetchCategory();
  }, [endPoint]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      category,
      icon,
    };

    try {
      const response = await axios.put(endPoint, categoryData, { withCredentials: true });
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
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
                      <h1>UBAH KATEGORI</h1>
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
                              <label htmlFor="nama" className="mb-3">
                                Nama Kategori
                              </label>
                            </td>
                            <td className="pe-3 ">
                              <p className="mb-3">:</p>
                            </td>
                            <td>
                              <input 
                                type="text" 
                                name="category" 
                                className="mb-3 form-control" 
                                value={category}  
                                onChange={(e) => setCategory(e.target.value)} 
                                placeholder="isi kategori..." 
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="ps-5 pe-3">
                              <label htmlFor="icon" className="ps-5 pe-3">
                                Icon
                              </label>
                            </td>
                            <td className="pe-3">:</td>
                            <td>
                              <input 
                                type="text" 
                                name="icon" 
                                value={icon}  
                                onChange={(e) => setIcon(e.target.value)} 
                                className="form-control" 
                                placeholder="isi icon" 
                              />
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <button type="submit" name="submit" className="mt-3 btn btn-primary">
                                UBAH
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

export default UpdateAdminCategory;
