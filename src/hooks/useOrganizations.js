import { useState, useEffect } from "react";
import { fetchUserOrganizations, createOrganization } from "../services/organizationService";

const useOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Gọi API lấy danh sách tổ chức
  const fetchOrganizations = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetchUserOrganizations(token); // Sử dụng organizationService
      setOrganizations(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tổ chức:", error);
      setError(error.message);
    }
  };

  // Gọi API tạo tổ chức
  const createNewOrganization = async (newOrganizationName, newOrganizationDescription) => {
    try {
      const token = localStorage.getItem("token");
      await createOrganization(token, newOrganizationName, newOrganizationDescription); // Đổi thành createOrganization
      setSuccessMessage("Tạo tổ chức thành công!");
      
      // Dừng gọi fetchOrganizations nếu đang ở trạng thái tạo tổ chức mới
      setTimeout(async () => {
        await fetchOrganizations(); // Tải lại danh sách tổ chức sau khi tạo
      }, 500); // Delay nhỏ để tránh vòng lặp đệ quy
    } catch (error) {
      console.error("Lỗi khi tạo tổ chức:", error);
      setError(error.message);
    }
  };

  // Lấy danh sách tổ chức khi component được mount
  useEffect(() => {
    fetchOrganizations();
  }, []);

  return { organizations, error, successMessage, createNewOrganization }; // Trả về hàm createOrganization
};

export default useOrganizations;
