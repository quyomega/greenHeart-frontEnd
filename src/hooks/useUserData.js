import { useState, useEffect } from "react";
import {
  fetchUserData,
  fetchActivities,
  fetchLeaderboard,
  fetchActivityTypes,
} from "../services/userService";

const useUserData = (token, filter) => {
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [levelProgress, setLevelProgress] = useState(0);
  const [dateList, setDateList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!token) {
          throw new Error("Token không hợp lệ.");
        }

        // Lấy dữ liệu người dùng
        const user = await fetchUserData(token);
        setUserData(user);
        //lấy token
        // console.log(token);
        // Tính toán tiến độ cấp độ
        const nextLevelPoints = (user.level + 1) * 100 - user.totalPoints;
        setLevelProgress(100 - nextLevelPoints);

        // Lấy danh sách hoạt động
        const activitiesData = await fetchActivities(token);
        setActivities(activitiesData);

        // Lấy danh sách ngày duy nhất từ hoạt động
        const uniqueDates = [
          ...new Set(
            activitiesData.map((activity) =>
              new Date(activity.date).toLocaleDateString()
            )
          ),
        ];
        setDateList(uniqueDates);

        // Lấy bảng xếp hạng
        const leaderboardData = await fetchLeaderboard(token, filter);
        setLeaderboard(leaderboardData);

        // Lấy danh sách loại hoạt động
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
    activities,
    leaderboard,
    activityTypes,
    levelProgress,
    dateList,
    error,
  };
};

export default useUserData;
