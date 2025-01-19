import React from "react";
import useAdminData from "../hooks/adminData";

function ManagerMember({ token }) {
  const { allUsers, error, loading } = useAdminData(token);
  return (
    <div>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManagerMember;