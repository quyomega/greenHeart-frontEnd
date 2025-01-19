
import React from "react";
import "../assets/css/Admin.css"; // Liên kết tệp CSS
import { createSampleMissions } from "../services/adminService"; // Import hàm createSampleMissions

function CreateTask({ token }) {
  const handleCreateSampleMissions = async () => {
    try {
      const result = await createSampleMissions(token); // Gọi hàm createSampleMissions
      console.log("Nhiệm vụ mẫu đã được tạo:", result); // Kiểm tra kết quả trả về
    } catch (error) {
      console.error("Lỗi khi tạo nhiệm vụ mẫu:", error);
    }
  };

  return (
    <div className="create-task-container">
      <h1>Tạo Nhiệm Vụ Mẫu</h1>
      <input type="text" placeholder="Tên nhiệm vụ mẫu" />
      <input type="text" placeholder="Mô tả nhiệm vụ mẫu" />
      <button onClick={handleCreateSampleMissions}>Tạo Nhiệm Vụ Mẫu</button>
    </div>
  );
}

export default CreateTask;