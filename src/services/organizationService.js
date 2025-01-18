import axios from "axios";
import { API_BASE_URL } from "../constants";

const fetchUserOrganizations = async (token) => {
  try {
    // lay danh sach tổ chức của user
    const response = await axios.get(
      `${API_BASE_URL}/organizations/my-organizations`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Không thể tải danh sách tổ chức.");
  }
};
// tạo tổ chức mới
const createOrganization = async (token, newOrganizationName, newOrganizationDescription) => {
  try {
    await axios.post(
      `${API_BASE_URL}/organizations/create`,
      {
        name: newOrganizationName,
        description: newOrganizationDescription,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    throw new Error("Không thể tạo tổ chức.");
  }
};

export { fetchUserOrganizations, createOrganization };
