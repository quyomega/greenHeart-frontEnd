import { useState, useEffect } from "react";
import {
  fetchUserDailyMissions,
  completeMission,
} from "../services/missionService";

const useMissions = () => {
  const [missions, setMissions] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetchUserDailyMissions(token);
      setMissions(data.dailyMissions || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhiệm vụ:", error);
      setError(error.message);
    }
  };
  const handleCompleteMission = async (missionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!userId) throw new Error("Không tìm thấy thông tin tài khoản.");
      await completeMission(token, userId, missionId);
      fetchMissions();
    } catch (error) {
      console.error("Lỗi khi hoàn thành nhiệm vụ:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMissions();
    const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin tài khoản từ localStorage
    if (user?.id) setUserId(user.id); // Đặt userId nếu tồn tại
    else console.error("Không tìm thấy thông tin tài khoản trong localStorage");
  }, []);

  return { missions, error, handleCompleteMission };
};

export default useMissions;
