import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { taskRoutes } from "./routes/taskRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
const dbString = `${process.env.MONGO_URI}`.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose
  .connect(dbString)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
