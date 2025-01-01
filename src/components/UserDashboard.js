import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate để điều hướng
import axios from "axios";
import "../assets/css/UserDashboard.css";

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateList, setDateList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
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
        console.log(token);
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

    fetchUserData();
    fetchActivities();
  }, []);

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
                      <div className="col-5">
                        <p>Tên : {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Số điện thoại: {userData.phone}</p>
                        <p>Địa chỉ: {userData.address}</p>
                      </div>
                      <div className="col-4">
                        <p>Tổng điểm: {userData.points}</p>
                        <p>Cấp độ: {userData.level}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="userAction">
                    <p>
                      <b>Hành động xanh</b>
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
              <div className="row row-2">
                <div className="col-3">
                  <div className="userInfo">
                    <p>Khối 1</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="userInfo">
                    <p>Khối 2</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="userInfo">
                    <p>Khối 3</p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="userInfo">
                    <p>Khối 4</p>
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
