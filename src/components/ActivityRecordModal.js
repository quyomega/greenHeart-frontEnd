import React from "react";
import "../assets/css/ActivityRecordModal.css";

const ActivityRecordModal = ({
  isOpen,
  onClose,
  onSubmit,
  userData,
  activityTypes,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn sự kiện gửi form mặc định
    if (!userData?.id) {
      alert("Không tìm thấy thông tin người dùng!");
      return;
    }
    const activityData = {
      userId: userData.id, // Truyền userId
      type: e.target.elements.activityType.value, // Loại hoạt động
    };
    console.log("Dữ liệu ghi nhận:", activityData); // Kiểm tra dữ liệu
    onSubmit(activityData); // Gửi dữ liệu hợp lệ
  };

  return (
    <div className="activity-modal">
      <div className="modal-content">
        <h2>Ghi nhận hoạt động xanh</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Loại hoạt động :
            <select name="activityType">
              {activityTypes?.length > 0 ? (
                activityTypes.map((activityType, index) => (
                  <option key={activityType._id} value={activityType.type}>
                    {activityType.type}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Không có dữ liệu
                </option>
              )}
            </select>
          </label>
          <button type="submit" >
            Ghi nhận
          </button>
          <button type="button" onClick={onClose}>
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivityRecordModal;
