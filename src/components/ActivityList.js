import React from "react";

function ActivityList({
  dateList,
  selectedDate,
  activities,
  onDateSelect,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatSelectedDate = (dateString) => {
    if (!dateString) return ''; // Kiểm tra nếu dateString là null hoặc undefined
    const [day, month, year] = dateString.split('/');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  };

  const formattedSelectedDate = formatSelectedDate(selectedDate);

  const activitiesForSelectedDate = selectedDate 
    ? activities.filter(activity => {
        const activityDate = formatDate(activity.date);
        console.log("Comparing", activityDate, "with", formattedSelectedDate); // Debugging line
        return activityDate === formattedSelectedDate;
      })
    : [];
  const totalPointSelectedDate = activitiesForSelectedDate.reduce((sum, activity) => sum + activity.points, 0);
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
            Tổng điểm xanh của ngày {formattedSelectedDate} là: {totalPointSelectedDate} điểm
          </p>
          <ul>
            {activitiesForSelectedDate.length > 0 ? (
              activitiesForSelectedDate.map((activity) => (
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
