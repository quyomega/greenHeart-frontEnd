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
      await createOrganization(token, newOrganizationName, newOrganizationDescription); // Sử dụng organizationService
      setSuccessMessage("Tạo tổ chức thành công!");
      await fetchOrganizations(); // Cập nhật danh sách tổ chức
    } catch (error) {
      console.error("Lỗi khi tạo tổ chức:", error);
      setError(error.message);
    }
  };

  // Lấy danh sách tổ chức khi component được mount
  useEffect(() => {
    fetchOrganizations();
  }, []);

  return { organizations, error, successMessage, createNewOrganization };
};

export default useOrganizations;
