import React from "react";

function ActivityList({
  dateList,
  selectedDate,
  totalPoints,
  activities,
  onDateSelect,
}) {
  return (
    <div className="userAction">
      
      <select onChange={(e) => onDateSelect(e.target.value)} defaultValue="">
        <option value="" disabled>
          Chọn ngày
        </option>
        {dateList.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
      {selectedDate && (
        <>
          <p>
            Tổng điểm xanh của ngày {selectedDate} là: {totalPoints} điểm
          </p>
          <ul>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <li
                  key={activity._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{activity.type}</span>
                  <span>{activity.points} điểm</span>
                </li>
              ))
            ) : (
              <p>Chưa có hoạt động nào cho ngày này.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default ActivityList;
