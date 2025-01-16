import axios from "axios";
import { API_BASE_URL } from "../constants";

// API gọi thông tin người dùng
export const fetchUserData = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// API gọi danh sách hoạt động
export const fetchActivities = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/activities`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// API gọi bảng xếp hạng
export const fetchLeaderboard = async (token, filter) => {
  const response = await axios.get(
    `${API_BASE_URL}/activities/leaderboard?filter=${filter}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.leaderboard;
};

// API gọi danh sách loại hoạt động
export const fetchActivityTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/activitytype/get-list`);
  return response.data.data || [];
};
