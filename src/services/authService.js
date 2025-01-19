import axios from "axios";
import { API_BASE_URL } from "../constants";

// đăng nhập
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng nhập không thành công");
  }
};

// đăng ký
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng ký không thành công");
  }
};
