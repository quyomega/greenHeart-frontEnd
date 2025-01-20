import React from "react";
import useMissions from "../hooks/useMissions";
import "../assets/css/Mission.css";

function Mission() {
  const { missions, error, handleCompleteMission } = useMissions();

  return (
    <div className="mission-container">
      <h1>Các Nhiệm Vụ Của Bạn</h1>
      {error && <p className="error">{error}</p>}
      {missions && missions.length > 0 ? (
        <table className="mission-table">
          <thead>
            <tr>
              <th>Tên Nhiệm Vụ</th>
              <th>Mô Tả</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission._id}>
                <td>{mission.missionId.name}</td>
                <td>{mission.missionId.description}</td>
                <td>{mission.status}</td>
                <td>
                  {mission.status === "pending" && (
                    <button
                    onClick={() => {
                      // Log thêm để kiểm tra nút được nhấn
                      // console.log("Button clicked for mission:", mission.missionId._id); 
                      handleCompleteMission(mission.missionId._id);
                    }}
                    className="complete-button"
                  >
                    Hoàn thành
                  </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Chưa có nhiệm vụ nào được giao.</p>
      )}
    </div>
  );
}

export default Mission;
