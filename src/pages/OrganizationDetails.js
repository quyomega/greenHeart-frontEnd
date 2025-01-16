import React from "react";
import { useParams } from "react-router-dom";
import useOrganizationDetails from "../hooks/useOrganizationDetails";  

import "../assets/css/OrganizationDetails.css";

function OrganizationDetails() {
  const { orgId } = useParams();
  const {
    organization,
    memberCode,
    setMemberCode,
    error,
    successMessage,
    deleteError,
    deleteSuccessMessage,
    handleAddMember,
    handleRemoveMember,
  } = useOrganizationDetails(orgId); 

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
