import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";

export const taskRoutes = express.Router();

taskRoutes.post("/", createTask);
taskRoutes.get("/", getTasks);
taskRoutes.get("/:id", getTaskById);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);
