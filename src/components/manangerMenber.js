import React from "react";
import useAdminData from "../hooks/adminData";
import "../assets/css/Admin.css"; // Liên kết tệp CSS

function ManagerMember({ token }) {
  const { allUsers, error, loading } = useAdminData(token);

  return (
    <div className="manager-member-container">
      <h1>Quản lý thành viên</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {allUsers.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.role} - {user.phone} - {user.address} - {user.points}-{user.totalPoints}
              <div className="user-info">
                <span>Họ tên: {user.name}</span>
              </div>
              <div className="user-info">
                <span>Email: {user.email}</span>
                <span>Số điện thoại: {user.phone}</span>
              </div>
              <div className="user-info">
                {user.role === "admin" ? (
                  <span className="admin-role" style={{ color: "red" }}>Vai trò: {user.role}</span>
                ) : (
                  <span className="user-role">Vai trò: {user.role}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManagerMember;