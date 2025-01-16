import React, { useState } from "react";
import "../assets/css/UserDashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import UserProfile from "../components/UserProfile";
import ActivityList from "../components/ActivityList";
import Leaderboard from "../components/Leaderboard";
import ActivityTypes from "../components/ActivityTypes";
import ProgressLevel from "../components/ProgressLevel";
import DashboardItem from "../components/DashboardItem";
import useUserData from "../hooks/useUserData";
ChartJS.register(ArcElement, Tooltip, Legend);
function UserDashboard() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  const [filter] = useState("system");

  const token = localStorage.getItem("token");
  const {
    userData,
    activities,
    leaderboard,
    activityTypes,
    levelProgress,
    dateList,
  } = useUserData(token, filter);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>UserDashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </header>
      <div className="dashboard-content">
        <aside
          className={`dashboard-sidebar ${isMenuCollapsed ? "collapsed" : ""}`}
        >
          <button className="menu-toggle-btn" onClick={toggleMenu}>
            {isMenuCollapsed ? ">" : "<"}
          </button>
          <ul className={isMenuCollapsed ? "collapsed" : ""}>
            <li>Trang chủ</li>
            <li>Hoạt động</li>
            <li>Thông báo</li>
            <li>Hỗ trợ</li>
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
                  label="Huy chương"
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
      </div>
    </div>
  );
}
export default UserDashboard;