import axios from "axios";
import { API_BASE_URL } from "../constants";


//lấy dữ liệu người dùng
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
  
//tạo nhiệm vụ từ nhưng nhiêm vụ mẫu
const createSampleMissions = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/missions/create-sample`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi tạo nhiệm vụ mẫu:", error);
    throw error;
  }
};

//gắn dữ liệu cho người dùng bằng nhiệm vụ mẫu

const assignDataToUser = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/missions/assign-daily`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Phản hồi từ API:", response.data); // Kiểm tra phản hồi từ API
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi gắn dữ liệu cho người dùng:", error);
    throw error;
  }
};

export { getAllUser, createSampleMissions, assignDataToUser };