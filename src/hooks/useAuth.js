import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (formData) => {
    setError("");
    try {
      const data = await loginUser(formData);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (formData) => {
    setError("");
    try {
      const data = await registerUser(formData);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleLoginSubmit = async (formData) => {
    try {
      const { token, role, user } = await login(formData);
      if (!token || !role || !user) return;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      // Chuyển hướng đến trang tương ứng với vai trò
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  return { error, login, register, handleLoginSubmit };
};
