import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { error, register } = useAuth();  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      const data = await register(formData); 
      if (data) {
        alert("Đăng ký thành công !!!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);  
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="slogan">
          <p>Trái tim xanh</p>
          <p>Kết nối với cộng đồng</p>
          <p>Hành động vì thiên nhiên</p>
        </div>
      </div>

      <div className="login-right">
        <div className="card shadow-sm p-4">
          <h2 className="text-center mb-4">Đăng ký</h2>
          {/* Hiển thị lỗi nếu có */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Họ và tên</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nhập họ và tên"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
          </form>
          <div className="mt-3 text-center">
            <p>Bạn đã có tài khoản ? <a href="/login">Đăng nhập ở đây !</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
