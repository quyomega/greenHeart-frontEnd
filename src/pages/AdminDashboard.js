import React, { useState } from "react";
import "../assets/css/AdminDashboard.css";
import Header from "../components/Header";
import ManagementUser from "./ManagementUser";
import useUserData from "../hooks/useUserData";

import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const token = localStorage.getItem("token"); 
  const { allUsers } = useUserData(token);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [activeContent, setActiveContent] = useState("default");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const goToUserDetails = () => {
    navigate("/user-details");
  };

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const toggleLogoutButton = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowLogout(!showLogout);
  };

  const menuItems = [
    {
      label: "Quản lý người dùng",
      path: "users",
      icon: "bi-person-circle",
      component: <ManagementUser token={token} allUsers={allUsers} />,
    },
    {
      label: "Quản lý tổ chức",
      path: "organizations",
      icon: "bi-building",
      component: <p>Đây là giao diện quản lý tổ chức.</p>,
    },
    {
      label: "Quản lý huy hiệu",
      path: "organizations",
      icon: "bi-award-fill",
      component: <p>Đây là giao diện quản lý huy hiệu.</p>,
    },
    {
      label: "Quản lý danh hiệu",
      icon: "bi-file-earmark-text",
      component: <p>Đây là giao diện quản lý danh hiệu.</p>,
    },
    {
      label: "Quản lý nhiệm vụ",
      icon: "bi-ui-checks",
      component: <p>Đây là giao diện quản lý nhiệm vụ.</p>,
    },
    {
      label: "Quản lý quà tặng",
      icon: "bi-gift ",
      component: <p>Đây là giao diện quản lý quà tặng.</p>,
    },
    {
      label: "Quản lý cửa hàng",
      icon: "bi-shop ",
      component: <p>Đây là giao diện quản lý cửa hàng.</p>,
    },
  ];

  const handleMenuClick = (path) => {
    setActiveContent(path);
  };

  return (
    <div className="admin-dashboard-container">
      <Header
        toggleLogoutButton={toggleLogoutButton}
        isMenuOpen={isMenuOpen}
        showLogout={showLogout}
        goToUserDetails={goToUserDetails}
        handleLogout={handleLogout}
      />
      <div className="admin-dashboard-content">
        <aside
          className={`admin-sidebar ${isMenuCollapsed ? "collapsed" : ""}`}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <button
            className="menu-toggle-btn"
            onClick={toggleMenu}
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "#198363",
              padding: "10px",
            }}
          >
            {isMenuCollapsed ? ">" : "<"}
          </button>
          <ul
            className="menu-items"
            style={{ listStyleType: "none", padding: "0", margin: "0" }}
          >
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="menu-item"
                onClick={() => handleMenuClick(item.path)}
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <i
                  className={`bi ${item.icon} menu-icon`}
                  style={{ marginRight: isMenuCollapsed ? "0" : "10px" }}
                ></i>
                {!isMenuCollapsed && <span>{item.label}</span>}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main">
          {activeContent === "default" ? (
            <div>
              <h2>Chào mừng đến với trang quản lý của Green Heart</h2>
              <p>Chọn mục cần quản lý từ menu bên trái.</p>
            </div>
          ) : (
            menuItems.find((item) => item.path === activeContent)?.component
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
