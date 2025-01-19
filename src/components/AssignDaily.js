
import React, { useState } from "react";
import { assignDataToUser } from "../services/adminService";

function AssignData({ token }) {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");

  const handleAssignData = async () => {
    try {
      const response = await assignDataToUser(token, userId, data);
      setMessage(response.message || "Dữ liệu đã được gán thành công.");
    } catch (error) {
      setMessage("Có lỗi xảy ra khi gán dữ liệu.");
    }
  };

  return (
    <div>
      <h1>Gán Dữ Liệu Cho Người Dùng</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dữ liệu"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleAssignData}>Gán Dữ Liệu</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AssignData;