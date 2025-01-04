import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/OrganizationDetails.css";

function OrganizationDetails() {
  const { orgId } = useParams(); // Lấy ID tổ chức từ URL
  const [organization, setOrganization] = useState(null);
  const [memberCode, setMemberCode] = useState(""); // State để lưu mã thành viên nhập vào
  const [error, setError] = useState(""); // State để lưu thông báo lỗi
  const [successMessage, setSuccessMessage] = useState(""); // State để lưu thông báo thành công
  const [deleteError, setDeleteError] = useState(""); // State để lưu thông báo lỗi khi xóa thành viên
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(""); // State để lưu thông báo thành công khi xóa thành viên

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/organizations/${orgId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrganization(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết tổ chức:", error);
        alert("Không thể tải thông tin tổ chức. Vui lòng thử lại.");
      }
    };

    fetchOrganizationDetails();
  }, [orgId]);

  // Hàm xử lý thêm thành viên vào tổ chức
  const handleAddMember = async () => {
    if (!memberCode) {
      setError("Vui lòng nhập mã thành viên.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/organizations/add-user",
        {
          organizationId: orgId,
          userId: memberCode, // Mã thành viên (được nhập vào từ người dùng)
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Thêm thành viên thành công!");
      setMemberCode(""); // Reset mã thành viên sau khi thêm thành công
    } catch (error) {
      console.error("Lỗi khi thêm thành viên:", error);
      setError("Không thể thêm thành viên. Vui lòng thử lại.");
    }
  };

  // Hàm xử lý xóa thành viên khỏi tổ chức
  const handleRemoveMember = async (memberId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/organizations/remove-user",
        {
          organizationId: orgId,
          userId: memberId, // ID của thành viên cần xóa
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDeleteSuccessMessage("Đã xóa thành viên khỏi tổ chức!");

      // Cập nhật lại danh sách thành viên sau khi xóa
      const updatedOrganization = { ...organization };
      updatedOrganization.members = updatedOrganization.members.filter(
        (member) => member._id !== memberId
      );
      setOrganization(updatedOrganization);
    } catch (error) {
      console.error("Lỗi khi xóa thành viên:", error);
      setDeleteError("Không thể xóa thành viên. Vui lòng thử lại.");
    }
  };

  return (
    <div>
      {organization ? (
        <div className="organization-details-container">
        <div className="organization-header">
          <h1 className="organization-name">{organization.name}</h1>
          <p className="organization-description">{organization.description}</p>
        </div>
      
        <div className="member-list-section">
          <h3>Danh sách thành viên</h3>
          <table className="member-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Điểm</th>
                <th>Cấp độ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {organization.members.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.address}</td>
                  <td>{member.points}</td>
                  <td>{member.level}</td>
                  <td>
                    <button className="delete-member-button" onClick={() => handleRemoveMember(member._id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
        <div className="add-member-form">
          <h3>Thêm thành viên mới</h3>
          <input
            type="text"
            className="member-input"
            placeholder="Mã thành viên"
            value={memberCode}
            onChange={(e) => setMemberCode(e.target.value)}
          />
          <button className="add-member-button" onClick={handleAddMember}>
            Thêm thành viên
          </button>
      
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {deleteError && <p className="error-message">{deleteError}</p>}
          {deleteSuccessMessage && <p className="success-message">{deleteSuccessMessage}</p>}
        </div>
      </div>
      ) : (
        <p>Đang tải thông tin tổ chức...</p>
      )}
    </div>
  );
}

export default OrganizationDetails;
