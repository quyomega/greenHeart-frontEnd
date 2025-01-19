// src/services/missionService.js
import axios from "axios";
import { API_BASE_URL } from "../constants";

// Lấy danh sách nhiệm vụ người dùng
const fetchUserDailyMissions = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/missions/daily-missions`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Không thể tải danh sách nhiệm vụ.");
  }
};

export { fetchUserDailyMissions };
