import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "../../assets/Style/Login.css";

const Login = () => {
  const [npm, setNpm] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", { npm, password }, { withCredentials: true });
      console.log(response.data.role); // Pesan sambutan dari backend
      Swal.fire({
        title: "Logined!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      if ((response.data.role === "Seller")) {
        navigate("/seller");
      } else if ((response.data.role === "admin")) {
        navigate("/admin");
      }
    } catch (err) {
      console.error("Login failed:", err.response ? err.response.data.message : err.message);
      Swal.fire({
        title: "Failed :(",
        text: err.response ? err.response.data.message : err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container font-cabin">
      <form onSubmit={handleSubmit} className="login wrap">
        <div className="h1 font-cabin">Login</div>
        <input type="text" className="font-cabin" placeholder="NPM" value={npm} onChange={(e) => setNpm(e.target.value)} />
        <input type="password" className="font-cabin" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-login font-cabin" type="submit">
          Login
        </button>
        <p className="font-cabin fs-description pt-2">
          Have not an account? <a href="/registration">sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
