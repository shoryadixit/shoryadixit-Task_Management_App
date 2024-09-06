import axios from "axios";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import DatePicker from "./DatePicker";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import moment from "moment";
import { Label } from "./ui/label";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

const TaskForm = ({ task, fetchTasks, trigger, setTasks }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (task) {
      formik.setValues({
        title: task.title,
        description: task.description,
        dueDate: moment(task.dueDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task]);

  const formik = useFormik({
    initialValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
      dueDate: task
        ? moment(task.dueDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        : moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      status: task ? task.status : "",
      priority: task ? task.priority : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      dueDate: Yup.string().required("Due Date is required"),
      // status: Yup.string().required("Status is required"),
      priority: Yup.string().required("Priority is required"),
    }),
    onSubmit: async (values) => {
      const taskData = {
        title: values.title,
        description: values.description,
        dueDate: moment(values.dueDate).format("MMM DD, YYYY"),
        priority: values.priority,
        status: values.status,
      };

      console.log("Taskdata", taskData);

      await axios[task ? "put" : "post"](
        `${process.env.NEXT_PUBLIC_API_URL}/tasks${task ? `/${task._id}` : ""}`,
        taskData
      ).then((res) => {
        formik.resetForm();
        fetchTasks(setTasks);
        toast.success(`Task ${task ? "updated" : "created"} successfully`);
        setTimeout(() => {
          setIsOpen(false);
        }, 200);
      });
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        formik.resetForm();
        setIsOpen(e);
      }}
    >
      {trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-start font-bold text-sm"}>
            {task?._id ? "Update Task" : "Create Task"}
          </DialogTitle>
          <DialogDescription className={"text-start text-sm"}>
            {`Enter the details of the task. Click create when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title" className="font-bold text-sm leading-tight">
              Title
            </Label>
            <Input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Title"
              className="border"
            />
            {formik.errors.title && formik.touched.title ? (
              <div className="text-red-500 text-xs font-bold leading-tight">
                {formik.errors.title}
              </div>
            ) : null}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label
              htmlFor="description"
              className="font-bold text-sm leading-tight"
            >
              Description
            </Label>
            <Textarea
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange}
              placeholder="Description"
              className="border h-[100px]"
            />
            {formik.errors.description && formik.touched.description ? (
              <div className="text-red-500 text-xs font-bold leading-tight">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          {task?.status && task?.status !== "Completed" && (
            <div className="flex items-center gap-4 justify-between">
              <p className="text-sm font-bold w-fit flex-shrink-0">
                Update Status:
              </p>
              <Select
                onValueChange={(val) => formik.setFieldValue("status", val)}
                value={formik.values.status}
                defaultValue={formik.values.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex items-center flex-col md:flex-row justify-between gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="email"
                className="font-bold text-sm leading-tight"
              >
                Due Date
              </Label>
              <DatePicker
                date={formik.values.dueDate}
                setDate={(dueDate) =>
                  formik.setFieldValue(
                    "dueDate",
                    moment(dueDate).format("MMM DD, YYYY")
                  )
                }
                className="border"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="priority"
                className="font-bold text-sm leading-tight"
              >
                Priority
              </Label>
              <Select
                onValueChange={(val) => formik.setFieldValue("priority", val)}
                value={formik.values.priority}
                defaultValue={formik.values.priority}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.errors.priority && formik.touched.priority ? (
                <div className="text-red-500 text-xs font-bold leading-tight">
                  {formik.errors.priority}
                </div>
              ) : null}
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              className="font-semibold flex items-center gap-1"
            >
              {formik.isSubmitting ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {task ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;

TaskForm.propTypes = {
  task: PropTypes.object,
  fetchTasks: PropTypes.func,
  trigger: PropTypes.element,
  setTasks: PropTypes.func,
};
