import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/UserDashboard.css"; // Đường dẫn CSS cho dashboard

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);

  // Gọi API để lấy thông tin người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        alert("Không thể tải thông tin. Vui lòng đăng nhập lại.");
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>UserDashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </header>
      <div className="dashboard-content">
        <aside
          className={`dashboard-sidebar ${isMenuCollapsed ? "collapsed" : ""}`}
        >
          <button className="menu-toggle-btn" onClick={toggleMenu}>
            {isMenuCollapsed ? ">" : "<"}
          </button>
          <ul className={isMenuCollapsed ? "collapsed" : ""}>
            <li>Trang chủ</li>
            <li>Hoạt động</li>
            <li>Thông báo</li>
            <li>Hỗ trợ</li>
          </ul>
        </aside>
        <main className="dashboard-main">
          {userData ? (
            <div>
              <div className="row row-1">
                <div className="col-7">
                  <div className="userInfo">
                  <p>Thông tin tài khoản</p>
                    <div className="row">
                      <div className="col-5">
                        <p>ảnh đại diện</p>
                      </div>
                      <div className="col-3">
                        <p>Tên : {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Điểm thưởng: {userData.points}</p>
                        <p>Cấp độ: {userData.level}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="userInfo">
                    <p>Thông tin bổ sung 2</p>
                  </div>
                </div>
              </div>
              <div className="row row-2">
                <div className="col-12">
                  <div className="userInfo">
                    <p>Thông tin bổ sung 2</p>
                  </div>
                </div>
              </div>
              <div className="row row-3">
                <div className="col-4">
                  <div className="userInfo">
                    <p>Thông tin bổ sung 3</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="userInfo">
                    <p>Thông tin bổ sung 4</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="userInfo">
                    <p>Thông tin bổ sung 5</p>
                  </div>
                </div>
              </div>
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
