import axios from "axios";
import { API_BASE_URL } from "../constants";

const getAllUser = async (token) => {
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

export { getAllUser };