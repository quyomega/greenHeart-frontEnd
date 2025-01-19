import React from "react";
import ManagerMember from "../components/manangerMenber";
import useAdminData from "../hooks/adminData";
import CreateTask from "../components/creatTask"; 
import "../assets/css/Admin.css"; // Liên kết tệp CSS đã được sửa đổi cho đẹp


function AdminDashboard() {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const { allUsers } = useAdminData(token);



  return (
 
    <div className="container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. Manage your users and activities here.</p>
      <ManagerMember token={token} allUsers={allUsers} />
      <br/>
      <CreateTask token={token} />
      <br/>
      
    </div>
  );
}

export default AdminDashboard;