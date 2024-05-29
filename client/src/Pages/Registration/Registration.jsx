import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "../../assets/Style/Registration.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [npm, setNpm] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/registration", { name, npm, numberPhone, password, confirmPassword, role }, { withCredentials: true });
      Swal.fire({
        title: "Registered!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate('/login')
    } catch (err) {
      console.error("Registration failed:", err.response ? err.response.data.message : err.message);
      Swal.fire({
        title: "Failed :(",
        text: err.response ? err.response.data.message : "Registration failed. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

  };

  return (
    <div>
      <div className="container font-cabin">
        <form onSubmit={handleSubmit} className="registration wrap">
          <div className="h1 font-cabin">Registration</div>
          <div className="row">
            <div className="col">
              <input type="text" className="font-cabin" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" className="font-cabin" placeholder="Number Phone" value={numberPhone} onChange={(e) => setNumberPhone(e.target.value)} />
              <select className="font-cabin" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Seller">Seller</option>
                <option value="Buyer">Buyer</option>
              </select>
            </div>
            <div className="col">
              <input type="number" className="font-cabin" placeholder="NPM" value={npm} onChange={(e) => setNpm(e.target.value)} />
              <input type="password" className="font-cabin" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="password" className="font-cabin" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <button className="btn-registration font-cabin" type="submit">
            Register
          </button>
          <p className="font-cabin fs-description pt-2">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
