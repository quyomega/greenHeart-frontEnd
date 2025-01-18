import { getAllUser } from "../services/adminService";
import { useState, useEffect } from "react";

const useAdminData = (token) => {
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error("Token không hợp lệ.");
        }
        setLoading(true);
        const users = await getAllUser(token);

        if (Array.isArray(users) && users.length > 0) {
          setAllUsers(users); // Cập nhật state với dữ liệu trả về
        } else {
          setError("Dữ liệu trả về không hợp lệ hoặc rỗng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        setError(error.message || "Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { allUsers, error, loading };
};

export default useAdminData;