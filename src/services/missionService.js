// src/services/missionService.js
import axios from "axios";
import { API_BASE_URL } from "../constants";

// Lấy danh sách nhiệm vụ người dùng
const fetchUserDailyMissions = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/missions/daily-missions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Không thể tải danh sách nhiệm vụ.");
  }
};

// Hoàn thành nhiệm vụ
const completeMission = async (token, userId, missionId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/missions/complete`,
      { userId, missionId }, 
      {
        headers: { Authorization: `Bearer ${token}` }, 
      }
    );
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Không thể hoàn thành nhiệm vụ."
    );
  }
};


export { fetchUserDailyMissions, completeMission };
