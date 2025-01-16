import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export const useAuth = () => {
  const [error, setError] = useState(""); 

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

  return { error, login, register };
};
