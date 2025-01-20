import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/DashboardItem.css";

function DashboardItem({ label, iconClass, path }) {
  const navigate = useNavigate();

  return (
    <div className="col-2">
      <div
        className="row2 block"
        onClick={() => navigate(path)}
        style={{ cursor: "pointer" }}
      >
        <p>
          <b>{label}</b>
        </p>
        <i className={`bi ${iconClass}`}></i>
      </div>
    </div>
  );
}

export default DashboardItem;
