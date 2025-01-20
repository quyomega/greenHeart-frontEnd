import React from "react";
import "../assets/css/ActivityTypes.css";

function ActivityTypes({ activityTypes }) {
  return (
    <div className="listActicityType">
      <p>
        <b>Phụ lục tra cứu điểm</b>
      </p>
      <div className="listActicityTypeTable">
        <ul>
          {activityTypes.map((activityType, index) => (
            <li
              key={activityType._id}
              className={`activityTypeRow ${index % 2 === 0 ? "even" : "odd"}`}
            >
              <span>{activityType.type}</span>
              <span>{activityType.points} điểm</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ActivityTypes;
