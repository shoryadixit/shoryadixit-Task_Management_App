import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";
import { GoDotFill } from "react-icons/go";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const CompletionRateChart = ({ tasks }) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    const creationDate = format(new Date(task.createdAt), "yyyy-MM-dd");

    if (!acc[creationDate]) {
      acc[creationDate] = [];
    }
    acc[creationDate].push(task);
    return acc;
  }, {});

  const labels = Object.keys(groupedTasks).sort();
  const completionRates = labels.map((date) => {
    const tasksForDay = groupedTasks[date];
    const completedTasks = tasksForDay.filter(
      (task) => task.status === "Completed"
    ).length;
    const totalTasks = tasksForDay.length;
    return totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Completion Rate (%)",
        data: completionRates,
        fill: false,
        borderColor: "#4BC0C0",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
    layout: {
      padding: {
        top: 0,
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="flex flex-col h-fit w-full gap-5 mx-auto">
      <h2 className="flex items-center gap-2 text-lg font-bold border-b w-fit">
        <GoDotFill size={"12px"} /> Task Completion Rate
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CompletionRateChart;