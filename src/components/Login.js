import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../assets/css/Login.css';  // Import CSS

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);

      const { token, role } = response.data;

      if (!token || !role) {
        console.error("API không trả về token hoặc role.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      {/* Slogan bên trái */}
      <div className="login-left">
        <div className="slogan">
          <p>Trái tim xanh</p>
          <p>Kết nối với cộng đồng</p>
          <p>Hành động vì thiên nhiên</p>
        </div>
      </div>
      
      {/* Form đăng nhập bên phải */}
      <div className="login-right">
        <div className="card shadow-sm p-4">
          <h2 className="text-center mb-4">Đăng nhập</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Nơi nhập email của bạn"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Nơi nhập mật khẩu của bạn"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Bạn chưa có tài khoản ? <a href="/register">Đăng ký ở đây !</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
