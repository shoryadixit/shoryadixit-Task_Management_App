import moment from "moment";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { DialogTrigger } from "./ui/dialog";
import TaskForm from "./TaskForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "sonner";

export default function TaskCard({
  task,
  selectedTask,
  onEditClick,
  setTasks,
  fetchTasks,
}) {
  const handleDeleteTask = async () => {
    try {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task._id}`)
        .then(() => {
          toast.success("Task deleted successfully!");
          fetchTasks(setTasks);
        });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Card className="sm:max-w-xs lg:max-w-sm m-2 group shadow-lg border w-full relative overflow-hidden">
      <CardHeader>
        <CardTitle className="border rounded-lg p-2 flex w-full font-extrabold items-center justify-between">
          {task.title}{" "}
        </CardTitle>
        <CardDescription className="border rounded-lg p-2">
          <div className="flex flex-col leading-tight gap-1">
            <div className="text-[12px] flex items-center justify-between font-medium w-full">
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

            <div className="text-[12px] flex items-center justify-between font-medium w-full">
              <span className="font-extrabold w-full">Due:</span>{" "}
              <span className="w-full text-end">
                {moment(task.dueDate).format("MMM DD, YYYY")}
              </span>
            </div>

            <div className="text-[12px] flex items-center justify-between font-medium w-full">
              <span className="font-extrabold w-full">Status:</span>{" "}
              <Badge
                className={`flex-shrink-0 ${
                  task.status === "Open"
                    ? "bg-blue-500 dark:bg-blue-500 dark:text-white"
                    : task.status === "In Progress"
                    ? "bg-orange-400 dark:bg-orange-400 dark:text-white"
                    : "bg-emerald-500 dark:bg-emerald-500 dark:text-white"
                } hover:dark:${
                  task.status === "High"
                    ? "bg-red-500 dark:bg-red-500 dark:text-white"
                    : task.status === "Medium"
                    ? "bg-orange-400 dark:bg-orange-400 dark:text-white"
                    : "bg-blue-500 dark:bg-blue-500 dark:text-white"
                } hover:${
                  task.status === "Open"
                    ? "bg-blue-500 dark:bg-blue-500 dark:text-white"
                    : task.status === "In Progress"
                    ? "bg-orange-400 dark:bg-orange-400 dark:text-white"
                    : "bg-emerald-500 dark:bg-emerald-500 dark:text-white"
                } `}
              >
                {task.status}
              </Badge>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className="border rounded-lg p-2 h-[100px] overflow-auto"> */}
          {task.description}
        {/* </div> */}
      </CardContent>
      <CardFooter className="flex gap-2 items-center">
        {task?.status !== "Completed" && (
          <TaskForm
            task={selectedTask}
            setTasks={setTasks}
            fetchTasks={fetchTasks}
            trigger={
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      asChild
                      onClick={() => onEditClick(task)}
                      variant="secondary"
                      className="text-sm h-fit py-1 px-2"
                    >
                      <DialogTrigger className="flex items-center justify-between gap-1">
                        <Pencil1Icon />
                      </DialogTrigger>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-400 bg-opacity-40 dark:bg-opacity-85 text-black font-bold">
                    Edit the task
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            }
          />
        )}

        <AlertDialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  asChild
                  variant="destructive"
                  className="text-sm h-fit py-1 px-2"
                >
                  <AlertDialogTrigger>
                    <TrashIcon />
                  </AlertDialogTrigger>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-red-500 bg-opacity-75 text-white dark:bg-red-500 dark:bg-opacity-85 dark:text-white font-bold">
                Delete the task
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                task and remove data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteTask}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  selectedTask: PropTypes.object,
  onEditClick: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
};
