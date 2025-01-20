import React from "react";
import { Doughnut } from "react-chartjs-2";
import "../assets/css/ProgressLevel.css";

function ProgressLevel({ levelProgress }) {
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [levelProgress, 100 - levelProgress],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="progressLevel">
      <p><b>Tiến độ tăng cấp</b></p>
      <Doughnut data={chartData} className="doughnut-chart" />
    </div>
  );
}

export default ProgressLevel;
