import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate để điều hướng
import axios from "axios";
import "../assets/css/UserDashboard.css";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateList, setDateList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [levelProgress, setLevelProgress] = useState(0);
  const [filter] = useState("system");
  const navigate = useNavigate(); // Hook điều hướng

  // Gọi API để lấy thông tin người dùng và hoạt động
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
        //lấy token
        console.log(token);
        const nextLevelPoints = (response.data.level + 1) * 100 - (response.data.totalPoints);
        const progress = 100-nextLevelPoints;
        setLevelProgress(progress);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        alert("Không thể tải thông tin. Vui lòng đăng nhập lại.");
      }
    };

    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Vui lòng đăng nhập lại");
          window.location.href = "/login"; // Đưa người dùng quay lại trang đăng nhập
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/api/activities",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(response.data);
        setActivities(response.data);

        // Lấy danh sách ngày duy nhất từ các hoạt động
        const uniqueDates = [
          ...new Set(
            response.data.map((activity) =>
              new Date(activity.date).toLocaleDateString()
            )
          ),
        ];
        setDateList(uniqueDates);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách hoạt động:", error);
      }
    };
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/activities/leaderboard?filter=${filter}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLeaderboard(response.data.leaderboard);
      } catch (error) {
        console.error("Lỗi khi lấy bảng xếp hạng:", error);
      }
    };
    const fetchActivityTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/activitytype/get-list"
        );
        // console.log("Dữ liệu trả về từ API:", response.data);
        setActivityTypes(response.data.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại hành động:", error);
        setActivityTypes([]);
      }
    };

    fetchUserData();
    fetchActivities();
    fetchLeaderboard();
    fetchActivityTypes();
  }, [filter]);

  const chartData = {
    labels: [],
    datasets: [
      {
        data: [levelProgress, 100 - levelProgress],  
        backgroundColor: ["#36A2EB", "#FF6384"],     
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };
  
  // Lọc các hoạt động theo ngày được chọn
  const filterActivitiesByDate = (date) => {
    const filteredActivities = activities.filter((activity) => {
      const activityDate = new Date(activity.date).toLocaleDateString();
      return activityDate === date;
    });

    setTotalPoints(
      filteredActivities.reduce((acc, activity) => acc + activity.points, 0)
    ); // Tính tổng điểm của ngày
    return filteredActivities;
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    const selectedActivities = filterActivitiesByDate(date);
    setActivities(selectedActivities); // Cập nhật lại hoạt động để hiển thị
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const goToUserDetails = () => {
    navigate("/user-details");
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
                  <div className="userInfo">
                    <p>
                      <b>Thông tin tài khoản</b>
                    </p>
                    <div className="row">
                      <div className="col-3">
                        {userData.avatar ? (
                          <img
                            src={userData.avatar}
                            alt="Avatar"
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              marginBottom: "10px",
                            }}
                          />
                        ) : (
                          <p>Chưa có ảnh đại diện</p>
                        )}
                        <p onClick={goToUserDetails} className="details-link">
                          Xem chi tiết
                        </p>
                      </div>
                      <div className="col-6">
                        <p>Mã : {userData.id}</p>
                        <p>Tên : {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Số điện thoại: {userData.phone}</p>
                        <p>Địa chỉ: {userData.address}</p>
                      </div>
                      <div className="col-3">
                        <p>Tổng điểm: {userData.points}</p>
                        <p>Cấp độ: {userData.level}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="userAction">
                    <p>
                      <b>Điểm xanh theo từng ngày</b>
                    </p>
                    <div>
                      {/* Hiển thị danh sách các ngày có hoạt động */}
                      {dateList.length > 0 ? (
                        <select
                          onChange={(e) => handleDateSelection(e.target.value)}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Chọn ngày
                          </option>
                          {dateList.map((date, index) => (
                            <option key={index} value={date}>
                              {date}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>Chưa có hoạt động nào.</p>
                      )}
                      {selectedDate && (
                        <>
                          <p>
                            Tổng điểm xanh của ngày {selectedDate} là :{" "}
                            {totalPoints} điểm
                          </p>
                          <ul>
                            {activities.length > 0 ? (
                              activities.map((activity) => (
                                <li
                                  key={activity._id}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span>{activity.type}</span>
                                  <span>{activity.points} điểm</span>
                                </li>
                              ))
                            ) : (
                              <p>Chưa có hoạt động nào cho ngày này.</p>
                            )}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* row 2 */}
              <div className="row row-2">
                {/* Tổ chức */}
                <div className="col-2">
                  <div
                    className="row2 block"
                    onClick={() => navigate("/organizations")}
                    style={{ cursor: "pointer" }}
                  >
                    <p>
                      <b>Tổ chức</b>
                    </p>
                    <i className="bi bi-building organization-icon"></i>
                  </div>
                </div>

                {/* Huy chương */}
                <div className="col-2">
                  <div
                    className="row2 block"
                    onClick={() => navigate("/badge")}
                    style={{ cursor: "pointer" }}
                  >
                    <p>
                      <b>Huy chương</b>
                    </p>
                    <i className="bi bi-award-fill badge-icon"></i>
                  </div>
                </div>

                {/* Danh hiệu */}
                <div className="col-2">
                  <div
                    className="row2 block"
                    onClick={() => navigate("/titles")}
                    style={{ cursor: "pointer" }}
                  >
                    <p>
                      <b>Danh hiệu</b>
                    </p>
                    <i className="bi bi-file-earmark-text titles-icon"></i>
                  </div>
                </div>

                {/* Nhiệm vụ */}
                <div className="col-2">
                  <div
                    className="row2 block"
                    onClick={() => navigate("/mission")}
                    style={{ cursor: "pointer" }}
                  >
                    <p>
                      <b>Nhiệm vụ</b>
                    </p>
                    <i className="bi bi-ui-checks mission-icon"></i>
                  </div>
                </div>

                {/* Tặng phẩm */}
                <div className="col-2">
                  <div
                    className="row2 block"
                    onClick={() => navigate("/gift")}
                    style={{ cursor: "pointer" }}
                  >
                    <p>
                      <b>Quà tặng</b>
                    </p>
                    <i className="bi bi-gift gift-icon"></i>
                  </div>
                </div>

                {/* Cửa hàng */}
                <div className="col-2">
                  <div
                    className="row2 block"
                    onClick={() => navigate("/shop")}
                    style={{ cursor: "pointer" }}
                  >
                    <p>
                      <b>Cửa hàng</b>
                    </p>
                    <i className="bi bi-shop shop-icon"></i>
                  </div>
                </div>
              </div>

              {/* row 3 */}
              <div className="row row-3">
                <div className="col-5">
                  <div className="ranking">
                    <p>
                      <b>Xếp hạng</b>
                    </p>
                    {/* Hiển thị xếp hạng của người dùng */}
                    {leaderboard.length > 0 ? (
                      <>
                        <p>
                          <b>
                            Thứ hạng của bạn :{" "}
                            {leaderboard.findIndex(
                              (user) => user._id === userData.id
                            ) + 1}
                          </b>
                        </p>
                        <div className="ranking-list">
                          <ul>
                            {leaderboard.map((user, index) => (
                              <li
                                key={user._id}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span>
                                  {index + 1}. {user.name}
                                </span>
                                <span>{user.totalPoints} điểm</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <p>Chưa có dữ liệu xếp hạng.</p>
                    )}
                  </div>
                </div>

                <div className="col-4">
                  <div className="listActicityType">
                    <p>
                      <b>Phụ lục tra cứu điểm</b>
                    </p>
                    <div className="listActicityTypeTable">
                      <ul>
                        {activityTypes?.length > 0 ? (
                          activityTypes.map((activityType, index) => (
                            <li
                              key={activityType._id}
                              className={`activityTypeRow ${
                                index % 2 === 0 ? "even" : "odd"
                              }`}
                            >
                              <span>{activityType.type}</span>
                              <span>{activityType.points} điểm</span>
                            </li>
                          ))
                        ) : (
                          <p>Chưa có dữ liệu.</p>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-3">
                  <div className="progressLevel">
                    <p>
                      <b>Tiến độ tăng cấp</b>
                    </p>
                    <Doughnut data={chartData} className="doughnut-chart"/>
                  </div>
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
