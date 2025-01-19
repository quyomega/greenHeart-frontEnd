import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/UserDashboard.css";

function UserProfile({ userData }) {
  const goToUserDetails = () => {
    navigate("/user-details");
  };
  const navigate = useNavigate();
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
          <p onClick={goToUserDetails} className="details-link">
            Xem chi tiết
          </p>
        </div>
        <div className="col-6">
          <p>Mã: {userData.id}</p>
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
