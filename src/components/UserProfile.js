import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/UserDashboard.css";

function UserProfile({ userData }) {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="userInfo">
      <p>
        <b>Thông tin tài khoản</b>
      </p>
      <div className="row">
        <div className="col-3">
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt="Avatar"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          ) : (
            <p>Chưa có ảnh đại diện</p>
          )}
          <p onClick={() => navigate("/user-details")} className="details-link">
            Xem chi tiết
          </p>
        </div>
        <div className="col-6">
          <p>Mã: {isSmallScreen ? truncate(userData.id, 10) : userData.id}</p> {/* Rút gọn nếu màn hình nhỏ */}
          <p>Tên: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Số điện thoại: {userData.phone}</p>
          <p>Địa chỉ: {userData.address}</p>
        </div>
        <div className="col-2">
          <p>Tổng điểm: {userData.points}</p>
          <p>Cấp độ: {userData.level}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
