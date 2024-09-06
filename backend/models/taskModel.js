import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Completed"],
    default: "Open",
  },
  createdAt: { type: Date, default: Date.now },
});

taskSchema.plugin(mongoosePaginate);

export const Task = mongoose.model("Task", taskSchema);
