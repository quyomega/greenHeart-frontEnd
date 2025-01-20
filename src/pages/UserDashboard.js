import React, { useState } from "react";
import "../assets/css/UserDashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import ActivityList from "../components/ActivityList";
import Leaderboard from "../components/Leaderboard";
import ActivityTypes from "../components/ActivityTypes";
import ProgressLevel from "../components/ProgressLevel";
import DashboardItem from "../components/DashboardItem";
import ActivityRecordModal from "../components/ActivityRecordModal";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);
function UserDashboard() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  const [filter] = useState("system");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const token = localStorage.getItem("token");
  const {
    userData,
    activities,
    leaderboard,
    activityTypes,
    levelProgress,
    dateList,
    handleRecordActivity,
  } = useUserData(token, filter);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const toggleLogoutButton = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowLogout(!showLogout);
  };

  const goToUserDetails = () => {
    navigate("/user-details");
  };
  const toggleActivityModal = () => {
    setShowActivityModal(!showActivityModal);
  };
  const handleActivityModalSubmit = async (activityData) => {
    try {
      await handleRecordActivity(token, activityData); // Gửi dữ liệu đã qua kiểm tra
      setShowActivityModal(false); // Đóng modal
      alert("Ghi nhận hoạt động thành công!");
    } catch (error) {
      console.error("Lỗi khi ghi nhận hoạt động:", error);
      alert("Lỗi khi ghi nhận hoạt động. Vui lòng thử lại.");
    }
  };
  
  return (
    <div className="dashboard-container">
      <Header
        toggleLogoutButton={toggleLogoutButton}
        isMenuOpen={isMenuOpen}
        showLogout={showLogout}
        goToUserDetails={goToUserDetails}
        handleLogout={handleLogout}
      />
      <div className="dashboard-content">
        <aside
          className={`dashboard-sidebar ${isMenuCollapsed ? "collapsed" : ""}`}
          style={{
            backgroundColor: "#f9f9f9",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            padding: "3px",
            fontSize: "14px",
            borderRadius: "8px",
          }}
        >
          <button
            className="menu-toggle-btn"
            onClick={toggleMenu}
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "#198363",
              padding: "3px",
            }}
          >
            {isMenuCollapsed ? ">" : "<"}
          </button>
          <ul
            className={isMenuCollapsed ? "collapsed" : ""}
            style={{ listStyleType: "none", padding: "0", margin: "0" }}
          >
            <li
              style={{
                padding: "3px 8px",
                borderBottom: "1px solid #ddd",
                borderRadius: "4px",
                marginBottom: "3px",
              }}
            >
              Trang chủ
            </li>
            <li
              style={{
                padding: "3px 8px",
                borderBottom: "1px solid #ddd",
                borderRadius: "4px",
                marginBottom: "3px",
              }}
            >
              Hoạt động
            </li>
            <li
              style={{
                padding: "3px 8px",
                borderBottom: "1px solid #ddd",
                borderRadius: "4px",
                marginBottom: "3px",
              }}
            >
              Thông báo
            </li>
            <li style={{ padding: "3px 8px", borderRadius: "4px" }}>Hỗ trợ</li>
          </ul>
        </aside>
        <main className="dashboard-main">
          {userData ? (
            <div>
              {/* row 1 */}
              <div className="row row-1">
                <div className="col-7">
                  <UserProfile userData={userData} />
                </div>
                <div className="col-5">
                  <ActivityList
                    dateList={dateList}
                    selectedDate={selectedDate}
                    activities={activities}
                    onDateSelect={setSelectedDate}
                  />
                </div>
              </div>
              {/* row 2 */}
              <div className="row row-2">
                <DashboardItem
                  label="Tổ chức"
                  iconClass="bi-building organization-icon"
                  path="/organizations"
                />
                <DashboardItem
                  label="Huy hiệu"
                  iconClass="bi-award-fill badge-icon"
                  path="/badge"
                />
                <DashboardItem
                  label="Danh hiệu"
                  iconClass="bi-file-earmark-text titles-icon"
                  path="/titles"
                />
                <DashboardItem
                  label="Nhiệm vụ"
                  iconClass="bi-ui-checks mission-icon"
                  path="/mission"
                />
                <DashboardItem
                  label="Quà tặng"
                  iconClass="bi-gift gift-icon"
                  path="/gift"
                />
                <DashboardItem
                  label="Cửa hàng"
                  iconClass="bi-shop shop-icon"
                  path="/shop"
                />
              </div>
              {/* row 3 */}
              <div className="row row-3">
                <div className="col-5">
                  {userData && leaderboard.length > 0 ? (
                    <Leaderboard
                      leaderboard={leaderboard}
                      userData={userData}
                    />
                  ) : (
                    <p>Đang tải dữ liệu...</p>
                  )}
                </div>
                <div className="col-4">
                  <ActivityTypes activityTypes={activityTypes} />
                </div>
                <div className="col-3">
                  <ProgressLevel levelProgress={levelProgress} />
                </div>
              </div>
            </div>
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </main>
        <div className="activity-record" onClick={toggleActivityModal}>
          <i className="bi bi-heart-fill green-heart"></i>
        </div>
      </div>
      {/* Bảng chọn ghi nhận hoạt động xanh */}
      <ActivityRecordModal
        userData={userData}
        activityTypes={activityTypes}
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        onSubmit={handleActivityModalSubmit}
      />
    </div>
  );
}
export default UserDashboard;
