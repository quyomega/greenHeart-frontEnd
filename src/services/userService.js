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

// API gọi danh sách tất cả người dùng
export const getAllUser = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/allprofile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.users;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu tất cả người dùng:", error);
    throw error;
  }
};
// API gọi danh sách loại hoạt động
export const fetchActivityTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/activitytype/get-list`);
  return response.data.data || [];
};
// API ghi nhận hoạt động xanh
export const recordActivity = async (token, activityData) => {
  try {
    const response = axios.post(
      `${API_BASE_URL}/activities/record`,
      activityData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi ghi nhận hoạt động:", error);
    throw error;
  }
};
