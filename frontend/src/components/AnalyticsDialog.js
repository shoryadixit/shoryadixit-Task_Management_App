import React, { useState, useEffect, useRef } from "react";
import TaskDistributionChart from "./TaskDistributionChart";
import CompletionRateChart from "./CompletionRateChart";
import UpcomingDeadlines from "./UpcomingDeadlines";
import { useRecoilState } from "recoil";
import { tasksState } from "@/recoil/atom";
import { FaArrowDown } from "react-icons/fa";

const AnalyticsDialog = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [showArrow, setShowArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isScrolledToMiddle =
        container.scrollTop > container.scrollHeight / 3;
      setShowArrow(!isScrolledToMiddle);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToMiddle = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const middlePosition = container.scrollHeight / 1.5;
      container.scrollTo({
        top: middlePosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`h-fit overflow-auto flex flex-col gap-4 relative`}>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div
        ref={scrollContainerRef}
        className="h-[50vh] overflow-auto md:h-full w-full flex flex-col md:grid md:grid-cols-3 gap-3"
      >
        <TaskDistributionChart tasks={tasks} />
        <CompletionRateChart tasks={tasks} />
        <UpcomingDeadlines tasks={tasks} />
      </div>
      {showArrow && (
        <div
          onClick={scrollToMiddle}
          className="md:hidden flex justify-center absolute transition-all ease-in-out duration-300 right-0 bottom-0 bg-gray-300 hover:bg-gray-400 hover:bg-opacity-30 bg-opacity-40 p-3 rounded-full cursor-pointer"
        >
          <FaArrowDown />
        </div>
      )}
    </div>
  );
};

export default AnalyticsDialog;
