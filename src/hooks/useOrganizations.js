import { useState, useEffect } from "react";
import axios from "axios";

const useOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchUserOrganizations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/organizations/my-organizations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrganizations(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tổ chức:", error);
      setError("Không thể tải danh sách tổ chức. Vui lòng thử lại.");
    }
  };

  const createOrganization = async (newOrganizationName, newOrganizationDescription) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/organizations/create",
        {
          name: newOrganizationName,
          description: newOrganizationDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Tạo tổ chức thành công!");
      fetchUserOrganizations(); // Tải lại danh sách tổ chức sau khi tạo mới
    } catch (error) {
      console.error("Lỗi khi tạo tổ chức:", error);
      setError("Không thể tạo tổ chức. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    fetchUserOrganizations();
  }, []);

  return { organizations, error, successMessage, createOrganization };
};

export default useOrganizations;
