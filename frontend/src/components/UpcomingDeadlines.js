import { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { useRef } from "react";

const UpcomingDeadlines = ({ tasks }) => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const sortedTasks = tasks
      .filter((task) => new Date(task.dueDate) >= new Date())
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setUpcomingTasks(sortedTasks);
  }, [tasks]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveTask(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div className="flex flex-col gap-5 w-full mx-auto">
      <h2 className="flex items-center gap-2 text-lg font-bold border-b w-fit">
        <GoDotFill size={"12px"} /> Upcoming Deadlines
      </h2>
      <ScrollArea
        className="max-h-[35vh] w-full h-full pr-5"
        ref={containerRef}
      >
        {upcomingTasks.map((task) => (
          <div
            key={task._id}
            onClick={() => setActiveTask(task._id)}
            className={` ${
              activeTask === task._id
                ? "w-[200px] h-[80px] relative justify-end z-10 "
                : "h-[60px] w-full justify-center"
            } flex flex-col relative overflow-hidden border p-2 shadow-lg w-full rounded-lg my-2 cursor-pointer hover:rounded-xl transition-all ease-in-out duration-500`}
          >
            <span className="absolute right-0 top-0 text-xs px-2 py-1 text-blue-500 font-bold">
              Expand
            </span>
            <strong className="line-clamp-1">{task.title}</strong>
            <span className="text-sm font-bold text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
            <div
              className={`text-[12px] ${
                activeTask === task._id ? "opacity-100" : "opacity-0"
              } absolute top-1 flex items-center justify-between font-medium w-full pr-4 transition-all ease-in-out duration-500`}
            >
              <span className="font-extrabold w-full">Priority:</span>
              <Badge
                className={`${
                  task.priority === "High"
                    ? "bg-red-500 dark:bg-red-500 dark:text-white"
                    : task.priority === "Medium"
                    ? "bg-orange-400 dark:bg-orange-400 dark:text-white"
                    : "bg-blue-500 dark:bg-blue-500 dark:text-white"
                } hover:dark:${
                  task.priority === "High"
                    ? "bg-red-500 dark:bg-red-500 dark:text-white"
                    : task.priority === "Medium"
                    ? "bg-orange-400 dark:bg-orange-400 dark:text-white"
                    : "bg-blue-500 dark:bg-blue-500 dark:text-white"
                } hover:${
                  task.priority === "High"
                    ? "bg-red-500 dark:bg-red-500 dark:text-white"
                    : task.priority === "Medium"
                    ? "bg-orange-400 dark:bg-orange-400 dark:text-white"
                    : "bg-blue-500 dark:bg-blue-500 dark:text-white"
                }`}
              >
                {task.priority}
              </Badge>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default UpcomingDeadlines;
