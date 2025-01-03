import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  // Import Link từ react-router-dom
import "../assets/css/Organizations.css";

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [newOrganizationName, setNewOrganizationName] = useState("");
  const [newOrganizationDescription, setNewOrganizationDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchUserOrganizations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/organizations/my-organizations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrganizations(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tổ chức:", error);
      setError("Không thể tải danh sách tổ chức. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    fetchUserOrganizations();
  }, []);

  const handleCreateOrganization = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/organizations/create",
        {
          name: newOrganizationName,
          description: newOrganizationDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Tạo tổ chức thành công!");
      fetchUserOrganizations(); // Tải lại danh sách tổ chức sau khi tạo mới
    } catch (error) {
      console.error("Lỗi khi tạo tổ chức:", error);
      setError("Không thể tạo tổ chức. Vui lòng thử lại.");
    }
  };

  return (
    <div className="organizations-container">
      <h1>Tổ chức của bạn</h1>

      {/* Hiển thị danh sách tổ chức */}
      <div className="organization-list">
        {organizations.length > 0 ? (
          organizations.map((org) => (
            <Link key={org._id} to={`/organizations/${org._id}`} className="organization-card-link">
              <div className="organization-card">
                <p>{org.name}</p>
                <p>{org.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Chưa có tổ chức nào.</p>
        )}
      </div>

      {/* Form tạo tổ chức mới */}
      <div className="create-organization-form">
        <h2>Tạo tổ chức mới</h2>
        <input
          type="text"
          placeholder="Tên tổ chức"
          value={newOrganizationName}
          onChange={(e) => setNewOrganizationName(e.target.value)}
        />
        <textarea
          placeholder="Mô tả tổ chức"
          value={newOrganizationDescription}
          onChange={(e) => setNewOrganizationDescription(e.target.value)}
        ></textarea>
        <button onClick={handleCreateOrganization}>Tạo tổ chức</button>
      </div>

      {/* Hiển thị thông báo lỗi hoặc thành công */}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default Organizations;
