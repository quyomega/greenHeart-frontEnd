import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/UserDetails.css"; 
import { API_BASE_URL } from "../constants";

function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [isSaving, setIsSaving] = useState(false); 
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_BASE_URL}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserDetails(response.data);
        setAvatar(response.data.avatar || "");
      } catch (error) {
        console.error("Lỗi khi tải thông tin chi tiết:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const [avatarFile, setAvatarFile] = useState(null); 
  const handleAvatarClick = () => {
    document.getElementById("avatar-input").click(); 
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file); 
      setAvatar(URL.createObjectURL(file)); 
    }
  };

  const handleSave = async () => {
    if (!userDetails) return;

    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("phone", userDetails.phone || "");
    formData.append("address", userDetails.address || "");
    if (avatarFile) {
      formData.append("avatar", avatarFile); // Gửi file ảnh nếu có
      formData.append("removeOldAvatar", true);
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/users/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserDetails(response.data.user); // Cập nhật lại thông tin từ server
      if (response.data.user.avatar) {
        setAvatar(response.data.user.avatar); // Hiển thị avatar mới
      }

      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="user-details-container">
      <h1 className="user-details-header">Thông tin cá nhân</h1>
      {userDetails ? (
        <div className="user-details-form">
          <div className="avatar-section">
            <div className="avatar-container">
              {avatar ? (
                <img
                  src={avatar} 
                  alt="Avatar"
                  className="avatar"
                  onClick={handleAvatarClick} 
                />
              ) : (
                <p>Chưa có ảnh đại diện</p>
              )}
              <input
                type="file"
                id="avatar-input"
                accept="image/*"
                onChange={handleAvatarChange}
                className="avatar-input"
                style={{ display: "none" }} 
              />
            </div>
          </div>

          <div className="input-section">
            <label className="input-label">
              Tên:
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label className="input-label">
              Email:
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label className="input-label">
              Số điện thoại:
              <input
                type="text"
                name="phone"
                value={userDetails.phone || ""}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label className="input-label">
              Địa chỉ:
              <textarea
                name="address"
                value={userDetails.address || ""}
                onChange={handleInputChange}
                className="input-field textarea"
              ></textarea>
            </label>
          </div>

          <div className="save-button-container">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="save-button"
            >
              {isSaving ? "Đang lưu..." : "Lưu thông tin"}
            </button>
          </div>
        </div>
      ) : (
        <p>Đang tải thông tin...</p>
      )}
    </div>
  );
}

export default UserDetails;
