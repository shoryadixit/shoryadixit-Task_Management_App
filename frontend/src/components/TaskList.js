import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import DatePicker from "./DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import moment from "moment";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { Input } from "./ui/input";
import { XIcon } from "lucide-react";

const TaskList = ({ tasks, setTasks, fetchTasks, tasksPagination }) => {
  const [filter, setFilter] = useState({ dueDate: null });
  const [selectedTask, setSelectedTask] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(tasksPagination?.page || 1);

  useEffect(() => {
    setFilter({
      ...filter,
      dueDate: dueDate ? moment(dueDate).format("MMM DD, YYYY") : null,
    });
  }, [dueDate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        search: debounceSearch,
      }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debounceSearch]);

  useEffect(() => {
    fetchTasks(setTasks, filter);
  }, [filter]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchTasks(setTasks, { ...filter, page: newPage });
  };

  const handleRemoveFilter = (key) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: "",
    }));
    if (key === "search") setDebounceSearch("");
    if (key === "dueDate") setDueDate(null);
  };

  return (
    <div>
      <div className="p-2">
        <Card className="shadow-md w-full flex flex-col items-center">
          <CardHeader className="w-full pb-0">
            <CardTitle className="text-lg font-semibold">Filters</CardTitle>
            <CardDescription className="text-sm">
              Filter tasks by due date, priority, or search by title or
              description.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 flex items-center flex-col md:flex-row gap-4 w-full">
            <DatePicker
              date={dueDate}
              setDate={setDueDate}
              placeholder={"Filter by Due Date"}
            />
            <Select
              onValueChange={(val) => {
                setFilter({ ...filter, priority: val });
              }}
              defaultValue={filter?.priority}
              value={filter?.priority}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Filter by title or description"
              value={debounceSearch}
              onChange={(e) => setDebounceSearch(e.target.value)}
            />
          </CardContent>
          <CardFooter
            className={`w-full ${
              filter.dueDate || filter?.priority || filter.search
                ? "flex"
                : "hidden"
            } gap-2`}
          >
            <div className="flex gap-2 justify-start w-full flex-wrap p-2">
              {filter.dueDate && (
                <Chip
                  label={`Due Date: ${filter.dueDate}`}
                  onRemove={() => handleRemoveFilter("dueDate")}
                />
              )}
              {filter.priority && (
                <Chip
                  label={`Priority: ${filter.priority}`}
                  onRemove={() => handleRemoveFilter("priority")}
                />
              )}
              {filter.search && (
                <Chip
                  label={`Search: ${filter.search}`}
                  onRemove={() => handleRemoveFilter("search")}
                />
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-wrap items-center justify-center lg:items-start lg:justify-start">
        {Array.isArray(tasks) &&
          tasks.length > 0 &&
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              selectedTask={selectedTask}
              setTasks={setTasks}
              fetchTasks={fetchTasks}
              onEditClick={handleEditClick}
            />
          ))}
      </div>

      <div className="pt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!tasksPagination.hasPrevPage}
                variant="secondary"
                className="flex items-center gap-1 p-1 h-fit"
              >
                <CaretLeftIcon />
                Previous
              </Button>
            </PaginationItem>
            {Array.from({ length: tasksPagination.totalPages }, (_, idx) => (
              <PaginationItem key={idx + 1}>
                <PaginationLink
                  onClick={() => handlePageChange(idx + 1)}
                  active={tasksPagination.page === idx + 1 ? "true" : "false"}
                  className={`${
                    tasksPagination.page === idx + 1 ? "bg-gray-200" : ""
                  }`}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!tasksPagination.hasNextPage}
                variant="secondary"
                className="flex items-center gap-1 p-1 h-fit"
              >
                Next
                <CaretRightIcon />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func,
  fetchTasks: PropTypes.func,
  tasksPagination: PropTypes.object,
};

const Chip = ({ label, onRemove }) => (
  <div className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-lg text-sm">
    <strong>{label}</strong>
    <button onClick={onRemove}>
      <XIcon className="h-4 w-4" />
    </button>
  </div>
);

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
