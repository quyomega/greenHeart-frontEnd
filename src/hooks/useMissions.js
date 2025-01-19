// src/hooks/useMissions.js
import { useState, useEffect } from "react";
import { fetchUserDailyMissions } from "../services/missionService";

const useMissions = () => {
  const [missions, setMissions] = useState([]);
  const [error, setError] = useState("");

  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const data = await fetchUserDailyMissions(token); 
      console.log(data); // Kiểm tra dữ liệu trả về
      setMissions(data.dailyMissions || []); // Gán mảng dailyMissions vào state
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhiệm vụ:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return { missions, error };
};

export default useMissions;
