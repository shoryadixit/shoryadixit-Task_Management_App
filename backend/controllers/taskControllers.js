import { Task } from "../models/taskModel.js";

// Create a new task
const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  try {
    const task = new Task({ title, description, dueDate, priority });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Error creating task" });
  }
};

// Get all tasks with optional filtering/sorting
const getTasks = async (req, res) => {
  const { dueDate, priority, page, limit, search } = req.query;
  let query = {};

  if (dueDate) query.dueDate = dueDate;

  if (priority) query.priority = priority;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
    sort: { createdAt: -1 },
  };

  try {
    const tasks = await Task.paginate(query, options);
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error fetching tasks" });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Error fetching task" });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Error updating task" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting task" });
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
