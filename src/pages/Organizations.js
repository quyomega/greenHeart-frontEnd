import React, { useState } from "react";
import { Link } from "react-router-dom";  
import useOrganizations from "../hooks/useOrganizations";  

import "../assets/css/Organizations.css";

function Organizations() {
  const { organizations, error, successMessage, createOrganization } = useOrganizations();
  const [newOrganizationName, setNewOrganizationName] = useState("");
  const [newOrganizationDescription, setNewOrganizationDescription] = useState("");

  const handleCreateOrganization = () => {
    createOrganization(newOrganizationName, newOrganizationDescription);
  };
  return (
    <div className="organizations-container">
      <h1>Tổ chức của bạn</h1>
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
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default Organizations;
