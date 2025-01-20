import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import '../assets/css/Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { error, handleLoginSubmit } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(formData);  
  };

  return (
    <div className="login-container">
      <div className="col-6 login-left">
        <div className="slogan">
          <p>Dự án trái tim xanh</p>
          <p>Kết nối với cộng đồng</p>
          <p>Hành động vì thiên nhiên</p>
        </div>
      </div>

      <div className="col-6 login-right">
        <div className="card shadow-sm p-4">
          <h2 className="text-center mb-4">Đăng nhập</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Nhập email của bạn"
                onChange={handleChange}
                value={formData.email}
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
                placeholder="Nhập mật khẩu của bạn"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Bạn chưa có tài khoản? <a href="/register">Đăng ký ở đây!</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
