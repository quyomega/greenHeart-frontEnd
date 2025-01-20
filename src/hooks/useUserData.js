import { useState, useEffect } from "react";
import {
  fetchUserData,
  fetchActivities,
  fetchLeaderboard,
  fetchActivityTypes,
  getAllUser,
  recordActivity,
} from "../services/userService";

const useUserData = (token, filter) => {
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [levelProgress, setLevelProgress] = useState(0);
  const [dateList, setDateList] = useState([]);
  const [error, setError] = useState(null);

  const handleRecordActivity = async (token, activityData) => {
    try {
      const result = await recordActivity(token, activityData);
      // Sau khi ghi nhận thành công, cập nhật lại danh sách hoạt động và điểm người dùng
      const updatedActivities = await fetchActivities(token);
      setActivities(updatedActivities);

      const updatedUser = await fetchUserData(token);
      setUserData(updatedUser);

      console.log("Hoạt động ghi nhận thành công:", result);
      return result;
    } catch (error) {
      console.error("Ghi nhận hoạt động thất bại:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!token) {
          throw new Error("Token không hợp lệ.");
        }

        const user = await fetchUserData(token);
        setUserData(user);

        const users = await getAllUser(token);
        setAllUsers(users);

        const nextLevelPoints = (user.level + 1) * 100 - user.totalPoints;
        setLevelProgress(100 - nextLevelPoints);

        const activitiesData = await fetchActivities(token);
        setActivities(activitiesData);

        const uniqueDates = [
          ...new Set(
            activitiesData.map((activity) =>
              new Date(activity.date).toLocaleDateString()
            )
          ),
        ];
        setDateList(uniqueDates);

        const leaderboardData = await fetchLeaderboard(token, filter);
        setLeaderboard(leaderboardData);

        const activityTypesData = await fetchActivityTypes();
        setActivityTypes(activityTypesData);

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError(error.message || "Đã xảy ra lỗi khi tải dữ liệu.");
      }
    };
    loadData();
  }, [token, filter]);

  return {
    userData,
    allUsers,
    activities,
    leaderboard,
    activityTypes,
    levelProgress,
    dateList,
    error,
    handleRecordActivity, 
  };
};

export default useUserData;
