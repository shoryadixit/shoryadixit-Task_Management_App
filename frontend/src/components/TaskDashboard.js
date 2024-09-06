import { PieChart, Pie, Cell, Tooltip } from "recharts";

const TaskDashboard = ({ tasks }) => {
  const taskDistribution = [
    {
      name: "High",
      value: tasks.filter((task) => task.priority === "High").length,
    },
    {
      name: "Medium",
      value: tasks.filter((task) => task.priority === "Medium").length,
    },
    {
      name: "Low",
      value: tasks.filter((task) => task.priority === "Low").length,
    },
  ];

  const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

  return (
    <div>
      <h1 className="text-2xl font-bold">Task Dashboard</h1>
      <PieChart width={400} height={400}>
        <Pie
          data={taskDistribution}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {taskDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default TaskDashboard;
