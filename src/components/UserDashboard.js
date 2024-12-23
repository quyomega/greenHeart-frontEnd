import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/UserDashboard.css"; // Đường dẫn CSS cho dashboard

function UserDashboard() {
  const [userData, setUserData] = useState(null);

  // Gọi API để lấy thông tin người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        alert("Không thể tải thông tin. Vui lòng đăng nhập lại.");
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Xóa token và role khi đăng xuất
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Green Heart Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <ul>
            <li>Trang chủ</li>
            <li>Hoạt động</li>
            <li>Thông báo</li>
            <li>Hỗ trợ</li>
          </ul>
        </aside>
        <main className="dashboard-main">
          {userData ? (
            <div>
              <h2>Xin chào, {userData.name}!</h2>
              <p>Email: {userData.email}</p>
              <p>Điểm thưởng: {userData.points}</p>
              <p>Cấp độ: {userData.level}</p>
            </div>
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
