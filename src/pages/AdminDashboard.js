import React from "react";
import ManagerMember from "../components/manangerMenber";
import useAdminData from "../hooks/adminData";

function AdminDashboard() {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const { allUsers } = useAdminData(token);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. Manage your users and activities here.</p>
      <ManagerMember token={token} allUsers={allUsers} />
    </div>
  );
}

export default AdminDashboard;