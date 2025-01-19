import { getAllUser, createSampleMissions, assignDataToUser } from "../services/adminService";
import { useState, useEffect } from "react";

const useAdminData = (token) => {
  const [allUsers, setAllUsers] = useState([]);
  const [newTask, setNewTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assignedData, setAssignedData] = useState(null);


  //lấy dữ liệu người dùng
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

  //tạo nhiệm vụ từ nhiệm vụ mẫu
  useEffect(() => {
    const createTask = async () => {
      try {
        if (!token) {
          throw new Error("Token không hợp lệ.");
        }
        setLoading(true);
        const users = await getAllUser(token);
        const createTaskData = await createSampleMissions(token);
        setNewTask(createTaskData);
      } catch (error) {
        console.error("Lỗi khi tạo nhiệm vụ mẫu:", error);
        setError(error.message || "Đã xảy ra lỗi khi tạo nhiệm vụ mẫu.");
      }
    };
    createTask();
  }, [token]);
  //gắn nhiệm vụ cho người dùng
  // useEffect(() => {
  //   const assignData = async () => {
  //     try {
  //       if (!token) {
  //         throw new Error("Token không hợp lệ.");
  //       }
  //       const assignData = await assignDataToUser(token);
  //       setAssignedData(assignData);
  //     } catch (error) {
  //       // Đảm bảo error luôn có thuộc tính message
  //       const errorMessage = error?.message || "Đã xảy ra lỗi khi tải dữ liệu.";
  //       setError(errorMessage);
  //     } finally {
  //       setLoading(false);
  //       // Đảm bảo error luôn có thuộc tính message
  //       const errorMessage = error?.message || "Đã xảy ra lỗi khi gắn nhiệm vụ cho người dùng.";
  //       setError(errorMessage);
  //     }
  //   };
  //   assignData();
  // }, [token]);

  return { allUsers, error, loading, newTask, assignedData };
};

export default useAdminData;