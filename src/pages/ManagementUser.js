import React from "react";
import useUserData from "../hooks/useUserData";
import "../assets/css/UserManagement.css";

function ManagementUser({ token }) {
  const { allUsers, error, loading } = useUserData(token);

  return (
    <div className="manager-member-container">
      <h1>Quản lý người dùng</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="title">Họ tên</th>
              <th className="title">Email</th>
              <th className="title">Số điện thoại</th>
              <th className="title">Địa chỉ</th>
              <th className="title">Vai trò</th>
              <th className="title">Điểm</th>
              <th className="title">Tổng điểm</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="admin-role" style={{ color: "red" }}>
                      {user.role}
                    </span>
                  ) : (
                    <span className="user-role">{user.role}</span>
                  )}
                </td>
                <td>{user.points}</td>
                <td>{user.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManagementUser;
