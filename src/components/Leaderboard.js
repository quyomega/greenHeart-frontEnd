import React from "react";

function Leaderboard({ leaderboard, userData }) {

  const currentUserIndex = leaderboard.findIndex(
    (user) => user._id === userData.id
  );

  return (
    <div className="ranking">
      <p>
        <b>Bảng xếp hạng</b>
      </p>
      {leaderboard.length > 0 ? (
        <>
          {currentUserIndex !== -1 && (
            <p>
              <b>
                Thứ hạng của bạn: {currentUserIndex + 1}
                {/* {leaderboard[currentUserIndex].name} -{" "}
                {leaderboard[currentUserIndex].totalPoints} điểm */}
              </b>
            </p>
          )}
          <div className="ranking-list">
            <ul>
              {leaderboard.map((user, index) => (
                <li
                  key={user._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {index + 1}. {user.name}
                  </span>
                  <span>{user.totalPoints} điểm</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Chưa có dữ liệu xếp hạng.</p>
      )}
    </div>
  );
}

export default Leaderboard;
