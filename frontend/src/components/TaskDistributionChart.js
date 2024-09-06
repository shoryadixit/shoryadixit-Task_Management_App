import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { GoDotFill } from "react-icons/go";

Chart.register(ArcElement, Tooltip, Legend);

const TaskDistributionChart = ({ tasks }) => {
  const highPriority = tasks.filter((task) => task.priority === "High").length;
  const mediumPriority = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;
  const lowPriority = tasks.filter((task) => task.priority === "Low").length;

  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [highPriority, mediumPriority, lowPriority],
        backgroundColor: ["red", "#FFCE56", "#36A2EB"],
        hoverBackgroundColor: ["red", "#FFCE56", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold border-b w-fit flex items-center gap-2">
        <GoDotFill size={"12px"} />
        Task Distribution by Priority
      </h2>
      <Pie data={data} />
    </div>
  );
};

export default TaskDistributionChart;
